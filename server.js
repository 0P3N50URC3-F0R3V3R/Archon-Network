'use strict';

const express = require('express');
const http    = require('http');
const { Server: IOServer } = require('socket.io');
const path   = require('path');
const fs     = require('fs');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ROOM_EXPIRY_MS = 30 * 60 * 1000;

const app    = express();
const server = http.createServer(app);

// ── Socket.io relay ───────────────────────────────────────────────────────────
const io = new IOServer(server);

// Map<roomId, Set<socket>>
const gameRooms = new Map();

io.on('connection', (socket) => {
    socket.on('room-join', (roomId, playerNo) => {
        if (!roomId || !playerNo) return;
        socket.join(roomId);
        socket.data.roomId   = roomId;
        socket.data.playerNo = playerNo;

        if (!gameRooms.has(roomId)) gameRooms.set(roomId, new Set());
        gameRooms.get(roomId).add(socket);

        console.log(`[sock] P${playerNo} joined room ${roomId} (${gameRooms.get(roomId).size}/2)`);

        if (gameRooms.get(roomId).size >= 2) {
            io.to(roomId).emit('peer-ready');
            console.log(`[sock] room ${roomId} ready`);
        }
    });

    socket.on('msg', (data) => {
        if (socket.data.roomId)
            socket.to(socket.data.roomId).emit('msg', data);
    });

    socket.on('disconnect', () => {
        const roomId = socket.data.roomId;
        if (!roomId) return;
        socket.to(roomId).emit('peer-disconnected');
        const room = gameRooms.get(roomId);
        if (room) {
            room.delete(socket);
            if (room.size === 0) gameRooms.delete(roomId);
        }
        console.log(`[sock] P${socket.data.playerNo} left room ${roomId}`);
    });
});

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: false }));

// ── Room storage (HTTP, used to assign playerNo) ──────────────────────────────
const rooms = new Map();

setInterval(() => {
    const cutoff = Date.now() - ROOM_EXPIRY_MS;
    for (const [id, room] of rooms)
        if (room.createdAt < cutoff) { rooms.delete(id); console.log('[room] expired', id); }
}, 5 * 60 * 1000);

// ── index.html with fresh session ID ─────────────────────────────────────────
app.get(['/', '/index.html'], (_req, res) => {
    try {
        let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        const sid = crypto.randomBytes(16).toString('hex');
        html = html.replace(/data-sid="[^"]*"/, `data-sid="${sid}"`);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) {
        console.error('[index]', err.message);
        res.status(500).send('Server error');
    }
});

// ── Room management API ───────────────────────────────────────────────────────
app.post('/api/room', (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const { action, room, sid } = data;

        if (!room || typeof room !== 'string' || !/^[A-Z0-9]{1,20}$/.test(room))
            return res.json({ status: 'error', reason: 'Invalid room id' });

        switch (action) {
            case 'createRoom':
                if (!sid) return res.json({ status: 'error', reason: 'Missing sid' });
                rooms.set(room, { p1Sid: sid, p2Sid: null, createdAt: Date.now() });
                console.log('[room] created', room, '—', sid.slice(0, 8));
                return res.json({ status: 'ok', data: { p1Sid: sid, p2Sid: null } });

            case 'getRoom': {
                const r = rooms.get(room);
                return res.json({ status: 'ok', data: r || null });
            }

            case 'join': {
                if (!sid) return res.json({ status: 'error', reason: 'Missing sid' });
                const r = rooms.get(room);
                if (!r) return res.json({ status: 'error', reason: 'Room not found' });
                if (r.p2Sid && r.p2Sid !== sid)
                    return res.json({ status: 'error', reason: 'Room full' });
                r.p2Sid = sid;
                r.createdAt = Date.now();
                console.log('[room] joined ', room, '—', sid.slice(0, 8));
                return res.json({ status: 'ok', data: { p1Sid: r.p1Sid, p2Sid: sid } });
            }

            default:
                return res.json({ status: 'error', reason: 'Unknown action: ' + action });
        }
    } catch (err) {
        console.error('[room api]', err.message);
        res.json({ status: 'error', reason: 'Server error' });
    }
});

// ── Static assets ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname), { index: false }));

// ── Start ─────────────────────────────────────────────────────────────────────
server.listen(PORT, HOST, () => {
    const h = HOST === '0.0.0.0' ? 'localhost' : HOST;
    console.log(`\nArchon server running\n  http://${h}:${PORT}\n`);
});

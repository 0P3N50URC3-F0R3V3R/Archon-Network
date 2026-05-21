/* Archon AI - single-player opponent (dark side)
   Hooks into archon.js after it loads. No multiplayer code needed.
   Human plays LIGHT (arrow keys). AI plays DARK (injected WASD+Shift). */
(function () {
    'use strict';

    // ── Piece power ratings (for combat prediction) ──────────────────────────
    var POWER = {
        wizard: 10, sorceress: 10,
        dragon: 9,  phoenix: 9,
        djinni: 8,  unicorn: 7, basilisk: 7,
        shapeshifter: 6, golem: 6, banshee: 6,
        manticore: 5, valkyrie: 5, troll: 4,
        archer: 4, knight: 3, goblin: 3
    };

    // Piece categories for combat AI
    var RANGED = {
        wizard: 1, sorceress: 1, dragon: 1, phoenix: 1,
        djinni: 1, unicorn: 1, basilisk: 1, shapeshifter: 1,
        banshee: 1, manticore: 1, valkyrie: 1,
        archer: 1
    };

    var POWER_POINTS = [
        {col:4,row:0},{col:0,row:4},{col:4,row:4},{col:8,row:4},{col:4,row:8}
    ];

    var AI   = 'dark';
    var HUMAN = 'light';
    var KEYS  = null;   // DATA.keys[1] — set on init

    // ── Board AI state ────────────────────────────────────────────────────────
    var bState    = 'idle';
    var bTimer    = 0;
    var bPiece    = null;
    var bTarget   = null;
    var bStall    = 0;
    var bPrevCol  = -1;
    var bPrevRow  = -1;

    // ── Helpers ───────────────────────────────────────────────────────────────
    function isPP(col, row) {
        for (var i = 0; i < POWER_POINTS.length; i++)
            if (POWER_POINTS[i].col === col && POWER_POINTS[i].row === row) return true;
        return false;
    }

    function clr() {
        for (var k in KEYS) engine.pressedKeys[KEYS[k]] = false;
    }

    function press(key)   { engine.pressedKeys[KEYS[key]] = true;  }
    function release(key) { engine.pressedKeys[KEYS[key]] = false; }

    function setCursor(col, row) {
        game.cursor.x = 48 + col * 24;
        game.cursor.y = 22 + row * 16;
    }

    // ── Board AI: move picker ─────────────────────────────────────────────────
    function aiPieces() {
        var out = [];
        for (var i = 0; i < game.icons.length; i++) {
            var ic = game.icons[i];
            if (!ic.dead && !ic.imprisoned && ic.side === AI) out.push(ic);
        }
        return out;
    }

    function canBeat(ai, human) {
        var ap = (POWER[ai.type]   || 5) + ai.hp;
        var hp = (POWER[human.type]|| 5) + human.hp;
        return ap >= hp - 1;
    }

    function scoreTarget(piece, tc, tr) {
        var score = 0;
        var there = game.getIconOnBoard(tc, tr);
        if (there && there.side === AI) return -999;   // own piece

        if (there && there.side === HUMAN) {
            score += 20;
            if (canBeat(piece, there)) score += 15;
        }
        if (isPP(tc, tr)) {
            score += 25;
            if (there && there.side === HUMAN) score += 20;  // capture enemy on PP
        }
        // Proximity to unoccupied power points
        var best = 999;
        for (var i = 0; i < POWER_POINTS.length; i++) {
            var pp = POWER_POINTS[i];
            var ex = game.getIconOnBoard(pp.col, pp.row);
            if (!ex || ex.side !== AI) {
                var d = Math.abs(tc - pp.col) + Math.abs(tr - pp.row);
                if (d < best) best = d;
            }
        }
        score -= best * 2;
        score -= tc;                      // prefer moving left (toward human base)
        score += (Math.random() - 0.5);   // tiny jitter
        return score;
    }

    function reachable(piece) {
        var out = [];
        var max = piece.maxSteps;
        var fly = piece.canFly || piece.isMage();

        for (var r = 0; r <= 8; r++) {
            for (var c = 0; c <= 8; c++) {
                if (c === piece.col && r === piece.row) continue;
                var d = Math.abs(c - piece.col) + Math.abs(r - piece.row);
                if (fly) {
                    if (d > max) continue;
                } else {
                    if (d > max) continue;  // greedy bound; actual steps may vary
                }
                var ex = game.getIconOnBoard(c, r);
                if (ex && ex.side === AI) continue;
                out.push({col: c, row: r});
            }
        }
        return out;
    }

    function findBestMove() {
        var best = null, bestScore = -9999;
        var pieces = aiPieces();
        for (var p = 0; p < pieces.length; p++) {
            var piece = pieces[p];
            var squares = reachable(piece);
            for (var s = 0; s < squares.length; s++) {
                var sq = squares[s];
                var sc = scoreTarget(piece, sq.col, sq.row);
                if (sc > bestScore) { bestScore = sc; best = {piece: piece, target: sq}; }
            }
        }
        return best;
    }

    // ── Board AI: tick (called each frame when it's AI's turn) ────────────────
    function boardTick() {
        if (game.delayName || (game.frameCounters && game.frameCounters.delay > 0)) {
            clr(); return;
        }
        // Suppress browseSpells for mages — if mage accidentally entered browse,
        // press fire on an empty adjacent square to cancel/cast
        if (game.spelling === 'browse') {
            clr();
            press('fire');
            return;
        }
        if (game.spelling && game.spelling !== 'browse') { clr(); return; }

        // Suppress "dark: USE WASD" hint
        if (game.ctrlTexts) game.ctrlTexts[AI] = true;

        switch (bState) {

            case 'idle':
                clr();
                bTimer++;
                if (bTimer >= 50) {                 // ~1 s think delay
                    bTimer = 0;
                    var mv = findBestMove();
                    if (mv) {
                        bPiece  = mv.piece;
                        bTarget = mv.target;
                        bState  = 'cursorToPiece';
                    }
                }
                break;

            case 'cursorToPiece':
                clr();
                setCursor(bPiece.col, bPiece.row);
                bTimer = 0;
                bState = 'waitSelect';
                break;

            case 'waitSelect':
                clr();
                bTimer++;
                if (bTimer >= 4) { bTimer = 0; bState = 'fireSelect'; }
                break;

            case 'fireSelect':
                press('fire');
                bState = 'releaseSelect';
                break;

            case 'releaseSelect':
                release('fire');
                if (game.selectedIcon === bPiece) {
                    if (bPiece.isMage()) {
                        bState = 'cursorToTarget';
                    } else {
                        bPrevCol = bPiece.col;
                        bPrevRow = bPiece.row;
                        bStall   = 0;
                        bState   = 'movePiece';
                    }
                } else {
                    // Piece couldn't be selected — skip
                    bState = 'idle';
                    bTimer = -15;
                }
                break;

            case 'cursorToTarget':
                clr();
                setCursor(bTarget.col, bTarget.row);
                bTimer = 0;
                bState = 'waitConfirm';
                break;

            case 'waitConfirm':
                clr();
                bTimer++;
                if (bTimer >= 4) { bTimer = 0; bState = 'fireConfirm'; }
                break;

            case 'fireConfirm':
                press('fire');
                bState = 'releaseConfirm';
                break;

            case 'releaseConfirm':
                release('fire');
                bState = 'waitTurnEnd';
                bTimer = 0;
                break;

            case 'movePiece':
                clr();
                if (!bPiece.onField()) break;  // piece is animating, wait

                var pc = bPiece.getCol();
                var pr = bPiece.getRow();

                // Stall detection: piece on field but not moving
                if (pc === bPrevCol && pr === bPrevRow) {
                    bStall++;
                    if (bStall > 20) {          // stuck → confirm current pos
                        bState = 'fireConfirm';
                        bStall = 0;
                        break;
                    }
                } else {
                    bPrevCol = pc; bPrevRow = pr; bStall = 0;
                }

                if (pc === bTarget.col && pr === bTarget.row) {
                    bState = 'fireConfirm';
                    break;
                }

                // Press direction toward target
                var dc = bTarget.col - pc;
                var dr = bTarget.row - pr;
                if (Math.abs(dc) >= Math.abs(dr)) {
                    if (dc > 0) press('right');
                    else        press('left');
                } else {
                    if (dr > 0) press('down');
                    else        press('up');
                }
                break;

            case 'waitTurnEnd':
                clr();
                bTimer++;
                if (game.actualSide !== AI || bTimer > 200) {
                    bState = 'idle';
                    bTimer = 0;
                }
                break;
        }
    }

    // ── Combat AI: tick (called each frame during active combat) ──────────────
    function combatTick() {
        if (game.combat.status !== 'combat') { clr(); return; }

        var aiIcon    = game.combat.icons[AI];
        var humanIcon = game.combat.icons[HUMAN];
        if (!aiIcon || !humanIcon || aiIcon.hp <= 0) { clr(); return; }

        var dx   = humanIcon.x - aiIcon.x;
        var dy   = humanIcon.y - aiIcon.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        var isRanged = !!(RANGED[aiIcon.type]);
        var optDist  = isRanged ? 90 : 18;

        var ml = false, mr = false, mu = false, md = false, doFire = false;

        // ── Movement ─────────────────────────────────────────────────────────
        if (dist > optDist + 25) {
            // Close in
            if (Math.abs(dx) >= Math.abs(dy)) { if (dx > 0) mr = true; else ml = true; }
            else                               { if (dy > 0) md = true; else mu = true; }
        } else if (isRanged && dist < optDist - 25) {
            // Back off
            if (Math.abs(dx) >= Math.abs(dy)) { if (dx > 0) ml = true; else mr = true; }
            else                               { if (dy > 0) mu = true; else md = true; }
        } else {
            // Circle-strafe (direction flips every 25 frames)
            var t = game.frameCounters ? (game.frameCounters.combat || 0) : 0;
            var cw = Math.floor(t / 25) % 2 === 0;
            if (Math.abs(dx) >= Math.abs(dy)) { mu = cw; md = !cw; }
            else                               { ml = cw; mr = !cw; }
        }

        // ── Dodge incoming bullet ─────────────────────────────────────────────
        var bullet = game.combat.bullet[HUMAN];
        if (bullet && bullet.posX !== undefined) {
            var bx = bullet.posX - aiIcon.x;
            var by = bullet.posY - aiIcon.y;
            if (Math.sqrt(bx*bx + by*by) < 55) {
                if (Math.abs(bx) < Math.abs(by)) { ml = aiIcon.x > 152; mr = !ml; mu = false; md = false; }
                else                              { mu = aiIcon.y > 96;  md = !mu; ml = false; mr = false; }
            }
        }

        // ── Boundary push ─────────────────────────────────────────────────────
        if (aiIcon.x < 28)  { ml = false; mr = true;  }
        if (aiIcon.x > 285) { mr = false; ml = true;  }
        if (aiIcon.y < 25)  { mu = false; md = true;  }
        if (aiIcon.y > 167) { md = false; mu = true;  }

        // ── Firing ────────────────────────────────────────────────────────────
        var aRate = game.combat.attackRate ? game.combat.attackRate[AI] : 0;
        if (aRate === 0) {
            if (isRanged && dist < 180) doFire = true;
            if (!isRanged && dist < 28) doFire = true;
        }

        // ── Apply ─────────────────────────────────────────────────────────────
        clr();
        if (doFire) {
            // Aim at human
            if (Math.abs(dx) >= Math.abs(dy)) {
                if (dx > 0) press('right'); else press('left');
            } else {
                if (dy > 0) press('down'); else press('up');
            }
            press('fire');
        } else {
            if (ml) press('left');
            if (mr) press('right');
            if (mu) press('up');
            if (md) press('down');
        }
    }

    // ── Hook into scan loop ───────────────────────────────────────────────────
    function patchEngine() {
        // Set SP controls: human = arrows, AI = WASD+Shift
        engine.options.lightControl = 'keyboardArrows';
        engine.options.darkControl  = 'keyboardWasd';
        KEYS = DATA.keys[1];   // {up:87,down:83,left:65,right:68,fire:16}

        var origScan = engine.scanRoutine.bind(engine);
        engine.scanRoutine = function () {
            // Skip "Local/Online" menu — already chose SP from landing page
            if (game.scene === 'menu' && game.menuLevel === 1 && !engine.room) {
                game.menuLevel = 2;
            }
            origScan();
            if (game.scene === 'table' && game.actualSide === AI && !game.gameEnded) {
                boardTick();
            } else if (game.scene === 'combat') {
                combatTick();
            } else {
                // Reset board state when not AI's turn
                if (bState !== 'idle' && game.scene === 'table' && game.actualSide !== AI) {
                    bState = 'idle'; bTimer = 0;
                }
                if (game.scene === 'table' && game.actualSide !== AI) clr();
            }
        };

        console.log('[AI] Archon AI ready — playing dark side');
    }

    // Wait for game objects to exist, then patch
    var _wait = setInterval(function () {
        if (typeof engine !== 'undefined' &&
            typeof game   !== 'undefined' &&
            typeof DATA   !== 'undefined' &&
            engine.options && DATA.keys) {
            clearInterval(_wait);
            patchEngine();
        }
    }, 100);

})();

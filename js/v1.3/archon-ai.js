/* Archon AI — single-player opponent (dark side)
   URL param: ?d=1 easy | ?d=2 normal (default) | ?d=3 hard
   Human plays LIGHT (arrow keys). AI plays DARK (injected WASD+Shift). */
(function () {
    'use strict';

    var DIFFICULTY = parseInt(new URLSearchParams(window.location.search).get('d') || '2');

    // ── Tuning per difficulty ─────────────────────────────────────────────────
    var CFG = {
        thinkDelay:    [0, 100, 50, 18][DIFFICULTY],  // frames before move
        randomChance:  [0, 0.40, 0, 0][DIFFICULTY],   // prob of random (dumb) move
        combatRange:   [0, 60,  90, 120][DIFFICULTY], // preferred ranged distance
        fireDist:      [0, 100, 180, 240][DIFFICULTY],// max dist to fire
        dodgeDist:     [0, 0,   55,  80][DIFFICULTY], // dodge if bullet within this
        strafeFreq:    [0, 40,  25,  15][DIFFICULTY], // strafe direction flip (frames)
        mageBonus:     [0, 0,   0,   12][DIFFICULTY], // extra score for killing mages
        ppBonus:       [0, 15,  25,  38][DIFFICULTY], // power point capture bonus
    };

    // ── Piece power ratings ───────────────────────────────────────────────────
    var POWER = {
        wizard:10, sorceress:10, dragon:9, phoenix:9,
        djinni:8,  unicorn:7,   basilisk:7,
        shapeshifter:6, golem:6, banshee:6, manticore:5,
        valkyrie:5, troll:4, archer:4, knight:3, goblin:3
    };

    var RANGED = {
        wizard:1, sorceress:1, dragon:1, phoenix:1, djinni:1,
        unicorn:1, basilisk:1, shapeshifter:1, banshee:1,
        manticore:1, valkyrie:1, archer:1
    };

    var POWER_POINTS = [
        {col:4,row:0},{col:0,row:4},{col:4,row:4},{col:8,row:4},{col:4,row:8}
    ];

    var AI   = 'dark';
    var KEYS = null;

    // ── Board AI state ────────────────────────────────────────────────────────
    var bState   = 'idle';
    var bTimer   = 0;
    var bPiece   = null;
    var bTarget  = null;
    var bStall   = 0;
    var bPrevCol = -1;
    var bPrevRow = -1;

    // ── Helpers ───────────────────────────────────────────────────────────────
    function isPP(col, row) {
        for (var i = 0; i < POWER_POINTS.length; i++)
            if (POWER_POINTS[i].col === col && POWER_POINTS[i].row === row) return true;
        return false;
    }

    function clr() { for (var k in KEYS) engine.pressedKeys[KEYS[k]] = false; }
    function press(k)   { engine.pressedKeys[KEYS[k]] = true;  }
    function release(k) { engine.pressedKeys[KEYS[k]] = false; }
    function setCursor(col, row) { game.cursor.x = 48+col*24; game.cursor.y = 22+row*16; }

    function resetBoardState() { bState='idle'; bTimer=0; bPiece=null; bTarget=null; clr(); }

    // ── Board move picker ─────────────────────────────────────────────────────
    function aiPieces() {
        var out = [];
        for (var i = 0; i < game.icons.length; i++) {
            var ic = game.icons[i];
            if (!ic.dead && !ic.imprisoned && ic.side === AI) out.push(ic);
        }
        return out;
    }

    function canBeat(ai, human) {
        return ((POWER[ai.type]||5) + ai.hp) >= ((POWER[human.type]||5) + human.hp) - 1;
    }

    function scoreTarget(piece, tc, tr) {
        var there = game.getIconOnBoard(tc, tr);
        if (there && there.side === AI) return -999;

        var score = 0;
        if (there && there.side !== AI) {
            score += 20;
            if (canBeat(piece, there)) score += 15;
            if (there.isMage && there.isMage()) score += CFG.mageBonus;
        }
        if (isPP(tc, tr)) {
            score += CFG.ppBonus;
            if (there && there.side !== AI) score += CFG.ppBonus; // capturing enemy on PP
        }
        // Proximity to unoccupied power points
        var best = 999;
        for (var i = 0; i < POWER_POINTS.length; i++) {
            var pp = POWER_POINTS[i];
            var ex = game.getIconOnBoard(pp.col, pp.row);
            if (!ex || ex.side !== AI) {
                var d = Math.abs(tc-pp.col)+Math.abs(tr-pp.row);
                if (d < best) best = d;
            }
        }
        score -= best * 2;
        score -= tc;                     // advance left toward human base
        score += (Math.random()-0.5);    // jitter
        return score;
    }

    function findBestMove() {
        // Easy: 40% chance of a random dumb move
        var forceRandom = (DIFFICULTY === 1 && Math.random() < CFG.randomChance);

        var best = null, bestScore = forceRandom ? 999 : -9999;
        var pieces = aiPieces();
        if (!pieces.length) return null;

        if (forceRandom) {
            var p = pieces[Math.floor(Math.random()*pieces.length)];
            var candidates = [];
            for (var r=0;r<=8;r++) for (var c=0;c<=8;c++) {
                if (c===p.col&&r===p.row) continue;
                var d=Math.abs(c-p.col)+Math.abs(r-p.row);
                if (d<=p.maxSteps) {
                    var ex=game.getIconOnBoard(c,r);
                    if (!ex||ex.side!==AI) candidates.push({col:c,row:r});
                }
            }
            if (candidates.length) return {piece:p, target:candidates[Math.floor(Math.random()*candidates.length)]};
        }

        for (var p = 0; p < pieces.length; p++) {
            var piece = pieces[p];
            for (var r=0;r<=8;r++) {
                for (var c=0;c<=8;c++) {
                    if (c===piece.col&&r===piece.row) continue;
                    var d=Math.abs(c-piece.col)+Math.abs(r-piece.row);
                    if (d > piece.maxSteps) continue;
                    var ex = game.getIconOnBoard(c,r);
                    if (ex && ex.side===AI) continue;
                    var sc = scoreTarget(piece,c,r);
                    if (sc > bestScore) { bestScore=sc; best={piece:piece,target:{col:c,row:r}}; }
                }
            }
        }
        return best;
    }

    // ── Board AI tick ─────────────────────────────────────────────────────────
    function boardTick() {
        if (game.delayName || (game.frameCounters && game.frameCounters.delay > 0)) { clr(); return; }
        if (game.spelling === 'browse') { clr(); press('fire'); return; }
        if (game.spelling && game.spelling !== 'browse') { clr(); return; }
        if (game.ctrlTexts) game.ctrlTexts[AI] = true;

        switch (bState) {

        case 'idle':
            clr();
            bTimer++;
            if (bTimer >= CFG.thinkDelay) {
                bTimer = 0;
                var mv = findBestMove();
                if (mv) { bPiece=mv.piece; bTarget=mv.target; bState='cursorToPiece'; }
            }
            break;

        case 'cursorToPiece':
            clr(); setCursor(bPiece.col, bPiece.row); bTimer=0; bState='waitSelect'; break;

        case 'waitSelect':
            clr(); bTimer++;
            if (bTimer>=4) { bTimer=0; bState='fireSelect'; }
            break;

        case 'fireSelect':
            press('fire'); bState='releaseSelect'; break;

        case 'releaseSelect':
            release('fire');
            if (game.selectedIcon === bPiece) {
                if (bPiece.isMage()) { bState='cursorToTarget'; }
                else { bPrevCol=bPiece.col; bPrevRow=bPiece.row; bStall=0; bState='movePiece'; }
            } else { resetBoardState(); bTimer=-15; }
            break;

        case 'cursorToTarget':
            clr(); setCursor(bTarget.col, bTarget.row); bTimer=0; bState='waitConfirm'; break;

        case 'waitConfirm':
            clr(); bTimer++;
            if (bTimer>=4) { bTimer=0; bState='fireConfirm'; }
            break;

        case 'fireConfirm':
            press('fire'); bState='releaseConfirm'; break;

        case 'releaseConfirm':
            release('fire'); bState='waitTurnEnd'; bTimer=0; break;

        case 'movePiece':
            clr();
            if (!bPiece.onField()) break;
            var pc=bPiece.getCol(), pr=bPiece.getRow();
            if (pc===bPrevCol && pr===bPrevRow) {
                bStall++;
                if (bStall>20) { bState='fireConfirm'; bStall=0; break; }
            } else { bPrevCol=pc; bPrevRow=pr; bStall=0; }
            if (pc===bTarget.col && pr===bTarget.row) { bState='fireConfirm'; break; }
            var dc=bTarget.col-pc, dr=bTarget.row-pr;
            if (Math.abs(dc)>=Math.abs(dr)) { if(dc>0) press('right'); else press('left'); }
            else                            { if(dr>0) press('down');  else press('up');   }
            break;

        case 'waitTurnEnd':
            clr(); bTimer++;
            if (game.actualSide!==AI || bTimer>200) { resetBoardState(); }
            break;
        }
    }

    // ── Combat AI tick ────────────────────────────────────────────────────────
    function combatTick() {
        if (game.combat.status !== 'combat') { clr(); return; }
        var aiIcon = game.combat.icons[AI], huIcon = game.combat.icons['light'];
        if (!aiIcon || !huIcon || aiIcon.hp <= 0) { clr(); return; }

        var dx = huIcon.x - aiIcon.x, dy = huIcon.y - aiIcon.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        var isRanged = !!(RANGED[aiIcon.type]);
        var opt = CFG.combatRange;

        var ml=false, mr=false, mu=false, md=false, doFire=false;

        // Movement
        if (dist > opt+25) {
            if (Math.abs(dx)>=Math.abs(dy)) { if(dx>0)mr=true; else ml=true; }
            else                            { if(dy>0)md=true; else mu=true; }
        } else if (isRanged && dist < opt-25) {
            if (Math.abs(dx)>=Math.abs(dy)) { if(dx>0)ml=true; else mr=true; }
            else                            { if(dy>0)mu=true; else md=true; }
        } else {
            var t = game.frameCounters ? (game.frameCounters.combat||0) : 0;
            var cw = Math.floor(t/CFG.strafeFreq)%2===0;
            if (Math.abs(dx)>=Math.abs(dy)) { mu=cw; md=!cw; } else { ml=cw; mr=!cw; }
        }

        // Dodge
        if (CFG.dodgeDist > 0) {
            var bul = game.combat.bullet['light'];
            if (bul && bul.posX!==undefined) {
                var bx=bul.posX-aiIcon.x, by=bul.posY-aiIcon.y;
                if (Math.sqrt(bx*bx+by*by) < CFG.dodgeDist) {
                    if (Math.abs(bx)<Math.abs(by)) { ml=aiIcon.x>152; mr=!ml; mu=false; md=false; }
                    else                           { mu=aiIcon.y>96;  md=!mu; ml=false; mr=false; }
                }
            }
        }

        // Hard: lead the target (predictive aim)
        var aimDx = dx, aimDy = dy;
        if (DIFFICULTY === 3 && isRanged) {
            var spd = aiIcon.shotSpeed || 3;
            var t2 = dist / Math.max(spd, 1);
            aimDx = huIcon.x + (huIcon.x - aiIcon.x) * 0.15 - aiIcon.x;
            aimDy = huIcon.y + (huIcon.y - aiIcon.y) * 0.15 - aiIcon.y;
        }

        // Boundary
        if (aiIcon.x<28)  { ml=false; mr=true;  }
        if (aiIcon.x>285) { mr=false; ml=true;  }
        if (aiIcon.y<25)  { mu=false; md=true;  }
        if (aiIcon.y>167) { md=false; mu=true;  }

        // Fire
        var aRate = game.combat.attackRate ? game.combat.attackRate[AI] : 0;
        if (aRate===0) {
            if (isRanged  && dist < CFG.fireDist) doFire=true;
            if (!isRanged && dist < 28)           doFire=true;
        }

        clr();
        if (doFire) {
            if (Math.abs(aimDx)>=Math.abs(aimDy)) { if(aimDx>0)press('right'); else press('left'); }
            else                                  { if(aimDy>0)press('down');  else press('up');   }
            press('fire');
        } else {
            if (ml) press('left');  if (mr) press('right');
            if (mu) press('up');    if (md) press('down');
        }
    }

    // ── Engine patch ──────────────────────────────────────────────────────────
    function patchEngine() {
        engine.options.lightControl = 'keyboardArrows';
        engine.options.darkControl  = 'keyboardWasd';
        KEYS = DATA.keys[1];

        // ESC → back to landing page (not loop inside singleplayer.html)
        var _kd = document.onkeydown;
        document.onkeydown = function(e) {
            if (e.which === 27) { window.location.href = '/'; return; }
            if (_kd) _kd.call(document, e);
        };

        var origScan = engine.scanRoutine.bind(engine);
        engine.scanRoutine = function () {
            // Auto-skip "Local/Online" menu — already chose SP
            if (game.scene === 'menu' && game.menuLevel === 1 && !engine.room) game.menuLevel = 2;
            // Reset board AI when returning to menu
            if (game.scene === 'menu' && bState !== 'idle') resetBoardState();

            origScan();

            if      (game.scene==='table'  && game.actualSide===AI && !game.gameEnded) boardTick();
            else if (game.scene==='combat')  combatTick();
            else if (game.scene==='table'  && game.actualSide!==AI) clr();
        };

        console.log('[AI] difficulty='+DIFFICULTY+' ready');
    }

    var _wait = setInterval(function () {
        if (typeof engine!=='undefined' && typeof game!=='undefined' &&
            typeof DATA!=='undefined' && game && game.menuLevel !== undefined &&
            engine.options && DATA.keys) {
            clearInterval(_wait);
            patchEngine();
        }
    }, 100);

})();

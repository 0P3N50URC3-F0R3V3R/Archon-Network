/* Archon AI — single-player opponent (dark side)
   URL param: ?d=1 easy | ?d=2 normal (default) | ?d=3 hard
   Human plays LIGHT (arrow keys). AI plays DARK (injected WASD+Shift).
   Hard mode adds spell AI: imprison, heal, summon elemental, shift time. */
(function () {
    'use strict';

    var DIFFICULTY   = parseInt(new URLSearchParams(window.location.search).get('d')    || '2');
    var PLAYER_SIDE  = new URLSearchParams(window.location.search).get('side') || 'light';
    var AI           = (PLAYER_SIDE === 'light') ? 'dark' : 'light';

    // ── Per-difficulty tuning ─────────────────────────────────────────────────
    var CFG = {
        thinkDelay:  [0, 100, 50, 18][DIFFICULTY],
        randomChance:[0, 0.40, 0, 0][DIFFICULTY],
        combatRange: [0, 60,  90, 120][DIFFICULTY],
        fireDist:    [0, 100, 180, 240][DIFFICULTY],
        dodgeDist:   [0, 0,   55,  80][DIFFICULTY],
        strafeFreq:  [0, 40,  25,  15][DIFFICULTY],
        mageBonus:   [0, 0,   0,   12][DIFFICULTY],
        ppBonus:     [0, 15,  25,  38][DIFFICULTY],
        useSpells:   [0, 0,   0,   1][DIFFICULTY],     // spell AI only on hard
    };

    // ── Piece power ratings ───────────────────────────────────────────────────
    var POWER = {
        wizard:10, sorceress:10, dragon:9, phoenix:9,
        djinni:8, unicorn:7, basilisk:7,
        shapeshifter:6, golem:6, banshee:6, manticore:5,
        valkyrie:5, troll:4, archer:4, knight:3, goblin:3
    };
    var RANGED = {
        wizard:1, sorceress:1, dragon:1, phoenix:1, djinni:1,
        unicorn:1, basilisk:1, shapeshifter:1, banshee:1, manticore:1,
        valkyrie:1, archer:1
    };

    var PP   = [{col:4,row:0},{col:0,row:4},{col:4,row:4},{col:8,row:4},{col:4,row:8}];
    var KEYS = null;

    // ── Board AI state ────────────────────────────────────────────────────────
    var bState      = 'idle';
    var bTimer      = 0;
    var bPiece      = null;
    var bTarget     = null;
    var bStall      = 0;
    var bPrevCol    = -1;
    var bPrevRow    = -1;
    var bSpellChoice = -1;   // spell index to cast (-1 = teleport/move)
    var bSpellTarget = null; // piece to target with spell

    // ── Helpers ───────────────────────────────────────────────────────────────
    function isPP(col, row) {
        for (var i=0;i<PP.length;i++) if(PP[i].col===col&&PP[i].row===row) return true;
        return false;
    }
    function clr() { for (var k in KEYS) engine.pressedKeys[KEYS[k]] = false; }
    function press(k)   { engine.pressedKeys[KEYS[k]] = true;  }
    function release(k) { engine.pressedKeys[KEYS[k]] = false; }
    function setCursor(col, row) { game.cursor.x=48+col*24; game.cursor.y=22+row*16; }
    function resetBoard() { bState='idle'; bTimer=0; bPiece=null; bTarget=null; bSpellChoice=-1; bSpellTarget=null; clr(); }

    // ── Board: move evaluation ────────────────────────────────────────────────
    function aiPieces() {
        var out=[];
        for (var i=0;i<game.icons.length;i++) {
            var ic=game.icons[i];
            if (!ic.dead && !ic.imprisoned && ic.side===AI) out.push(ic);
        }
        return out;
    }

    function canBeat(ai,hu) {
        return ((POWER[ai.type]||5)+ai.hp) >= ((POWER[hu.type]||5)+hu.hp)-1;
    }

    function scoreTarget(piece,tc,tr) {
        var there=game.getIconOnBoard(tc,tr);
        if (there && there.side===AI) return -999;
        var score=0;
        if (there && there.side!==AI) {
            score+=20;
            if (canBeat(piece,there)) score+=15;
            if (there.isMage && there.isMage()) score+=CFG.mageBonus;
        }
        if (isPP(tc,tr)) {
            score+=CFG.ppBonus;
            if (there && there.side!==AI) score+=CFG.ppBonus;
        }
        var best=999;
        for (var i=0;i<PP.length;i++) {
            var pp=PP[i], ex=game.getIconOnBoard(pp.col,pp.row);
            if (!ex||ex.side!==AI) { var d=Math.abs(tc-pp.col)+Math.abs(tr-pp.row); if(d<best)best=d; }
        }
        score -= best*2;
        score -= tc;
        score += (Math.random()-0.5);
        return score;
    }

    function findBestMove() {
        var forceRandom=(DIFFICULTY===1 && Math.random()<CFG.randomChance);
        var best=null, bestScore=forceRandom?999:-9999;
        var pieces=aiPieces();
        if (!pieces.length) return null;

        if (forceRandom) {
            var p=pieces[Math.floor(Math.random()*pieces.length)];
            var cands=[];
            for (var r=0;r<=8;r++) for (var c=0;c<=8;c++) {
                if(c===p.col&&r===p.row) continue;
                if (Math.abs(c-p.col)+Math.abs(r-p.row)>p.maxSteps) continue;
                var ex=game.getIconOnBoard(c,r);
                if (!ex||ex.side!==AI) cands.push({col:c,row:r});
            }
            if (cands.length) return {piece:p, target:cands[Math.floor(Math.random()*cands.length)]};
        }

        for (var p=0;p<pieces.length;p++) {
            var piece=pieces[p];
            for (var r=0;r<=8;r++) for (var c=0;c<=8;c++) {
                if(c===piece.col&&r===piece.row) continue;
                if (Math.abs(c-piece.col)+Math.abs(r-piece.row)>piece.maxSteps) continue;
                var ex=game.getIconOnBoard(c,r);
                if (ex&&ex.side===AI) continue;
                var sc=scoreTarget(piece,c,r);
                if (sc>bestScore) { bestScore=sc; best={piece:piece,target:{col:c,row:r}}; }
            }
        }
        return best;
    }

    // ── Spell selection (hard mode) ───────────────────────────────────────────
    function spellAvail(idx) {
        return game.spells && game.spells[AI] && game.spells[AI][idx] !== false;
    }

    function getBestImprisonTarget() {
        // Imprison is wasted: dark at status 0, light at status 5
        if (AI==='dark'&&game.circleStatus===0) return null;
        if (AI==='light'&&game.circleStatus===5) return null;
        var best=null, bestP=6;  // only target power >= 7
        for (var i=0;i<game.icons.length;i++) {
            var ic=game.icons[i];
            if (ic.dead||ic.imprisoned||ic.side!==PLAYER_SIDE) continue;
            var p=POWER[ic.type]||5;
            if (p>=bestP && !isPP(ic.col,ic.row)) { bestP=p; best=ic; }
        }
        return best;
    }

    function getMostInjured() {
        var worst=null, worstRatio=0.65;  // only heal below 65% HP
        for (var i=0;i<game.icons.length;i++) {
            var ic=game.icons[i];
            if (ic.dead||ic.side!==AI||ic.baseHP<=0) continue;
            if (isPP(ic.col,ic.row)) continue;  // can't heal on PP
            var ratio=ic.hp/ic.baseHP;
            if (ratio<worstRatio && (POWER[ic.type]||5)>=5) { worstRatio=ratio; worst=ic; }
        }
        return worst;
    }

    function getBestSummonTarget() {
        var spellable = game.getSpellableEnemyIcons ? game.getSpellableEnemyIcons(AI) : [];
        if (!spellable.length) {
            // Fallback: non-PP light pieces
            for (var i=0;i<game.icons.length;i++) {
                var ic=game.icons[i];
                if (!ic.dead&&!ic.imprisoned&&ic.side===PLAYER_SIDE&&!isPP(ic.col,ic.row)) spellable.push(ic);
            }
        }
        var best=null, bestP=0;
        for (var i=0;i<spellable.length;i++) {
            var p=POWER[spellable[i].type]||5;
            if (p>bestP) { bestP=p; best=spellable[i]; }
        }
        return best;
    }

    // Returns chosen spell index, or -1 for normal move/teleport
    function pickBestSpell() {
        if (!CFG.useSpells) return -1;

        // 1. Imprison a very powerful enemy
        if (spellAvail(6)) {
            var et=getBestImprisonTarget();
            if (et) { bSpellTarget=et; return 6; }
        }

        // 2. Heal an injured strong piece
        if (spellAvail(1)) {
            var inj=getMostInjured();
            if (inj) { bSpellTarget=inj; return 1; }
        }

        // 3. Summon elemental against strong enemy
        if (spellAvail(4)) {
            var st=getBestSummonTarget();
            if (st) { bSpellTarget=st; return 4; }
        }

        // 4. Shift time when cycle is at extreme (0=bad for dark, favor 3/4/5)
        if (spellAvail(2) && game.circleStatus <= 1) return 2;

        return -1;  // no spell, just move/teleport
    }

    // ── Board AI tick ─────────────────────────────────────────────────────────
    function boardTick() {
        if (game.delayName||(game.frameCounters&&game.frameCounters.delay>0)) { clr(); return; }
        // Safety: if somehow in browse state, press fire to cast whatever is highlighted
        if (game.spelling==='browse') { clr(); press('fire'); return; }
        if (game.spelling&&game.spelling!=='browse') { clr(); return; }
        if (game.ctrlTexts) game.ctrlTexts[AI]=true;

        switch (bState) {

        // ── Idle / planning ───────────────────────────────────────────────────
        case 'idle':
            clr(); bTimer++;
            if (bTimer >= CFG.thinkDelay) {
                bTimer=0;
                var mv=findBestMove();
                if (mv) { bPiece=mv.piece; bTarget=mv.target; bState='cursorToPiece'; }
            }
            break;

        // ── Select piece ──────────────────────────────────────────────────────
        case 'cursorToPiece':
            clr(); setCursor(bPiece.col,bPiece.row); bTimer=0; bState='waitSelect'; break;

        case 'waitSelect':
            clr(); bTimer++;
            if (bTimer>=4) { bTimer=0; bState='fireSelect'; }
            break;

        case 'fireSelect':
            press('fire'); bState='releaseSelect'; break;

        case 'releaseSelect':
            release('fire');
            if (game.selectedIcon===bPiece) {
                if (bPiece.isMage()) {
                    // Hard: try to pick a spell, otherwise teleport
                    bSpellChoice = (DIFFICULTY===3) ? pickBestSpell() : -1;
                    bState = (bSpellChoice >= 0) ? 'cursorToMageForBrowse' : 'cursorToTarget';
                } else {
                    bPrevCol=bPiece.col; bPrevRow=bPiece.row; bStall=0;
                    bState='movePiece';
                }
            } else {
                resetBoard(); bTimer=-15;
            }
            break;

        // ── Normal mage: teleport to target ──────────────────────────────────
        case 'cursorToTarget':
            clr(); setCursor(bTarget.col,bTarget.row); bTimer=0; bState='waitConfirm'; break;

        case 'waitConfirm':
            clr(); bTimer++;
            if (bTimer>=4) { bTimer=0; bState='fireConfirm'; }
            break;

        case 'fireConfirm':
            press('fire'); bState='releaseConfirm'; break;

        case 'releaseConfirm':
            release('fire'); bState='waitTurnEnd'; bTimer=0; break;

        // ── Spell flow: open browse menu ──────────────────────────────────────
        // Fire on own mage position → startBrowsingSpells()
        case 'cursorToMageForBrowse':
            clr(); setCursor(bPiece.col,bPiece.row); bTimer=0; bState='waitBrowse'; break;

        case 'waitBrowse':
            clr(); bTimer++;
            if (bTimer>=4) { bTimer=0; bState='fireBrowse'; }
            break;

        case 'fireBrowse':
            press('fire'); bState='releaseBrowse'; break;

        case 'releaseBrowse':
            release('fire');
            // If browse mode activated, navigate to desired spell
            // If not (unexpected), fall back to teleport
            bState = (game.spelling==='browse') ? 'navigateSpell' : 'cursorToTarget';
            break;

        // ── Spell flow: navigate spell list ──────────────────────────────────
        // startBrowsingSpells() already positioned at first available spell.
        // Press 'down' each frame until game.spellIndex === bSpellChoice.
        case 'navigateSpell':
            clr();
            if (game.spellIndex === bSpellChoice) {
                bState='fireCastSpell';
            } else if (!spellAvail(bSpellChoice)) {
                // Spell was used by someone else or unavailable, bail to teleport
                bState='cursorToTarget';
            } else {
                press('down');  // processed by origScan next frame
            }
            break;

        case 'fireCastSpell':
            press('fire'); bState='releaseCastSpell'; break;

        case 'releaseCastSpell':
            release('fire'); bTimer=0; bState='waitSpellAction'; break;

        // ── Spell flow: execute spell after casting ───────────────────────────
        case 'waitSpellAction':
            clr(); bTimer++;
            if (bTimer < 5) break;  // wait for game to process castSpell()

            var sp=game.spelling;

            // Shift time (2): auto-executes, no further input
            if (!sp || sp==='browse') { bState='waitTurnEnd'; break; }

            // Summon elemental: reuse movePiece to navigate elemental to enemy
            if (sp==='summonElemental' && game.selectedIcon) {
                bPiece=game.selectedIcon;
                bPrevCol=-1; bPrevRow=-1; bStall=0;
                bState='movePiece';
                break;
            }

            // Imprison / Heal: cursor on target → fire → doSpellFrameAction
            if ((sp==='imprison'||sp==='heal') && bSpellTarget) {
                setCursor(bSpellTarget.col, bSpellTarget.row);
                bState='fireSpellAction';
                break;
            }

            // Anything else unhandled: bail
            bState='waitTurnEnd';
            break;

        case 'fireSpellAction':
            press('fire'); bState='releaseSpellAction'; break;

        case 'releaseSpellAction':
            release('fire'); bState='waitTurnEnd'; break;

        // ── Non-mage piece movement ───────────────────────────────────────────
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
            if (Math.abs(dc)>=Math.abs(dr)) { if(dc>0)press('right'); else press('left'); }
            else                            { if(dr>0)press('down');  else press('up');   }
            break;

        // ── Wait for opponent's turn ──────────────────────────────────────────
        case 'waitTurnEnd':
            clr(); bTimer++;
            if (game.actualSide!==AI || bTimer>200) resetBoard();
            break;
        }
    }

    // ── Combat AI tick ────────────────────────────────────────────────────────
    function combatTick() {
        if (game.combat.status!=='combat') { clr(); return; }
        var aiIcon=game.combat.icons[AI], huIcon=game.combat.icons[PLAYER_SIDE];
        if (!aiIcon||!huIcon||aiIcon.hp<=0) { clr(); return; }

        var dx=huIcon.x-aiIcon.x, dy=huIcon.y-aiIcon.y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        var isRanged=!!(RANGED[aiIcon.type]);
        var opt=CFG.combatRange;

        var ml=false,mr=false,mu=false,md=false,doFire=false;

        if (dist>opt+25) {
            if(Math.abs(dx)>=Math.abs(dy)){if(dx>0)mr=true;else ml=true;}
            else{if(dy>0)md=true;else mu=true;}
        } else if (isRanged&&dist<opt-25) {
            if(Math.abs(dx)>=Math.abs(dy)){if(dx>0)ml=true;else mr=true;}
            else{if(dy>0)mu=true;else md=true;}
        } else {
            var t=game.frameCounters?(game.frameCounters.combat||0):0;
            var cw=Math.floor(t/CFG.strafeFreq)%2===0;
            if(Math.abs(dx)>=Math.abs(dy)){mu=cw;md=!cw;}else{ml=cw;mr=!cw;}
        }

        if (CFG.dodgeDist>0) {
            var bul=game.combat.bullet[PLAYER_SIDE];
            if (bul&&bul.posX!==undefined) {
                var bx=bul.posX-aiIcon.x, by=bul.posY-aiIcon.y;
                if (Math.sqrt(bx*bx+by*by)<CFG.dodgeDist) {
                    if(Math.abs(bx)<Math.abs(by)){ml=aiIcon.x>152;mr=!ml;mu=false;md=false;}
                    else{mu=aiIcon.y>96;md=!mu;ml=false;mr=false;}
                }
            }
        }

        // Hard: predictive aim
        var aimDx=dx, aimDy=dy;
        if (DIFFICULTY===3&&isRanged) {
            aimDx=huIcon.x+(huIcon.x-aiIcon.x)*0.15-aiIcon.x;
            aimDy=huIcon.y+(huIcon.y-aiIcon.y)*0.15-aiIcon.y;
        }

        if(aiIcon.x<28){ml=false;mr=true;} if(aiIcon.x>285){mr=false;ml=true;}
        if(aiIcon.y<25){mu=false;md=true;} if(aiIcon.y>167){md=false;mu=true;}

        var aRate=game.combat.attackRate?game.combat.attackRate[AI]:0;
        if (aRate===0) {
            if(isRanged&&dist<CFG.fireDist) doFire=true;
            if(!isRanged&&dist<28)          doFire=true;
        }

        clr();
        if (doFire) {
            if(Math.abs(aimDx)>=Math.abs(aimDy)){if(aimDx>0)press('right');else press('left');}
            else{if(aimDy>0)press('down');else press('up');}
            press('fire');
        } else {
            if(ml)press('left'); if(mr)press('right');
            if(mu)press('up');   if(md)press('down');
        }
    }

    // ── Engine patch ──────────────────────────────────────────────────────────
    function patchEngine() {
        // Player always uses arrow keys; AI always uses WASD
        if (PLAYER_SIDE==='light') {
            engine.options.lightControl='keyboardArrows';
            engine.options.darkControl='keyboardWasd';
        } else {
            engine.options.lightControl='keyboardWasd';
            engine.options.darkControl='keyboardArrows';
        }
        KEYS=DATA.keys[1];  // AI always injects into WASD keys

        // ESC always returns to landing page
        var _kd=document.onkeydown;
        document.onkeydown=function(e){
            if(e.which===27){window.location.href='/';return;}
            if(_kd)_kd.call(document,e);
        };

        var origScan=engine.scanRoutine.bind(engine);
        engine.scanRoutine=function(){
            // Skip Local/Online menu — already chose SP
            if(game.scene==='menu'&&game.menuLevel===1&&!engine.room) game.menuLevel=2;
            // Reset AI state when returning to menu (ESC/game-over)
            if(game.scene==='menu'&&bState!=='idle') resetBoard();
            origScan();
            if     (game.scene==='table' &&game.actualSide===AI&&!game.gameEnded) boardTick();
            else if(game.scene==='combat') combatTick();
            else if(game.scene==='table' &&game.actualSide!==AI) clr();
        };

        console.log('[AI] difficulty='+DIFFICULTY+(DIFFICULTY===3?' (spells ON)':''));
    }

    var _wait=setInterval(function(){
        if(typeof engine!=='undefined'&&typeof game!=='undefined'&&
           typeof DATA!=='undefined'&&game&&game.menuLevel!==undefined&&
           engine.options&&DATA.keys){
            clearInterval(_wait);
            patchEngine();
        }
    },100);

})();

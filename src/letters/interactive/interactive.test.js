import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ALPHABET,readPreferences} from '../data/letters.js';
import {makeCollectorRounds,makeMatchingRounds,pointInRect,relativePoint,acceptUnique,capturePointer} from './model.js';
import {PHONICS,makeSortingRounds} from './phonics.js';
import {TRACE_LETTERS,STROKES,EMPTY_TRACE,beginTrace,advanceTrace,traceProgress} from './strokePaths.js';
import {balloonLayout,balloonPosition} from './balloonMotion.js';
import {ARCADE_GAMES,makeArcadeRounds} from '../arcade/rounds.js';
for(const difficulty of ['easy','medium'])for(const mode of ['uppercase','lowercase','mixed'])test(`collector ${difficulty}/${mode}: all single-letter selections and unique token accounting`,()=>{
 for(const letter of ALPHABET){const rounds=makeCollectorRounds({letters:[letter],difficulty,collectorCase:mode});assert.equal(rounds.length,5);for(const q of rounds){assert.equal(q.letter,letter);assert.equal(q.tokens.length,difficulty==='easy'?8:12);assert.equal(q.tokens.filter(t=>t.correct).length,q.matches);assert.equal(new Set(q.tokens.map(t=>t.id)).size,q.tokens.length);assert.ok(q.tokens.every(t=>t.correct===(t.letter.toUpperCase()===letter)));if(mode==='uppercase')assert.ok(q.tokens.every(t=>t.letter===t.letter.toUpperCase()));if(mode==='lowercase')assert.ok(q.tokens.every(t=>t.letter===t.letter.toLowerCase()));if(mode==='mixed')assert.equal(new Set(q.tokens.filter(t=>t.correct).map(t=>t.letter)).size,2);}}
});
for(const difficulty of ['easy','medium'])test(`matching ${difficulty}: selected pairs only, shuffled columns, single-letter support`,()=>{
 for(const letters of [...ALPHABET.map(l=>[l]),['A','B','C'],ALPHABET])for(const q of makeMatchingRounds({letters,difficulty})){assert.equal(q.left.length,Math.min(letters.length,difficulty==='easy'?3:4));assert.deepEqual([...q.left].sort(),[...q.right].sort());assert.equal(new Set(q.left).size,q.left.length);assert.ok(q.left.every(l=>letters.includes(l)));if(letters.length>1)assert.notDeepEqual(q.left,q.right);}
});
test('drag hit testing handles transformed/scaled coordinates; outside drops and duplicate scoring are rejected',()=>{
 const rect={left:100,right:300,top:200,bottom:400,width:200,height:200};assert.ok(pointInRect({x:150,y:350},rect));assert.ok(!pointInRect({x:20,y:20},rect));assert.deepEqual(relativePoint({x:150,y:250},rect,1000,1000),{x:250,y:250});
 const original=[];assert.equal(acceptUnique(original,'wrong',false),original);const first=acceptUnique(original,'A',true);assert.equal(acceptUnique(first,'A',true),first);assert.doesNotThrow(()=>capturePointer({setPointerCapture(){throw new Error('Cancelled')}},1));
});
test('sorting: six local pictures, all target sets including X final sound, correct/distractor membership',()=>{
 for(const letter of ALPHABET)for(const q of makeSortingRounds({letters:[letter]})){assert.equal(q.items.length,6);assert.equal(new Set(q.items.map(p=>p.id)).size,6);assert.equal(q.items.filter(p=>p.correct).length,q.required);for(const p of q.items){const match=letter==='X'?p.word.toLowerCase().endsWith('x'):p.word[0].toUpperCase()===letter;assert.equal(p.correct,match);assert.ok(p.art);}}
 for(const letter of ['A','B','C','D','S','T'])assert.equal(PHONICS[letter].length,3);
});
test('all sorting artwork is bundled as an explicit SVG or retained existing illustration',async()=>{
 const source=await readFile(new URL('./PictureArt.jsx',import.meta.url),'utf8'),base=await readFile(new URL('../Illustration.jsx',import.meta.url),'utf8');for(const p of Object.values(PHONICS).flat())assert.ok(source.includes(p.art)||base.includes(p.art),`Missing illustration: ${p.art}`);
});
for(const letter of TRACE_LETTERS)for(const tolerance of [17,25])test(`real tracing ${letter}, tolerance ${tolerance}: every ordered stroke requires movement`,()=>{
 for(const path of STROKES[letter]){
  assert.ok(path.points.length>20);assert.ok(path.length>50);
  assert.equal(beginTrace(path,path.end,tolerance).started,false);
  let state=beginTrace(path,path.start,tolerance);assert.ok(state.started);assert.ok(!state.complete);assert.equal(traceProgress(path,state),0);
  const teleport=advanceTrace(path,state,path.end,tolerance);assert.ok(!teleport.complete);assert.ok(teleport.index<path.points.length/2);
  for(const point of path.points.slice(1))state=advanceTrace(path,state,point,tolerance);
  assert.ok(state.complete);assert.ok(traceProgress(path,state)>.97);assert.ok(state.coverage>=.94);
 }
});
test('tracing rejects wrong starts, off-path movement, direction reversal, and endpoint-only attempts',()=>{
 for(const letter of TRACE_LETTERS)for(const path of STROKES[letter]){
  let state=beginTrace(path,{x:-100,y:-100},25);assert.ok(!state.started);assert.ok(!advanceTrace(path,state,path.end,25).complete);
  state=beginTrace(path,path.start,17);const off=advanceTrace(path,state,{x:-200,y:300},17);assert.ok(off.warning);assert.equal(off.index,0);
  const backwards=advanceTrace(path,state,path.points.at(-1),17);assert.ok(!backwards.complete);
 }
 assert.deepEqual(TRACE_LETTERS,['A','B','C','S','T']);assert.equal(STROKES.A.length,3);assert.equal(STROKES.B.length,2);assert.equal(STROKES.T.length,2);assert.equal(STROKES.Z,undefined);
});
test('balloon hitboxes actually travel, stay inside safe lanes, and never overlap',()=>{
 for(const [width,height,count] of [[1600,500,6],[920,320,4],[650,400,6],[760,170,6],[330,300,6]]){
  const layout=balloonLayout(width,height,count);let moved=false;
  for(const time of [0,1,2,5,12,30,80]){
   const boxes=Array.from({length:count},(_,i)=>{const p=balloonPosition(layout,i,time);return {...p,w:layout.width,h:layout.height}});
   for(const [i,b]of boxes.entries()){assert.ok(b.x>=0&&b.y>=0&&b.x+b.w<=width+.1&&b.y+b.h<=height+.1);const initial=balloonPosition(layout,i,0);moved ||= Math.hypot(b.x-initial.x,b.y-initial.y)>10;for(const other of boxes.slice(i+1))assert.ok(Math.min(b.x+b.w,other.x+other.w)-Math.max(b.x,other.x)<=0||Math.min(b.y+b.h,other.y+other.h)-Math.max(b.y,other.y)<=0);}
  }
  assert.ok(moved);
 }
});
test('train removal is explicit and new case preference preserves all prior settings',()=>{
 assert.ok(!ARCADE_GAMES.some(g=>g.id==='train'));assert.throws(()=>makeArcadeRounds(['A'],'train'),/Unknown/);
 const pref=readPreferences({getItem:()=>JSON.stringify({letters:['T'],difficulty:'medium',sound:false,reach:true,collectorCase:'mixed',arcadeAudio:{speech:true,effects:false,cheering:true}})});
 assert.equal(pref.collectorCase,'mixed');assert.deepEqual(pref.letters,['T']);assert.equal(pref.sound,false);assert.equal(pref.reach,true);assert.equal(pref.arcadeAudio.speech,true);
});

test('Shapes-sized smartboard balloon field keeps large, separate moving hitboxes',()=>{
 for(const count of [4,6])for(const height of [220,254,306]){
  const layout=balloonLayout(742,height,count);
  assert.equal(layout.rows,1);
  assert.ok(layout.width>=100&&layout.height>=100);
  for(let tick=0;tick<120;tick++){
   const boxes=Array.from({length:count},(_,i)=>({...balloonPosition(layout,i,tick/4),width:layout.width,height:layout.height}));
   for(const b of boxes){assert.ok(b.x>=0&&b.y>=0);assert.ok(b.x+b.width<=742&&b.y+b.height<=height);}
   for(let i=1;i<count;i++)assert.ok(boxes[i-1].x+boxes[i-1].width<=boxes[i].x);
  }
 }
});

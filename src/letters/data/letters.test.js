import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ALPHABET,PICTURES,makeRounds,readPreferences} from './letters.js';
for(const type of ['detective','pair','picture'])for(const difficulty of ['easy','medium']){
 test(`${type} / ${difficulty}: targets, distractors, unique correct choices and ten rounds`,()=>{
  for(const selected of [['A'],['A','B','C','S','T'],ALPHABET])for(let run=0;run<15;run++){
   const rounds=makeRounds(selected,type,difficulty);assert.equal(rounds.length,10);
   rounds.forEach((q,i)=>{
    assert.ok(selected.includes(q.letter));
    if(i&&selected.length>1)assert.notEqual(q.letter,rounds[i-1].letter);
    const answer=type==='picture'?q.letter:type==='pair'?q.letter.toLowerCase():q.target;
    assert.equal(q.options.filter(x=>(type==='picture'?x.letter:x)===answer).length,1);
    assert.equal(new Set(q.options.map(x=>type==='picture'?x.letter:x.toUpperCase())).size,q.options.length);
    assert.equal(q.options.length,type==='pair'?(difficulty==='easy'?3:5):type==='picture'?(difficulty==='easy'?3:4):(difficulty==='easy'?4:6));
    if(type==='pair')assert.ok(q.options.every(x=>x===x.toLowerCase()));
    if(type==='detective')assert.ok(q.options.every(x=>x===x.toUpperCase()));
   });
   if(selected.length<=10)assert.equal(new Set(rounds.map(q=>q.letter)).size,selected.length);
  }
 });
}
test('empty targets cannot start',()=>assert.throws(()=>makeRounds([],'detective','easy'),/Choose/));
test('all letters have recognizable picture data; X is a documented final-sound exception',()=>{
 assert.deepEqual(PICTURES.map(p=>p.letter),ALPHABET);
 for(const p of PICTURES){assert.ok(p.art);if(p.letter!=='X')assert.equal(p.word[0].toUpperCase(),p.letter);else assert.equal(p.word,'Fox');}
});
test('saved preferences handle corruption, invalid fields, and intentionally empty selections',()=>{
 const storage=value=>({getItem:()=>value});
 assert.equal(readPreferences(storage('bad json')).letters.length,26);
 assert.equal(readPreferences(storage('{"letters":[]}')).letters.length,0);
 assert.deepEqual(readPreferences(storage('{"letters":["A","A","?"],"difficulty":"hard","sound":false,"reach":true}')),{letters:['A'],difficulty:'easy',sound:false,reach:true});
 assert.equal(readPreferences(storage('null')).letters.length,26);
});

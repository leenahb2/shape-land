import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ALPHABET,readPreferences} from '../data/letters.js';
import {ARCADE_GAMES,makeArcadeRounds,arcadeReducer,INITIAL_ROUND,audioPreferences,instructionFor} from './rounds.js';
import {ArcadeAudio} from './audio/ArcadeAudio.js';

for(const game of ARCADE_GAMES)for(const difficulty of ['easy','medium']){
 test(`${game.id}/${difficulty}: selected targets, one answer, correct rounds, valid single-letter curriculum`,()=>{
  for(const selected of [...ALPHABET.map(letter=>[letter]),['A','B','C','S','T'],ALPHABET]){
   const rounds=makeArcadeRounds(selected,game.id,difficulty);
   assert.equal(rounds.length,game.rounds);
   for(const [i,q] of rounds.entries()){
    assert.ok(selected.includes(q.letter));
    assert.equal(q.choices.filter(choice=>choice===q.target).length,1);
    assert.equal(q.choices.length,new Set(q.choices).size);
    assert.ok(q.choices.every(choice=>ALPHABET.includes(choice.toUpperCase())));
    assert.ok(instructionFor(game.id,q));
    if(selected.length>1&&i)assert.notEqual(q.letter,rounds[i-1].letter);
    if(game.id==='train'){
     assert.equal(q.sequence[q.missingIndex],q.target);
     assert.equal(q.sequence.length,difficulty==='easy'?3:4+i%2);
     q.sequence.slice(1).forEach((letter,j)=>assert.equal(letter.charCodeAt(0),q.sequence[j].charCodeAt(0)+1));
    }else if(game.id!=='eggs'||difficulty==='easy')assert.ok(q.choices.every(c=>c===c.toUpperCase()));
   }
  }
 });
}
test('arcade starts reject empty/invalid targets and unknown games',()=>{
 assert.throws(()=>makeArcadeRounds([],'train'));assert.throws(()=>makeArcadeRounds(['?'],'rocket'));assert.throws(()=>makeArcadeRounds(['A'],'unknown'));
});
test('wrong answers and elapsed advance actions never progress; success progresses exactly once to completion',()=>{
 for(const {id,rounds:total} of ARCADE_GAMES){
  let state={...INITIAL_ROUND};
  for(let index=0;index<total;index++){
   state=arcadeReducer(state,{type:'answer',answer:'B',target:'A'});
   assert.equal(state.index,index);assert.equal(state.phase,'playing');assert.ok(state.wrong);
   state=arcadeReducer(state,{type:'advance',total});assert.equal(state.index,index);assert.equal(state.phase,'playing');
   state=arcadeReducer(state,{type:'answer',answer:'A',target:'A'});assert.equal(state.phase,'reward');
   assert.deepEqual(arcadeReducer(state,{type:'answer',answer:'A',target:'A'}),state);
   state=arcadeReducer(state,{type:'advance',total});
  }
  assert.equal(state.phase,'done',id);assert.equal(state.index,total-1);
  assert.deepEqual(arcadeReducer(state,{type:'answer',answer:'A',target:'A'}),state);
 }
});
test('arcade audio preferences preserve legacy choices and migrate optional independent toggles',()=>{
 assert.deepEqual(audioPreferences({sound:false}),{speech:false,effects:false,cheering:false});
 const value=readPreferences({getItem:()=>JSON.stringify({letters:['A'],sound:false,reach:true,arcadeAudio:{speech:true,effects:false,cheering:true}})});
 assert.deepEqual(value.letters,['A']);assert.equal(value.sound,false);assert.equal(value.reach,true);
 assert.deepEqual(audioPreferences(value),{speech:true,effects:false,cheering:true});
});
test('unsupported audio never blocks instruction or celebration',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const audio=new ArcadeAudio(()=>({sound:true}),{});
 assert.doesNotThrow(()=>audio.instruction('Find A!'));
 assert.doesNotThrow(()=>audio.playCelebration('rocket'));
 t.mock.timers.tick(4000);audio.dispose();
});
test('instruction cancels pending celebration, recorded playback, speech, and active sources',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const events=[];
 const platform={SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},speechSynthesis:{cancel(){events.push('cancel')},getVoices(){return []},speak(value){events.push(value.text)}},Audio:class{play(){events.push('play');return Promise.resolve()}pause(){events.push('pause')}}};
 const audio=new ArcadeAudio(()=>({sound:true}),platform);audio.loaded=true;audio.recordings=['yay.mp3'];
 audio.sources.add({stop(){events.push('stop source')}});
 audio.playCelebration('train');t.mock.timers.tick(700);assert.ok(events.includes('play'));
 audio.instruction('Which letter is missing?');assert.ok(events.includes('pause'));assert.ok(events.includes('stop source'));
 t.mock.timers.tick(5000);assert.equal(events.at(-1),'Which letter is missing?');audio.dispose();
});
test('independent audio toggles mute only their own channels',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const said=[],tones=[];let settings={sound:true,arcadeAudio:{speech:false,effects:false,cheering:true}};
 const audio=new ArcadeAudio(()=>settings,{SpeechSynthesisUtterance:class{},speechSynthesis:{cancel(){},getVoices(){return []},speak(value){said.push(value)}}});
 audio.tone=(...args)=>tones.push(args);audio.instruction('Hello');assert.equal(said.length,0);
 audio.effect('rocket');assert.equal(tones.length,0);audio.cheer();assert.ok(tones.length>0);
 settings={sound:true,arcadeAudio:{speech:true,effects:true,cheering:false}};tones.length=0;
 audio.instruction('Hello');assert.equal(said.length,1);audio.cheer();assert.equal(tones.length,0);audio.effect('rocket');assert.ok(tones.length>0);audio.dispose();
});
test('missing recordings fall back; stale errors cannot restart stopped audio',async()=>{
 let fallback=0;
 const audio=new ArcadeAudio(()=>({sound:true}),{Audio:class{play(){return Promise.reject(new Error('Missing'))}pause(){}}});
 audio.recordings=['missing.mp3'];audio.syntheticCheer=()=>fallback++;
 audio.cheer();await Promise.resolve();assert.equal(fallback,1);
 const stale=audio.recording.onerror;audio.stop();stale();assert.equal(fallback,1);audio.dispose();
});
test('recording manifest only accepts local audio filenames',async()=>{
 const audio=new ArcadeAudio(()=>({sound:true}),{fetch:async()=>({ok:true,json:async()=>['yay.mp3','woohoo.ogg','https://example.com/cheer.mp3','../bad.wav','empty.txt',null]})});
 await audio.loadRecordings();assert.deepEqual(audio.recordings,['yay.mp3','woohoo.ogg']);audio.dispose();
});

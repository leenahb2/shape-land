import {test} from 'node:test';
import assert from 'node:assert/strict';
import {narrate,voiceAvailable} from './narration.js';
test('narration degrades gracefully without voice support or when synthesis throws',()=>{
 globalThis.window={};assert.equal(voiceAvailable(),false);assert.doesNotThrow(()=>narrate('Find A',true));
 window.speechSynthesis={cancel(){throw new Error('Unavailable')}};window.SpeechSynthesisUtterance=class{};
 assert.doesNotThrow(()=>narrate('Find A',true));delete globalThis.window;
});
test('replay uses slow English narration and sound off does not speak',()=>{
 const calls=[];globalThis.window={SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},speechSynthesis:{cancel(){calls.push('cancel')},getVoices(){return [{lang:'en-US'}]},speak(value){calls.push(value)}}};
 narrate('Find the letter A!',false);assert.equal(calls.length,0);
 narrate('Find the letter A!',true);narrate('Find the letter A!',true);
 assert.equal(calls.length,4);assert.equal(calls[1].text,calls[3].text);assert.equal(calls[1].lang,'en-US');assert.ok(calls[1].rate<1);assert.equal(calls[1].voice.lang,'en-US');delete globalThis.window;
});

import {ArcadeAudio} from '../letters/arcade/audio/ArcadeAudio.js';
import {WORDS} from './numberData.js';
export class NumbersAudio extends ArcadeAudio{
 preferences(){const s=this.getSettings();return {speech:s.speech,effects:s.effects,cheering:s.celebrations};}
 effect(kind){if(!this.preferences().effects)return;if(kind==='dino'){this.tone(160,0,.09,.025,'triangle',85);this.tone(210,.12,.09,.02,'triangle',100);}else if(kind==='tower'){this.tone(260,0,.08,.025);this.tone(660,.07,.1,.025);}else if(kind==='fishing'){this.tone(190,0,.17,.025,'sine',700);this.tone(1000,.07,.12,.018,'sine',250);}else{[523,659,784].forEach((f,i)=>this.tone(f,i*.06,.12,.02));}}
 count(number,kind){this.stop();this.unlock();this.effect(kind);this.later(()=>this.say(`${WORDS[number]}!`),240);}
 win(number,kind){this.count(number,kind);this.later(()=>{this.stop();this.cheer(false);this.later(()=>{this.stop();this.say('Well done!');},1050);},1200);}
}

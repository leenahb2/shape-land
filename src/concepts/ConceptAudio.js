import {ArcadeAudio} from '../letters/arcade/audio/ArcadeAudio.js';
export default class ConceptAudio extends ArcadeAudio {
 preferences(){const s=this.getSettings();return {speech:s.voice,effects:s.effects,cheering:s.cheering};}
 effect(kind){if(!this.preferences().effects)return;const f=kind==='garden'?460:kind==='sorting'?210:590;this.tone(f,0,.16,.02,'sine',f+160);this.tone(f+220,.16,.12,.016);}
 cue(kind,text){this.stop();this.unlock();this.effect(kind);if(text)this.later(()=>this.say(text),350);}
 reward(kind,message='Fantastic!'){this.stop();this.unlock();this.effect(kind);this.later(()=>this.cheer(false),500);this.later(()=>{this.stop();this.say(message);},2200);}
}

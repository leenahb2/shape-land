import {ArcadeAudio} from '../letters/arcade/audio/ArcadeAudio.js';
export class ColorsAudio extends ArcadeAudio{
 preferences(){const s=this.getSettings();return {speech:s.voice,effects:s.effects,cheering:s.cheering};}
 effect(kind){if(!this.preferences().effects)return;if(kind==='lab'){this.tone(450,0,.16,.02,'sine',180);this.tone(660,.13,.12,.016,'sine',310);}else if(kind==='wash'){this.tone(420,0,.15,.016,'triangle',700);this.tone(580,.11,.12,.015,'sine',280);}else if(kind==='factory'){this.tone(190,0,.08,.02,'triangle');this.tone(720,.08,.12,.02);}else{[587,740,988].forEach((f,i)=>this.tone(f,i*.065,.13,.02));}}
 cue(kind,text){this.stop();this.unlock();this.effect(kind);if(text)this.later(()=>this.say(text),330);}
 win(kind){this.stop();this.unlock();this.effect(kind);this.later(()=>{this.stop();this.cheer(false);this.later(()=>{this.stop();this.say('Great job!');},1100);},650);}
}

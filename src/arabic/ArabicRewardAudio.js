import {ArcadeAudio} from '../letters/arcade/audio/ArcadeAudio.js';
// No recordings or utterances can enter this controller. Only musical effects.
export class ArabicRewardAudio extends ArcadeAudio{
 preferences(){const s=this.getSettings();return {speech:false,effects:(s.rewardEffects??s.effects)!==false,cheering:(s.rewardCelebrations??s.celebrations??s.cheering)!==false};}
 unlock(){const p=this.preferences();if(p.effects||p.cheering)super.unlock();}
 loadRecordings(){}
 say(){}
 instruction(){this.stop();}
 effect(){if(this.preferences().effects){this.tone(587,0,.12,.022);this.tone(784,.09,.16,.02);}}
 wrong(){this.stop();if(!this.preferences().effects)return;this.unlock();this.tone(392,0,.13,.018,'sine');this.tone(440,.14,.16,.015,'sine');}
 cheer(major=false){if(this.preferences().cheering)this.syntheticCheer(major);}
 cue(){this.stop();this.unlock();this.effect();}
 reward(){this.stop();this.unlock();this.effect();if(this.preferences().cheering)this.later(()=>this.cheer(),260);}
 win(){this.reward();}
 playCelebration(){this.reward();}
}

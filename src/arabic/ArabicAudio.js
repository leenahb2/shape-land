import {ArcadeAudio} from '../letters/arcade/audio/ArcadeAudio.js';
// Kept as a future recorded-audio selection helper; never used for playback now.
export function arabicVoice(voices=[]){return voices.find(v=>/^ar[-_]SA$/i.test(v.lang))||voices.find(v=>/^ar(?:[-_]|$)/i.test(v.lang))||null;}

// Arabic is intentionally silent. Preserve this category boundary for future
// reviewed recordings without enabling speech synthesis or changing shared audio.
export class ArabicAudio extends ArcadeAudio {
 constructor(...args){super(...args);this.stop();}
 preferences(){return {speech:false,effects:false,cheering:false};}
 unlock(){}
 loadRecordings(){}
 say(){}
 tone(){}
 effect(){}
 cheer(){}
 syntheticCheer(){}
 later(){}
 instruction(){this.stop();}
 reward(){this.stop();}
 playCelebration(){this.stop();}
}

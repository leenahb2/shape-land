import {audioPreferences} from '../rounds.js';

// One controller per mounted arcade. Every new cue cancels the previous cue.
// Synthesized celebration is deliberately NOT described as recorded children.
export class ArcadeAudio {
  constructor(getSettings,platform=globalThis.window,base=import.meta.env?.BASE_URL||'/shape-land/'){
    this.getSettings=getSettings; this.platform=platform; this.base=base;
    this.sources=new Set();this.timers=new Set();this.recordings=[];this.generation=0;
  }
  preferences(){return audioPreferences(this.getSettings());}
  unlock(){
    try{
      const Context=this.platform?.AudioContext||this.platform?.webkitAudioContext;
      if(Context){this.context ||= new Context();Promise.resolve(this.context.resume()).catch(()=>{});}
      if(!this.loaded){this.loaded=true;this.loadRecordings();}
    }catch{/* Audio must never block a round. */}
  }
  async loadRecordings(){
    try{
      const response=await this.platform?.fetch?.(`${this.base}audio/celebrations/manifest.json`);
      if(!response?.ok)return;
      const names=await response.json();
      this.recordings=Array.isArray(names)?names.filter(name=>typeof name==='string'&&/^[a-zA-Z0-9_-]+\.(mp3|ogg|wav)$/.test(name)):[];
    }catch{/* Offline or unavailable manifest: synthesized fallback. */}
  }
  later(callback,delay){const timer=setTimeout(()=>{this.timers.delete(timer);callback();},delay);this.timers.add(timer);}
  stop(){
    this.generation++;
    for(const timer of this.timers)clearTimeout(timer);this.timers.clear();
    for(const source of this.sources){try{source.stop();}catch{}}this.sources.clear();
    if(this.recording){this.recording.onerror=null;this.recording.pause();this.recording.currentTime=0;this.recording=null;}
    try{this.platform?.speechSynthesis?.cancel();}catch{}
  }
  tone(frequency,start,duration=.18,volume=.04,type='sine',endFrequency){
    const ctx=this.context;if(!ctx||ctx.state==='closed')return;
    try{
      const oscillator=ctx.createOscillator(),gain=ctx.createGain(),at=ctx.currentTime+start;
      oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,at);
      if(endFrequency)oscillator.frequency.exponentialRampToValueAtTime(endFrequency,at+duration);
      gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.015);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
      oscillator.connect(gain);gain.connect(ctx.destination);this.sources.add(oscillator);
      oscillator.onended=()=>{this.sources.delete(oscillator);oscillator.disconnect();gain.disconnect();};
      oscillator.start(at);oscillator.stop(at+duration+.02);
    }catch{}
  }
  effect(kind){
    if(!this.preferences().effects)return;
    if(kind==='balloons'){this.tone(360,0,.12,.07,'sine',75);this.tone(950,.04,.12,.025);}
    else if(kind==='rocket'){this.tone(100,0,.55,.025,'triangle',410);this.tone(210,.15,.4,.02,'sine',620);}
    else if(kind==='eggs'){[500,750,1000].forEach((f,i)=>this.tone(f,i*.1,.17,.035));}
    else {[587,740,988].forEach((f,i)=>this.tone(f,i*.09,.2,.035));}
  }
  syntheticCheer(major=false){
    if(!this.preferences().cheering)return;
    const melody=Math.random()<.5?[523,659,784,1047]:[659,784,988,1318];
    melody.forEach((f,i)=>this.tone(f,i*.11,.24,.035));
    [523,659,784].forEach(f=>this.tone(f,.5,major?.65:.35,.018));
    // Soft bursts of filtered noise suggest applause, without implying real voices.
    const ctx=this.context;if(!ctx)return;
    try{
      const length=Math.floor(ctx.sampleRate*.06),buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
      for(let i=0;i<(major?8:4);i++){
        const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
        source.buffer=buffer;filter.type='lowpass';filter.frequency.value=1700;gain.gain.value=.025;
        source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);this.sources.add(source);
        source.onended=()=>{this.sources.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};
        source.start(ctx.currentTime+.25+i*.09);
      }
    }catch{}
  }
  cheer(major=false){
    if(!this.preferences().cheering)return;
    const filename=this.recordings[Math.floor(Math.random()*this.recordings.length)];
    if(!filename||!this.platform?.Audio){this.syntheticCheer(major);return;}
    const token=this.generation;let fellBack=false;
    const fallback=()=>{if(token!==this.generation||fellBack)return;fellBack=true;this.recording?.pause();this.syntheticCheer(major);};
    try{
      this.recording=new this.platform.Audio(`${this.base}audio/celebrations/${filename}`);
      this.recording.volume=.28;this.recording.onerror=fallback;
      Promise.resolve(this.recording.play()).catch(fallback);
      this.later(()=>{if(token===this.generation&&this.recording){this.recording.pause();this.recording=null;}},major?2100:1400);
    }catch{fallback();}
  }
  say(text){
    if(!this.preferences().speech)return;
    try{
      const synth=this.platform?.speechSynthesis,Utterance=this.platform?.SpeechSynthesisUtterance;
      if(!synth||!Utterance)return;
      const utterance=new Utterance(text);utterance.lang='en-US';utterance.rate=.76;utterance.pitch=1.1;
      utterance.voice=synth.getVoices().find(v=>v.lang==='en-US')||synth.getVoices().find(v=>v.lang.startsWith('en'))||null;
      synth.speak(utterance);
    }catch{}
  }
  instruction(text){this.stop();this.unlock();this.say(text);}
  playCelebration(kind,{major=false,message='Amazing!'}={}){
    this.stop();this.unlock();this.effect(kind);
    this.later(()=>this.cheer(major),650);
    // Stop celebration before spoken encouragement, never talk over narration.
    this.later(()=>{this.stop();this.say(message);},major?2800:2300);
  }
  dispose(){this.stop();try{Promise.resolve(this.context?.close()).catch(()=>{});}catch{}}
}
export function playCelebration(controller,kind,options){controller.playCelebration(kind,options);}

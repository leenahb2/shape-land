let ctx;
export function speak(text,enabled=true){
 if(!enabled||!('speechSynthesis' in window))return;
 window.speechSynthesis.cancel();
 const utterance=new SpeechSynthesisUtterance(text);
 const voices=window.speechSynthesis.getVoices();
 utterance.voice=voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'))||null;
 utterance.lang='en-US';utterance.rate=.8;utterance.pitch=1.12;
 window.speechSynthesis.speak(utterance);
}
export function stopVoice(){window.speechSynthesis?.cancel();}
export function chime(enabled=true){
 if(!enabled)return;
 try{ctx ||= new (window.AudioContext||window.webkitAudioContext)();ctx.resume();[523,659,784,1047].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type='sine';o.frequency.value=f;const t=ctx.currentTime+i*.09;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.start(t);o.stop(t+.25);});}catch{}
}

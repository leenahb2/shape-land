import {stopVoice} from '../audio.js';
export function voiceAvailable(){return typeof window!=='undefined'&&!!window.speechSynthesis&&!!window.SpeechSynthesisUtterance;}
export function narrate(text,enabled){
 if(!enabled||!voiceAvailable())return;
 try{stopVoice();const utterance=new window.SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.74;utterance.pitch=1.08;utterance.voice=window.speechSynthesis.getVoices().find(v=>v.lang==='en-US')||window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'))||null;window.speechSynthesis.speak(utterance);}catch{/* Visual instructions remain available. */}
}

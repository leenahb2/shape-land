import {useEffect,useRef,useState} from 'react';
import {ArcadeAudio,playCelebration} from '../arcade/audio/ArcadeAudio';
import {audioPreferences} from '../arcade/rounds';
export default function useSession(kind,settings,paused,makeRounds,{manual=false}={}){
 const [deck]=useState(()=>makeRounds(settings));
 const [index,setIndex]=useState(0),[phase,setPhase]=useState('playing'),[message,setMessage]=useState('');
 const latest=useRef(settings);latest.current=settings;
 const [audio]=useState(()=>new ArcadeAudio(()=>latest.current));
 const lock=useRef(false),instruction=useRef(''),prefs=audioPreferences(settings);
 useEffect(()=>()=>audio.dispose(),[audio]);
 useEffect(()=>{audio.stop();if(!paused&&phase==='playing'&&instruction.current)audio.instruction(instruction.current);},[paused,prefs.speech,prefs.effects,prefs.cheering]);
 useEffect(()=>{
  if(phase!=='reward'||paused||manual)return;
  const timer=setTimeout(next,3600);return()=>clearTimeout(timer);
 },[phase,index,paused,manual]);
 function next(){if(phase!=='reward')return;audio.stop();if(index+1===deck.length){setPhase('done');playCelebration(audio,kind,{major:true,message:'Woohoo! You did it!'});}else{lock.current=false;setMessage('');setPhase('playing');setIndex(i=>i+1);}}
 function complete(praise){if(lock.current||paused)return;lock.current=true;setMessage('Wonderful! You did it!');setPhase('reward');playCelebration(audio,kind,{message:praise||(kind==='tracing'?`Beautiful tracing! ${deck[index].letter}!`:'Amazing!')});}
 function partial(text){if(lock.current||paused)return;setMessage(text);audio.stop();audio.unlock();audio.effect(kind);}
 function say(text){audio.instruction(text);}
 function announce(text){instruction.current=text;if(!paused)audio.instruction(text);}
 function resetCurrent(){lock.current=false;setPhase('playing');setMessage('');audio.stop();}
 return {index,phase,q:deck[index],total:deck.length,done:phase==='done',reward:phase==='reward',message,paused,
  complete,partial,hint:text=>setMessage(text),say,announce,next,resetCurrent,audio,replay:()=>say(instruction.current),
  canPlay:()=>!lock.current&&!paused,progress:phase==='done'?deck.length:index+(phase==='reward'?1:0)};
}

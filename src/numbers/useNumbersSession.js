import {useEffect,useRef,useState} from 'react';
import {makeRounds,instruction} from './numberData';
import {NumbersAudio} from './NumbersAudio';
export default function useNumbersSession(type,settings,paused){
 const [deck]=useState(()=>makeRounds(settings,type)),[index,setIndex]=useState(0),[reward,setReward]=useState(false),[message,setMessage]=useState(''),[history,setHistory]=useState([]);const latest=useRef(settings);latest.current=settings;const controller=useRef();if(!controller.current)controller.current=new NumbersAudio(()=>latest.current);const audio=controller.current,lock=useRef(false),done=index>=deck.length,q=deck[index],phrase=done?'You’re a number superstar!':instruction(type,q),phraseRef=useRef(phrase);phraseRef.current=phrase;
 const replay=()=>audio.instruction(phraseRef.current);
 useEffect(()=>{lock.current=false;setReward(false);setMessage('');if(!paused)replay();},[index]);
 useEffect(()=>{audio.stop();if(!paused&&!reward)replay();},[paused,settings.speech]);
 useEffect(()=>{if(!reward||paused)return;const timer=setTimeout(()=>{setReward(false);setIndex(i=>i+1);},3300);return()=>clearTimeout(timer);},[reward,paused]);
 useEffect(()=>()=>audio.dispose(),[]);
 const canPlay=()=>!paused&&!reward&&!done&&!lock.current;
 return {type,index,total:deck.length,progress:index+(reward?1:0),q,phrase,reward,done,paused,audio,message,history,canPlay,replay,count(n){if(!canPlay())return;setMessage(`${n}${type==='dino'?(n===1?' yummy fruit!':' yummy fruits!'):type==='garden'?(n===1?' flower growing!':' flowers growing!'):' — beautifully placed!'}`);audio.count(n,type);},hint(text){if(canPlay()){setMessage(text);audio.instruction(text);}},wrong(text='Try again. You can do it!'){if(canPlay()){setMessage(text);audio.instruction(text);}},complete(number=q.target){if(!canPlay())return;lock.current=true;setReward(true);setMessage(type==='dino'?(q.target===0?'Zero fruits. An empty plate for Dino!':'A happy tummy! Just the right amount.'):type==='garden'?(q.target===0?'Zero flowers. A lovely empty garden!':'Your beautiful garden is blooming!'):type==='tower'?'You built it! Look at your wonderful tower.':'A lovely catch! Into the number bucket.');setHistory(h=>[...h,{number:q.target,fruit:q.fruit}]);audio.win(number,type);}};
}

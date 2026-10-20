import {useEffect,useReducer,useRef,useState} from 'react';
import {arcadeReducer,INITIAL_ROUND,instructionFor,makeArcadeRounds,audioPreferences} from './rounds.js';
import {ArcadeAudio,playCelebration} from './audio/ArcadeAudio.js';
const PRAISE=['Amazing!','Brilliant!','Fantastic!','Superstar!','You did it!'];

export default function useArcade(type,settings,paused=false){
  const [rounds]=useState(()=>makeArcadeRounds(settings.letters,type,settings.difficulty));
  const [state,dispatch]=useReducer(arcadeReducer,INITIAL_ROUND);
  const latest=useRef(settings);latest.current=settings;
  const [audio]=useState(()=>new ArcadeAudio(()=>latest.current));
  const locked=useRef(false),q=rounds[state.index];
  const phrase=instructionFor(type,q),prefs=audioPreferences(settings);
  const instruction=useRef(phrase);instruction.current=phrase;
  useEffect(()=>()=>audio.dispose(),[audio]);
  useEffect(()=>{
    audio.stop();
    if(!paused&&state.phase==='playing')audio.instruction(phrase);
  },[state.index,paused,prefs.speech,prefs.effects,prefs.cheering]);
  useEffect(()=>{locked.current=state.phase!=='playing';},[state.phase,state.index]);
  useEffect(()=>{
    if(state.phase!=='reward'||paused)return;
    const timer=setTimeout(()=>dispatch({type:'advance',total:rounds.length}),3500);
    return()=>clearTimeout(timer);
  },[state.phase,state.index,paused,rounds.length]);
  useEffect(()=>{
    if(state.phase==='done'&&!paused)playCelebration(audio,type,{major:true,message:'Woohoo! You did it!'});
  },[state.phase,paused]);
  function choose(answer){
    if(locked.current||paused)return;
    audio.unlock();
    const correct=answer===q.target;
    if(correct){locked.current=true;playCelebration(audio,type,{message:PRAISE[state.index%PRAISE.length]});}
    else audio.instruction('Try again! You can do it.');
    dispatch({type:'answer',answer,target:q.target});
  }
  return {...state,q,choose,phrase,total:rounds.length,praise:PRAISE[state.index%PRAISE.length],
    progress:state.phase==='done'?rounds.length:state.index+(state.phase==='reward'?1:0),
    replay:()=>audio.instruction(instruction.current),unlock:()=>audio.unlock(),
    reward:state.phase==='reward',done:state.phase==='done',audio};
}

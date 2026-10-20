import {useEffect,useRef,useState} from 'react';
import useDragBoard from '../../letters/interactive/useDragBoard';
import {acceptQuantity,quantityDone} from '../numberData';
export default function useQuantity(s){const zone=useRef(),usedRef=useRef([]),busy=useRef(false),timer=useRef(),[used,setUsed]=useState([]),[selected,setSelected]=useState(null),[chewing,setChewing]=useState(false),[wrong,setWrong]=useState(null);useEffect(()=>()=>clearTimeout(timer.current),[]);
 function drop(id,inside=true){if(!s.canPlay()||busy.current||!inside)return;const q=s.q;if(!acceptQuantity(q,usedRef.current,id)){if(usedRef.current.includes(id))return;setWrong(id);s.wrong(q.target===0?'Zero means none. Choose the empty one.':'Try placing it in the target.');clearTimeout(timer.current);timer.current=setTimeout(()=>setWrong(null),550);return;}const next=[...usedRef.current,id];usedRef.current=next;setUsed(next);setSelected(null);setWrong(null);setChewing(true);busy.current=true;clearTimeout(timer.current);timer.current=setTimeout(()=>{setChewing(false);busy.current=false;},400);if(quantityDone(q,next))s.complete(q.target);else s.count(next.length);}
 const drag=useDragBoard({zoneRef:zone,onDrop:drop,onSelect:setSelected,disabled:!s.canPlay()});useEffect(()=>{if(s.paused){drag.clear();setSelected(null);}},[s.paused]);
 return {zone,used,selected,chewing,wrong,drag,drop,chooseTarget(){if(selected)drop(selected);else s.hint(s.type==='dino'?'Choose a fruit, then tap Dino’s mouth.':'Choose a seed, then tap the garden bed.');}};
}

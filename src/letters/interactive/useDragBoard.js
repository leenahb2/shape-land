import {useEffect,useRef,useState} from 'react';
import {pointInRect,capturePointer} from './model';
export default function useDragBoard({zoneRef,onDrop,onSelect,onGrab,disabled}){
 const active=useRef(null),frame=useRef(null),pending=useRef(null),skip=useRef(0),latest=useRef({onDrop,onSelect,onGrab,disabled});latest.current={onDrop,onSelect,onGrab,disabled};
 const [ghost,setGhost]=useState(null);
 function clear(){cancelAnimationFrame(frame.current);frame.current=null;pending.current=null;const a=active.current;active.current=null;try{if(a?.element.hasPointerCapture?.(a.pointer))a.element.releasePointerCapture(a.pointer);}catch{}active.current=null;setGhost(null);}
 useEffect(()=>{const resize=()=>{if(active.current){skip.current=Date.now()+300;clear();}};window.addEventListener('resize',resize);return()=>{window.removeEventListener('resize',resize);cancelAnimationFrame(frame.current);frame.current=null;pending.current=null;const a=active.current;active.current=null;try{if(a?.element.hasPointerCapture?.(a.pointer))a.element.releasePointerCapture(a.pointer);}catch{}};},[]);
 useEffect(()=>{if(disabled)clear();},[disabled]);
 function handlers(id){return {
  onPointerDown(e){if(latest.current.disabled||active.current||!e.isPrimary||e.button!==0)return;skip.current=0;const rect=e.currentTarget.getBoundingClientRect();active.current={id,pointer:e.pointerId,x:e.clientX,y:e.clientY,rect,element:e.currentTarget,moved:false};capturePointer(e.currentTarget,e.pointerId);},
  onPointerMove(e){const a=active.current;if(!a||a.pointer!==e.pointerId)return;const dx=e.clientX-a.x,dy=e.clientY-a.y;if(!a.moved&&Math.hypot(dx,dy)>8){a.moved=true;latest.current.onGrab?.(id);}if(!a.moved)return;e.preventDefault();const next={id,x:a.rect.left+a.rect.width/2+dx,y:a.rect.top+a.rect.height/2+dy,width:a.rect.width,height:a.rect.height};pending.current=next;if(frame.current===null)frame.current=requestAnimationFrame(()=>{frame.current=null;if(active.current&&pending.current)setGhost(pending.current);});},
  onPointerUp(e){const a=active.current;if(!a||a.pointer!==e.pointerId)return;const moved=a.moved;const inside=zoneRef.current&&pointInRect({x:e.clientX,y:e.clientY},zoneRef.current.getBoundingClientRect(),8);if(moved)skip.current=Date.now()+300;clear();if(moved)latest.current.onDrop(id,!!inside);},
  onPointerCancel(e){if(active.current?.pointer===e.pointerId){skip.current=Date.now()+300;clear();}},
  onLostPointerCapture(e){if(active.current?.pointer===e.pointerId)clear();},
  onClick(e){if(latest.current.disabled||e.detail!==0&&Date.now()<skip.current)return;latest.current.onSelect(id);},
 };}
 return {handlers,ghost,clear};
}

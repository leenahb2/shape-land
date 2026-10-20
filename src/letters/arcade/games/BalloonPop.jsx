import React,{useEffect,useRef,useState} from 'react';
import useArcade from '../useArcade';
import {ArcadeFrame} from '../Shared';
import {Cloud} from '../Characters';
import {capturePointer} from '../../interactive/model';
import {balloonLayout,balloonPosition} from '../../interactive/balloonMotion';
const colors=['#eaa4b9','#9dcbb7','#f0cb7e','#b6a0d7','#93bfdb','#efb48f'];
export default function BalloonPop(props){
 const play=useArcade('balloons',props.settings,props.paused);
 const [motionPaused,setMotionPaused]=useState(false);
 return <ArcadeFrame {...props} type="balloons" play={play}><section className="arc-balloon-sky" aria-label="Flying balloon garden">
   <div className="arc-cloud-friend"><Cloud happy={play.reward||play.done}/><span>{play.done?'You did it!':play.reward?'Pop! Hooray!':'Catch a little letter!'}</span></div>
   <div className="arc-cloud-decoration" aria-hidden="true"><Cloud/></div>
   {play.done?<div className="arc-balloon-finale"><div className="arc-rainbow-balloons" aria-hidden="true">{colors.map((color,i)=><span key={color} style={{background:color,'--i':i}}>★</span>)}</div><h2>YOU DID IT!</h2><p>Eight letters found. A sky full of possibilities!</p></div>:<FlyingBalloons key={play.index} play={play} paused={props.paused} motionPaused={motionPaused} setMotionPaused={setMotionPaused}/>}
 </section></ArcadeFrame>;
}
function FlyingBalloons({play,paused,motionPaused,setMotionPaused}){
 const area=useRef(),buttons=useRef([]),hold=useRef(null),skip=useRef(0),clock=useRef(0),latest=useRef();
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 latest.current={paused:paused||play.reward||motionPaused||reduced};
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useEffect(()=>{
  let raf,last,layout;function measure(){const rect=area.current.getBoundingClientRect();layout=balloonLayout(rect.width,rect.height,play.q.choices.length);render();}
  function render(){if(!layout)return;buttons.current.forEach((button,i)=>{if(!button)return;const point=balloonPosition(layout,i,clock.current);button.style.width=`${layout.width}px`;button.style.height=`${layout.height}px`;button.style.transform=`translate(${point.x}px,${point.y}px)`;});}
  function tick(time){if(last!==undefined&&!latest.current.paused&&hold.current===null&&!document.hidden)clock.current+=Math.min(50,time-last)/1000;last=time;render();raf=requestAnimationFrame(tick);}
  const observer=new ResizeObserver(measure);observer.observe(area.current);measure();raf=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf);observer.disconnect();};
 },[]);
 function release(e,cancel=false){if(hold.current!==e.pointerId)return;const rect=e.currentTarget.getBoundingClientRect();if(cancel||e.clientX<rect.left-20||e.clientX>rect.right+20||e.clientY<rect.top-20||e.clientY>rect.bottom+20)skip.current=Date.now()+300;hold.current=null;try{e.currentTarget.releasePointerCapture?.(e.pointerId);}catch{}}
 return <><div className="arc-flying-field" ref={area} aria-label="Moving letter balloons">{play.q.choices.map((choice,i)=>{
  const selected=play.chosen===choice;return <button key={choice} ref={node=>buttons.current[i]=node} aria-label={`Pop letter ${choice}`} disabled={play.reward} onPointerDown={e=>{if(!e.isPrimary||hold.current!==null)return;hold.current=e.pointerId;capturePointer(e.currentTarget,e.pointerId);}} onPointerUp={release} onPointerCancel={e=>release(e,true)} onLostPointerCapture={()=>hold.current=null} onClick={e=>{if(e.detail!==0&&Date.now()<skip.current)return;play.choose(choice);}} className={`arc-balloon-button ${selected?(play.reward?'arc-popped':'arc-wrong'):''}`}>
    <svg viewBox="0 0 160 210" aria-hidden="true"><g className="arc-balloon-body"><ellipse cx="80" cy="78" rx="63" ry="71" fill={colors[i]}/><path d="M42 42q4-15 20-18" stroke="#fff8" strokeWidth="9" fill="none" strokeLinecap="round"/><text x="80" y="103" textAnchor="middle">{choice}</text><path d="m80 148-10 12h20Z" fill={colors[i]}/></g><path d="M80 160q-14 13 0 24t0 24" stroke="#ad9aaf" strokeWidth="2" fill="none"/></svg>{selected&&play.reward&&<span className="arc-pop-burst">✦</span>}
  </button>;
 })}</div><div className="arc-motion-toolbar"><button className="ll-button" disabled={reduced} aria-pressed={motionPaused||reduced} onClick={()=>setMotionPaused(value=>!value)}>{reduced?'Motion off · reduced motion':motionPaused?'▶ Resume Motion':'Ⅱ Pause Motion'}</button><span>Slow, gentle flight. Hold a balloon to keep it still.</span></div></>;
}

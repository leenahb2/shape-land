import React from 'react';
import useArcade from '../useArcade';
import {ArcadeFrame} from '../Shared';
import {BabyAnimal,BABIES} from '../Characters';
export default function MysteryEggs(props){
 const play=useArcade('eggs',props.settings,props.paused);
 return <ArcadeFrame {...props} type="eggs" play={play}><section className="arc-nursery" aria-label="Mystery egg nursery">
   <div className="arc-nursery-heading"><span aria-hidden="true">✿</span> {play.done?'Your little friends are here!':`${play.progress} little friends discovered`} <span aria-hidden="true">✿</span></div>
   {play.done?<div className="arc-nursery-finale"><h2>Hello, little friends!</h2><p>You helped all six eggs hatch!</p><div className="arc-animal-parade">{Array.from({length:6},(_,i)=><div key={i} style={{'--i':i}}><BabyAnimal index={i} celebrate/><span>{BABIES[i%5]}</span></div>)}</div></div>:<>
   <div className="arc-egg-grid" style={{'--count':play.q.choices.length}}>{play.q.choices.map((choice,i)=>{
     const active=play.chosen===choice,hatched=active&&play.reward;
     return <button key={`${play.index}-${choice}`} className={`arc-egg-button arc-egg-color-${i} ${hatched?'arc-hatched':active&&play.wrong?'arc-wrong':''}`} aria-label={`Egg letter ${choice}`} disabled={play.reward} onClick={()=>play.choose(choice)}>
       {hatched&&<BabyAnimal index={play.q.animal} celebrate/>}
       <svg viewBox="0 0 160 190" aria-hidden="true"><defs><clipPath id={`egg-top-${i}`}><path d="M0 0h160v95l-17-10-17 16-18-17-20 15-18-14-20 17-18-13-16 13L0 94Z"/></clipPath><clipPath id={`egg-bottom-${i}`}><path d="m0 94 16 8 16-13 18 13 20-17 18 14 20-15 18 17 17-16 17 10v95H0Z"/></clipPath></defs>
       <g className="arc-egg-top" clipPath={`url(#egg-top-${i})`}><EggShell/><text x="80" y="107" textAnchor="middle">{choice}</text></g><g className="arc-egg-bottom" clipPath={`url(#egg-bottom-${i})`}><EggShell/><text x="80" y="107" textAnchor="middle">{choice}</text></g><path className="arc-egg-crack" d="m30 90 20 12 20-17 18 14 20-15 18 17 17-16" fill="none" stroke="#9b83b1" strokeWidth="4"/></svg>
       {hatched&&<span className="arc-hatch-label">Hello, {BABIES[play.q.animal].toLowerCase()}!</span>}
     </button>;
   })}</div><div className="arc-discovered" aria-label={`${play.progress} animals discovered`}>{Array.from({length:play.progress},(_,i)=><BabyAnimal key={i} index={i}/>)}</div></>}
 </section></ArcadeFrame>;
}
function EggShell(){return <><path d="M80 9c-25 0-60 72-60 111 0 80 120 80 120 0C140 81 105 9 80 9Z" fill="var(--egg)" stroke="#fff9e8" strokeWidth="3"/><path d="M30 126q25-19 50 0t50 0" stroke="#fff6" strokeWidth="9" fill="none"/><circle cx="53" cy="64" r="8" fill="#fff5"/><circle cx="114" cy="102" r="8" fill="#fff5"/><path d="m68 39 5 7-5 7-5-7" fill="#fff7"/></>}

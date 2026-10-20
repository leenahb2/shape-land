import React from 'react';
import useArcade from '../useArcade';
import {ArcadeFrame,LetterChoices,SkyStars} from '../Shared';
import {Rocket,Astronaut,Moon,Earth} from '../Characters';
export default function RocketMoon(props){
 const play=useArcade('rocket',props.settings,props.paused);
 return <ArcadeFrame {...props} type="rocket" play={play}><section className="arc-space-scene" aria-label={`Rocket journey: ${play.progress} of 5 stages`}>
   <SkyStars/>
   <div className="arc-earth"><Earth/><span>Earth</span></div><div className="arc-moon"><Moon/><span>The Moon</span></div>
   <div className="arc-flight-route" aria-hidden="true">{Array.from({length:5},(_,i)=><i key={i} className={i<play.progress?'arc-route-lit':''}/>)}</div>
   <div className={`arc-travelling-rocket ${play.reward?'arc-ignition':''}`} style={{'--journey':play.progress/5}}><Rocket firing={play.reward}/><span className="arc-star-trail" aria-hidden="true">✦ · ✧</span></div>
   <div className={`arc-astronaut ${play.done?'arc-landed':''}`}><Astronaut waving={play.reward||play.done}/></div>
   {play.done&&<div className="arc-lunar-party"><div className="arc-moon-flag">ABC SUPERSTAR!</div><h2>We made it to the Moon!</h2><p>Five bright steps. One amazing astronaut.</p></div>}
 </section>{!play.done&&<LetterChoices play={play}/>}</ArcadeFrame>;
}

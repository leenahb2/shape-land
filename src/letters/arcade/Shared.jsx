import GamePlayArea from '../../shared/GamePlayArea';
import AppBar from '../../shared/AppBar';
import React from 'react';
import {ARCADE_GAMES,audioPreferences} from './rounds.js';
export function ArcadeFrame({type,play,settings,home,games,restart,openSettings,children}){
 const prefs=audioPreferences(settings);
 return <div className={`arcade arc-${type} ${settings.reach?'arc-reach':''} ${play.reward?'arc-reward':''} ${play.done?'arc-done':''}`} onPointerDown={play.unlock}>
   <AppBar title={ARCADE_GAMES.find(g=>g.id===type).title} home={home} games={games} settings={()=>openSettings(()=>play.replay())}/>
   <main className="arc-main">
     <div className="arc-progress"><span>{play.done?'Adventure complete':`${type==='rocket'?'Stage':'Round'} ${play.index+1} of ${play.total}`}</span><div role="progressbar" aria-label="Arcade progress" aria-valuemin="0" aria-valuemax={play.total} aria-valuenow={play.progress}>{Array.from({length:play.total},(_,i)=><b key={i} className={i<play.progress?'arc-earned':''}>★</b>)}</div></div>
     {!play.done&&<section className="arc-instructions"><h1>{play.phrase}</h1><button className="ll-button arc-replay" disabled={!prefs.speech} onClick={play.replay}>♫ Replay Instruction</button>{!window.speechSynthesis&&<small>Voice is unavailable. Follow the written question.</small>}</section>}
     <GamePlayArea reach={settings.reach}>{children}</GamePlayArea>
     {play.done?<div className="arc-finish-actions"><button className="ll-button ll-primary" onClick={restart}>Play Again ↻</button><button className="ll-button" onClick={games}>Back to Games →</button></div>:<div className={`arc-feedback ${play.reward?'arc-positive':''}`} role="status" aria-live="polite">{play.reward?`★ ${play.praise}`:play.wrong?'Try again! Your adventure is waiting.':'No hurry, little explorer. Tap your answer.'}</div>}
   </main>
   {(play.reward||play.done)&&<Celebration type={type} major={play.done} key={`${play.index}-${play.done}`}/>}
 </div>;
}
export function Celebration({type,major}){return <div className={`arc-celebration arc-celebration-${type}`} aria-hidden="true">{Array.from({length:major?32:16},(_,i)=><i key={i} style={{'--x':`${(i*37)%100}%`,'--delay':`${i%6*.06}s`,'--spin':`${i*47}deg`,background:['#ed9fb7','#f3ce78','#9ccbb2','#b5a0d3'][i%4]}}/>)}<span className="arc-reward-star">★</span></div>}
export function LetterChoices({play}){return <div className="arc-letter-choices" style={{'--count':play.q.choices.length}}>{play.q.choices.map((choice,i)=><button key={`${play.index}-${choice}`} className={`arc-letter-button arc-color-${i} ${play.chosen===choice?(play.reward?'arc-correct':'arc-wrong'):''}`} aria-label={`Letter ${choice}`} disabled={play.reward} onClick={()=>play.choose(choice)}>{choice}</button>)}</div>}
export function SkyStars(){return <div className="arc-sky-stars" aria-hidden="true">{Array.from({length:18},(_,i)=><span key={i} style={{left:`${(i*23+7)%96}%`,top:`${(i*37+8)%85}%`,animationDelay:`${i%5*.3}s`}}>✦</span>)}</div>}

import GamePlayArea from '../../shared/GamePlayArea';
import AppBar from '../../shared/AppBar';
import React from 'react';
import {audioPreferences} from '../arcade/rounds';
import {Celebration} from '../arcade/Shared';
import './interactive.css';
export default function ActivityFrame({kind,title,session:s,settings,home,games,restart,openSettings,children,completion}){
 return <div className={`move-game move-${kind} ${settings.reach?'move-reach':''} ${s.reward?'move-reward':''}`} onPointerDown={()=>s.audio.unlock()}>
  <AppBar title={title} home={home} games={games} settings={()=>openSettings(()=>s.replay())}/>
  <main className="move-main"><div className="arc-progress"><span>{s.done?'Adventure complete':`Round ${s.index+1} of ${s.total}`}</span><div role="progressbar" aria-label="Learning progress" aria-valuemin="0" aria-valuemax={s.total} aria-valuenow={s.progress}>{Array.from({length:s.total},(_,i)=><b key={i} className={i<s.progress?'arc-earned':''}>★</b>)}</div><button className="ll-button move-replay" disabled={!audioPreferences(settings).speech} onClick={s.replay}>♫ Replay Instruction</button></div>
   {s.done?<section className="move-finale"><div className="move-final-art" aria-hidden="true">{completion?.art||'★'}</div><h1>{completion?.title||'You’re a learning superstar!'}</h1><p>{completion?.text||'Look at everything you discovered!'}</p><div className="arc-finish-actions"><button className="ll-button ll-primary" onClick={restart}>Play Again ↻</button><button className="ll-button" onClick={games}>Back to Games →</button></div></section>:<GamePlayArea reach={settings.reach}>{children}</GamePlayArea>}
   <div className="move-status" role="status" aria-live="polite">{s.message||'One little explorer. A world of discoveries.'}</div>
  </main>{(s.reward||s.done)&&<Celebration type={kind} major={s.done} key={`${s.index}-${s.done}`}/>}
 </div>;
}

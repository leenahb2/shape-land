import React from 'react';
import {ARCADE_GAMES} from './rounds';
import {Rocket,BabyAnimal} from './Characters';
import {ACTIVITY_MENU} from '../interactive/model';
import {TRACE_LETTERS} from '../interactive/strokePaths';
export default function ArcadeCards({start,disabled,settings}){return <>{[...ARCADE_GAMES,...ACTIVITY_MENU].map((game,i)=>{
 const tracing=game.id==='tracing',supported=TRACE_LETTERS.filter(l=>settings.letters.includes(l));
 return <article className={`ll-game-card ll-${game.color} arc-menu-card`} key={game.id}><small>0{i+4} · {game.tag}</small><div className={`ll-game-art arc-menu-art arc-menu-${game.id}`} aria-hidden="true">{game.id==='balloons'?<div className="arc-menu-balloons"><b>A</b><b>B</b><b>C</b></div>:game.id==='rocket'?<Rocket firing/>:game.id==='eggs'?<BabyAnimal/>:game.id==='collector'?<div className="move-menu-box"><b>T</b></div>:<div className="move-menu-trace">A</div>}</div><h2>{game.title}</h2><p>{game.description}</p>{tracing&&<div className="move-tracing-availability">{supported.length?`Ready to trace: ${supported.join(', ')}`:'Choose A, B, C, S, or T in Teacher Settings to trace.'}</div>}<button aria-label={`Play ${game.title}`} className="ll-button ll-primary" disabled={disabled||tracing&&!supported.length} onClick={()=>start(game.id)}>Play <span>→</span></button></article>;
 })}</>}

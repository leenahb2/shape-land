import ConceptsHome from '../concepts/ConceptsHome';
import {HouseArt} from '../concepts/ConceptArt';
import ColorsHome from '../colors/ColorsHome';
import NumbersHome from '../numbers/NumbersHome';
import AppBar,{Credit} from '../shared/AppBar';
import ArabicWorld from '../arabic/ArabicWorld';
import React,{useEffect,useRef,useState} from 'react';
import Splash from '../Splash';
import Shape from '../Shape';
import LetterGame,{TITLES} from '../letters/LetterGame';
import LetterSettings from '../settings/LetterSettings';
import Arcade from '../letters/arcade/Arcade';
import ArcadeCards from '../letters/arcade/ArcadeCards';
import Matching from '../letters/interactive/Matching';
import PictureSorting from '../letters/interactive/PictureSorting';
import {TRACE_LETTERS} from '../letters/interactive/strokePaths';
import {ARCADE_GAMES} from '../letters/arcade/rounds';
import {readPreferences} from '../letters/data/letters';
import {stopVoice} from '../audio';
import './platform.css';
const DESCRIPTIONS={detective:'Look closely, listen, and find the hidden letter.',pair:'Draw glowing lines between big and small letter partners.',picture:'Drag matching pictures into their letter house.'};
export default function Platform({ShapeApp}){
 const [page,setPage]=useState('splash'),[game,setGame]=useState(null),[session,setSession]=useState(0),[panel,setPanel]=useState(false),[settings,setSettings]=useState(()=>readPreferences(localStorage));
 const replay=useRef(null),heading=useRef();
 useEffect(()=>{try{localStorage.setItem('little-learners-letters',JSON.stringify(settings));}catch{}if(!settings.sound)stopVoice();},[settings]);
 useEffect(()=>{heading.current?.focus();window.scrollTo(0,0);},[page,game]);
 function navigate(next){stopVoice();setPage(next);setGame(null);setPanel(false);}
 function start(id){if(!settings.letters.length||(id==='tracing'&&!settings.letters.some(l=>TRACE_LETTERS.includes(l)))){setPanel(true);return;}stopVoice();setGame(id);setSession(x=>x+1);}
 const home=()=>navigate('hub');
 const GameComponent=game==='pair'?Matching:game==='picture'?PictureSorting:ARCADE_GAMES.some(g=>g.id===game)||['collector','tracing'].includes(game)?Arcade:LetterGame;
 if(page==='splash')return <Splash onEnter={home}/>;
 if(page==='shapes')return <ShapeApp home={home}/>;
 if(page==='arabic')return <ArabicWorld home={home}/>;
 if(page==='numbers')return <NumbersHome home={home}/>;
 if(page==='colors')return <ColorsHome home={home}/>;
 if(page==='concepts')return <ConceptsHome home={home}/>;
 return <><div className="ll-page" inert={panel?true:undefined}>{game?<GameComponent paused={panel} key={`${game}-${session}`} type={game} settings={settings} home={home} games={()=>navigate('letters')} restart={()=>start(game)} openSettings={fn=>{replay.current=fn;setPanel(true);}}/>:<>{page==='hub'?<Credit/>:<AppBar title="English Letters" home={home} settings={()=>{replay.current=null;setPanel(true);}}/>}<main className={`ll-hub ${page==='hub'?'world-directory':'section-home section-english'}`}><>{page==='hub'&&<p className="ll-development-note" lang="en" dir="ltr"><span aria-hidden="true">✨</span> Little Learners Land is growing! More fun is on the way… enjoy exploring!</p>}</><div className="ll-heading"><small>{page==='hub'?'A LITTLE WORLD OF WONDER':'THE ABC ADVENTURE CLUB'}</small><h1 tabIndex="-1" ref={heading}>{page==='hub'?<>Little discoveries.<br/><em>Big possibilities.</em></>:<>Every letter holds<br/><em>a little magic.</em></>}</h1><p>{page==='hub'?'Hello, little explorer! What shall we discover today?':'Listen, look, and learn your way. Pick an adventure!'}</p></div>{page==='hub'?<div className="ll-categories">{[{id:'shapes',title:'Shapes',text:'Find & Match',color:'rose'},{id:'letters',title:'English Letters',text:'Learn Your ABCs',color:'sage'},{id:'numbers',title:'Numbers',text:'Count & Discover',color:'butter'},{id:'colors',title:'Colors',text:'A World of Color',color:'lavender'},{id:'concepts',title:'Concept World',text:'Explore & Discover',color:'sage'},{id:'arabic',title:'الحروف العربية',text:'Arabic Letters · هيا نلعب!',color:'aqua'}].map((c,i)=><button key={c.id} className={`ll-category ll-${c.color}`} onClick={()=>navigate(c.id)}><span className="ll-card-label">0{i+1} · {'LET’S EXPLORE'}</span><CategoryArt type={c.id}/><h2>{c.title}</h2><p>{c.text}</p><span className={'ll-card-action'}>{'Explore →'}</span></button>)}</div>:<><div className="ll-selection-note"><span>{settings.letters.length} target letters · {settings.difficulty==='easy'?'Easy':'Medium'} · {settings.sound?'Sound on':'Sound off'}</span><button className="ll-link" onClick={()=>setPanel(true)}>Choose letters →</button></div><div className="ll-game-cards adventure-grid">{Object.entries(TITLES).map(([id,title],i)=><article className={`ll-game-card ll-${['rose','sage','lavender'][i]}`} key={id}><small>0{i+1} · {['LOOK & FIND','PAIR & DISCOVER','LISTEN & CONNECT'][i]}</small><div className={`ll-game-art ll-art-${id}`}>{id==='detective'?<><b>A</b><span className="ll-lens">⌕</span></>:id==='pair'?<><b>B</b><b>b</b><span>♥</span></>:<><b>S</b><svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#e8b94e" strokeWidth="6">{Array.from({length:8},(_,j)=><path key={j} d="M50 5v12" transform={`rotate(${j*45} 50 50)`}/>)}</g><circle cx="50" cy="50" r="26" fill="#f2c86a"/></svg></>}</div><h2>{title}</h2><p>{DESCRIPTIONS[id]}</p><button aria-label={`Play ${title}`} className="ll-button ll-primary" disabled={!settings.letters.length} onClick={()=>start(id)}>Play <span>→</span></button></article>)}<ArcadeCards start={start} settings={settings} disabled={!settings.letters.length}/></div>{!settings.letters.length&&<p role="alert">Choose at least one letter in Teacher Settings to play.</p>}</>}<footer className="ll-footer"><span>Little Learners Land</span><span>Little steps. Lovely discoveries.</span></footer></main></>}</div>{panel&&<LetterSettings arcade={!!game&&game!=='detective'} canRestart={game!=='tracing'||settings.letters.some(l=>TRACE_LETTERS.includes(l))} settings={settings} update={setSettings} close={()=>setPanel(false)} restart={game?()=>start(game):null} replay={game?()=>replay.current?.(settings.sound):null}/>}</>
}
function CategoryArt({type}){return <div className={`ll-category-art ll-art-${type}`} aria-hidden="true">{type==='concepts'?<HouseArt/>:type==='shapes'?<><Shape id="circle" color="#ef9cac"/><Shape id="triangle" color="#96c6ad"/><Shape id="star" color="#f0c96d"/></>:['letters','arabic'].includes(type)?<><b>{type==='arabic'?'أ':'A'}</b><b>{type==='arabic'?'ب':'B'}</b><b>{type==='arabic'?'ت':'C'}</b></>:type==='numbers'?<><b>1</b><b>2</b><b>3</b></>:<svg viewBox="0 0 200 125"><path d="M25 110a75 75 0 0 1 150 0" fill="none" stroke="#eaa2ae" strokeWidth="20"/><path d="M45 110a55 55 0 0 1 110 0" fill="none" stroke="#f2d184" strokeWidth="20"/><path d="M65 110a35 35 0 0 1 70 0" fill="none" stroke="#a0c8b6" strokeWidth="20"/><path d="M85 110a15 15 0 0 1 30 0" fill="none" stroke="#b5a5d3" strokeWidth="20"/></svg>}</div>}

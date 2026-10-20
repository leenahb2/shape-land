import {mixPartners} from '../../shared/mixPartners.js';
import {ALPHABET,shuffle} from '../data/letters.js';
export const ACTIVITY_MENU=[
 {id:'collector',title:'Letter Collector',tag:'DRAG & COLLECT',description:'Gather every matching letter in a magical treasure box.',color:'sage'},
 {id:'tracing',title:'Magic Letter Tracing',tag:'FOLLOW & DRAW',description:'Draw real letter strokes with your finger. A, B, C, S, T.',color:'lavender'},
];
export function targets(selected,count=5){
 const valid=ALPHABET.filter(l=>selected.includes(l));if(!valid.length)throw new Error('Choose at least one letter.');
 let pool=[],last;return Array.from({length:count},()=>{if(!pool.length){pool=shuffle(valid);if(pool.length>1&&pool[0]===last)[pool[0],pool[1]]=[pool[1],pool[0]];}last=pool.shift();return last;});
}
export function makeCollectorRounds(settings){
 const medium=settings.difficulty==='medium',mode=settings.collectorCase||'uppercase';
 return targets(settings.letters).map((letter,round)=>{
  const distractors=shuffle(ALPHABET.filter(l=>l!==letter)),similar={B:'PRD',D:'OBP',P:'RBD',M:'NW',N:'MH',O:'CQD',C:'GO',I:'JLT',T:'IF',S:'Z',U:'VY'};
  const others=[...new Set([...(medium?similar[letter]||'':''),...distractors])].filter(l=>l!==letter);
  const matches=medium?4:3,total=medium?12:8;
  const ids=shuffle([...Array(matches).fill(letter),...others.slice(0,total-matches)]);
  let correctIndex=0;return {letter,caseMode:mode,matches,tokens:ids.map((id,i)=>({id:`${round}-${i}`,letter:mode==='lowercase'||mode==='mixed'&&(id===letter?correctIndex++%2:i%2)?id.toLowerCase():id,correct:id===letter}))};
 });
}
export function makeMatchingRounds(settings){
 const letters=ALPHABET.filter(l=>settings.letters.includes(l));if(!letters.length)throw new Error('Choose a letter.');
 let queue=[];
 return Array.from({length:4},()=>{
  if(queue.length<Math.min(letters.length,settings.difficulty==='easy'?3:4))queue=[...queue,...shuffle(letters.filter(l=>!queue.includes(l)))];
  const left=queue.splice(0,Math.min(letters.length,settings.difficulty==='easy'?3:4));
  const right=mixPartners(left);
  return {left,right};
 });
}
export function pointInRect(point,rect,padding=0){return point.x>=rect.left-padding&&point.x<=rect.right+padding&&point.y>=rect.top-padding&&point.y<=rect.bottom+padding;}
export function relativePoint(point,rect,width,height){return {x:(point.x-rect.left)*width/rect.width,y:(point.y-rect.top)*height/rect.height};}
export function acceptUnique(collected,id,valid){return valid&&!collected.includes(id)?[...collected,id]:collected;}

export function capturePointer(element,id){try{element.setPointerCapture?.(id);}catch{/* Capture is unavailable for cancelled or synthetic pointers. */}}

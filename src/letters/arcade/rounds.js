import {ALPHABET,shuffle} from '../data/letters.js';

export const ARCADE_GAMES = [
  {id:'balloons',title:'Flying Alphabet Balloons',tag:'POP & DISCOVER',description:'A little pop. A big discovery! Catch slowly moving letters in a dreamy sky.',color:'rose',rounds:8},
  {id:'rocket',title:'Rocket to the Moon',tag:'FIND & FLY',description:'Power your rocket with letters. The Moon is waiting!',color:'lavender',rounds:5},
  {id:'eggs',title:'Mystery Letter Eggs',tag:'TAP & HATCH',description:'Find a letter and meet the baby animal hiding inside.',color:'butter',rounds:6},
];

export function makeArcadeRounds(selected,type,difficulty='easy') {
  const letters=ALPHABET.filter(letter=>selected.includes(letter));
  if(!letters.length) throw new Error('Choose at least one letter.');
  const game=ARCADE_GAMES.find(g=>g.id===type);
  if(!game) throw new Error('Unknown arcade game.');
  let pool=[],previous;
  return Array.from({length:game.rounds},(_,round)=>{
    if(!pool.length){
      pool=shuffle(letters);
      if(pool.length>1&&pool[0]===previous) [pool[0],pool[1]]=[pool[1],pool[0]];
    }
    const letter=pool.shift(); previous=letter;
    const lowercase=type==='eggs'&&difficulty==='medium'&&Math.random()<.5;
    const target=lowercase?letter.toLowerCase():letter;
    const count=type==='balloons'?(difficulty==='easy'?4:6):difficulty==='easy'?3:4;
    const choices=shuffle([letter,...shuffle(ALPHABET.filter(l=>l!==letter)).slice(0,count-1)]).map(l=>lowercase?l.toLowerCase():l);
    return {letter,target,choices,animal:round%5};
  });
}

export function instructionFor(type,q){
  if(type==='balloons') return `Pop the letter ${q.letter}!`;
  if(type==='rocket') return `Find the letter ${q.letter} to fly!`;
  if(type==='eggs') return q.target===q.target.toLowerCase()?`Find the lowercase ${q.target}!`:`Touch the letter ${q.letter}!`;
  return `Find the letter ${q.letter}!`;
}
export const INITIAL_ROUND={index:0,phase:'playing',chosen:null,wrong:false};
export function arcadeReducer(state,action){
  if(action.type==='answer'&&state.phase==='playing'){
    return action.answer===action.target?{...state,phase:'reward',chosen:action.answer,wrong:false}:{...state,chosen:action.answer,wrong:true};
  }
  if(action.type==='advance'&&state.phase==='reward'){
    return state.index+1>=action.total?{...state,phase:'done'}:{...INITIAL_ROUND,index:state.index+1};
  }
  return state;
}
export function audioPreferences(settings){
  return Object.fromEntries(['speech','effects','cheering'].map(key=>[key,settings.arcadeAudio?.[key]??settings.sound]));
}

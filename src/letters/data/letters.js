export const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
// Familiar initial sounds; X is explicitly taught at the END of fox.
export const PICTURES = [
 ['A','Apple','apple'],['B','Ball','ball'],['C','Cat','cat'],['D','Dog','dog'],
 ['E','Egg','egg'],['F','Fish','fish'],['G','Goat','goat'],['H','Hat','hat'],
 ['I','Insect','insect'],['J','Jam','jam'],['K','Kite','kite'],['L','Leaf','leaf'],
 ['M','Moon','moon'],['N','Nest','nest'],['O','Octopus','octopus'],['P','Pig','pig'],
 ['Q','Queen','queen'],['R','Rabbit','rabbit'],['S','Sun','sun'],['T','Tree','tree'],
 ['U','Umbrella','umbrella'],['V','Van','van'],['W','Watch','watch'],
 ['X','Fox','fox'],['Y','Yo-yo','yoyo'],['Z','Zebra','zebra']
].map(([letter,word,art])=>({letter,word,art}));
export function shuffle(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function makeRounds(selected,type,difficulty){
 if(!selected.length)throw new Error('Choose at least one target letter.');
 let pool=[],last;return Array.from({length:10},()=>{
  if(!pool.length){pool=shuffle(selected);if(pool.length>1&&pool[0]===last)[pool[0],pool[1]]=[pool[1],pool[0]];}
  const letter=pool.shift();last=letter;
  const target=letter;
  const count=type==='pair'?(difficulty==='easy'?3:5):type==='picture'?(difficulty==='easy'?3:4):(difficulty==='easy'?4:6);
  let distractors=shuffle(ALPHABET.filter(l=>l!==letter));
  if(type==='pair'&&difficulty==='medium'){
   const similar={B:'DPQR',D:'BPQ',P:'BQDR',I:'JLT',M:'NW',N:'MH',U:'VY',V:'UW',C:'GO',O:'CGQ',S:'Z',E:'F'};
   distractors=[...new Set([...(similar[letter]||''),...distractors])].filter(l=>l!==letter);
  }
  const ids=shuffle([letter,...distractors.slice(0,count-1)]);
  const options=ids.map(l=>type==='picture'?PICTURES.find(p=>p.letter===l):type==='pair'?l.toLowerCase():l);
  return {letter,target,options};
 });
}
export const DEFAULTS={letters:ALPHABET,difficulty:'easy',sound:true,reach:false};
export function readPreferences(storage){try{const raw=JSON.parse(storage.getItem('little-learners-letters')||'{}');return {...(['uppercase','lowercase','mixed'].includes(raw.collectorCase)?{collectorCase:raw.collectorCase}:{}),...(raw.arcadeAudio&&typeof raw.arcadeAudio==='object'?{arcadeAudio:Object.fromEntries(['speech','effects','cheering'].map(key=>[key,typeof raw.arcadeAudio[key]==='boolean'?raw.arcadeAudio[key]:raw.sound!==false]))}:{}),letters:Array.isArray(raw.letters)?ALPHABET.filter(l=>raw.letters.includes(l)):ALPHABET,difficulty:raw.difficulty==='medium'?'medium':'easy',sound:raw.sound!==false,reach:raw.reach===true};}catch{return {...DEFAULTS};}}

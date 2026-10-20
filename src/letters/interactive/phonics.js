import {ALPHABET,PICTURES,shuffle} from '../data/letters.js';
import {targets} from './model.js';
// Clear initial sounds: hard C/G and short A/E/I/O. X is explicitly a final /ks/ sound.
const EXTRA={A:['Ant','Alligator'],B:['Bear','Banana'],C:['Car','Cake'],D:['Duck','Drum'],E:['Elephant','Elbow'],F:['Frog','Fan'],G:['Grapes','Gift'],H:['Hen','House'],I:['Igloo','Ink'],J:['Jet','Jug'],K:['Key','Kangaroo'],L:['Lion','Lemon'],M:['Mouse','Monkey'],N:['Net','Nose'],O:['Otter','Ox'],P:['Pear','Pen'],Q:['Quilt'],R:['Rainbow','Robot'],S:['Snake','Star'],T:['Tiger','Turtle'],U:[],V:['Vase','Violin'],W:['Whale','Wheel'],X:['Box','Ox'],Y:['Yarn','Yak'],Z:['Zip','Zoo']};
export const PHONICS=Object.fromEntries(ALPHABET.map(letter=>[letter,[PICTURES.find(p=>p.letter===letter),...EXTRA[letter].map(word=>({letter,word,art:word.toLowerCase()}))].map(p=>({...p,soundPosition:letter==='X'?'end':'start'}))]));
// Ox is used as O initial /o/ and X final /ks/; filter by actual word/sound to avoid ambiguous distractors.
export function makeSortingRounds(settings){return targets(settings.letters).map((letter,round)=>{
 const words=shuffle(PHONICS[letter]);const correct=words.length>=3?words.slice(0,3):words.length===2?words:[words[0],{...words[0]}];
 const pool=Object.values(PHONICS).flat().filter(p=>letter==='X'?!p.word.toLowerCase().endsWith('x'):p.word[0].toUpperCase()!==letter);
 const distractors=shuffle([...new Map(pool.map(p=>[p.word,p])).values()]).slice(0,6-correct.length);
 return {letter,required:correct.length,items:shuffle([...correct.map(p=>({...p,correct:true})),...distractors.map(p=>({...p,correct:false}))]).map((p,i)=>({...p,id:`${round}-${i}`}))};
});}

// Teacher choices define targets. The full catalogue supplies distinct distractors.
export function shuffleRecognition(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function recognitionRounds({targets,pool,choices=4,rounds=10,rng=Math.random,distractorOrder}){
 const all=[...new Set(pool)],selected=[...new Set(targets)].filter(id=>all.includes(id));
 if(!selected.length||all.length<2)return [];
 const count=Math.max(2,Math.min(Math.floor(choices)||4,all.length)),deck=[];let previous,positions=[];
 while(deck.length<Math.max(0,Math.floor(rounds))){
  const cycle=shuffleRecognition(selected,rng);
  if(cycle.length>1&&cycle[0]===previous){const swap=1+Math.floor(rng()*(cycle.length-1));[cycle[0],cycle[swap]]=[cycle[swap],cycle[0]];}
  for(const target of cycle){
   if(deck.length>=Math.max(0,Math.floor(rounds)))break;
   const candidates=distractorOrder?distractorOrder(target,rng):shuffleRecognition(all,rng);
   const distractors=[...new Set([...candidates,...all])].filter(id=>id!==target&&all.includes(id)).slice(0,count-1);
   if(!positions.length){positions=shuffleRecognition(Array.from({length:count},(_,i)=>i),rng);if(deck.length&&positions[0]===deck.at(-1).options.indexOf(previous)){[positions[0],positions[1]]=[positions[1],positions[0]];}}
   const options=shuffleRecognition(distractors,rng);options.splice(positions.shift(),0,target);
   deck.push({target,options});previous=target;
  }
 }
 return deck;
}
export function recognitionAnswer(question,id){return !!question&&question.options.includes(id)&&id===question.target;}

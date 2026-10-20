// Keep every partner away from its source row. A single pair remains playable.
export function mixPartners(items,random=Math.random){
 if(items.length<2)return [...items];
 for(let attempt=0;attempt<16;attempt++){
  const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  if(result.every((value,i)=>value!==items[i]))return result;
 }
 const offset=1+Math.floor(random()*(items.length-1));return [...items.slice(offset),...items.slice(0,offset)];
}

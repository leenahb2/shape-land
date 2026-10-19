export function shuffle(list) {
 const result=[...list];
 for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
 return result;
}
export function makeDeck(ids, count=10) {
 const deck=[];
 while(deck.length<count) deck.push(...shuffle(ids));
 return deck.slice(0,count);
}
export function makeBoards(ids, size=5) {
 const ordered=shuffle(ids), boards=[];
 for(let i=0;i<ordered.length;i+=size){
  const group=ordered.slice(i,i+size);
  const extras=shuffle(ids.filter(id=>!group.includes(id)));
  boards.push([...group,...extras.slice(0,Math.min(size,ids.length)-group.length)]);
 }
 return boards;
}

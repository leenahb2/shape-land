import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeDeck,makeBoards} from './rounds.js';
for(let n=1;n<=10;n++){
 const ids=Array.from({length:n},(_,i)=>`shape-${i}`);
 test(`all ${n} selected shapes appear in detective and matching games`,()=>{
  const deck=makeDeck(ids);assert.equal(deck.length,10);assert.equal(new Set(deck).size,n);
  for(const size of [4,5]){const boards=makeBoards(ids,size);assert.equal(new Set(boards.flat()).size,n);for(const board of boards){assert.equal(board.length,Math.min(n,size));assert.equal(new Set(board).size,board.length);assert.ok(board.every(id=>ids.includes(id)));}}
 });
}

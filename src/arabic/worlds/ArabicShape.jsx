import React from 'react';
import Shape from '../../Shape';
export default function ArabicShape({id,color,monster=false,expression=''}){
 if(!['hexagon','crescent'].includes(id))return <Shape id={id} color={color} monster={monster} expression={expression}/>;
 return <svg viewBox="0 0 120 120" aria-hidden="true"><path d={id==='hexagon'?'M32 12H88L116 60 88 108H32L4 60Z':'M82 8A52 52 0 1 0 82 112A45 45 0 0 1 82 8Z'} fill={color} stroke="#594d64" strokeWidth="3.5" strokeLinejoin="round"/>{monster&&<g><circle cx="39" cy="51" r="11" fill="white"/><circle cx="65" cy="51" r="11" fill="white"/><circle cx="41" cy="53" r="4" fill="#393147"/><circle cx="63" cy="53" r="4" fill="#393147"/><ellipse cx="52" cy="79" rx="17" ry={expression==='happy'?16:10} fill="#44334d"/><path d="m44 70 4 9 4-9m4 0 4 9 4-9" fill="white"/></g>}</svg>;
}

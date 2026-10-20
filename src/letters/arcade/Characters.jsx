import React from 'react';
const eyes=<><circle cx="43" cy="48" r="3" fill="#55465f"/><circle cx="65" cy="48" r="3" fill="#55465f"/><path d="M47 59q7 7 14 0" fill="none" stroke="#55465f" strokeWidth="3" strokeLinecap="round"/><ellipse cx="34" cy="56" rx="6" ry="3" fill="#edb2b5"/><ellipse cx="74" cy="56" rx="6" ry="3" fill="#edb2b5"/></>;
export function Cloud({happy=false}){return <svg viewBox="0 0 180 110" aria-hidden="true"><path d="M28 89C-2 89 0 49 27 46 22 8 70 0 87 31 116 0 154 24 148 49 185 44 185 91 154 91Z" fill="#fffdf5" stroke="#e4d8e9" strokeWidth="2"/><g transform="translate(36 19)">{eyes}{happy&&<path d="M44 61q10 22 23 0" fill="#ed9aaa"/>}</g></svg>}
export function Rocket({firing=false}){return <svg viewBox="0 0 140 180" aria-hidden="true"><defs><linearGradient id="arc-rocket-body" x2="1" y2="1"><stop stopColor="#fffdf8"/><stop offset="1" stopColor="#ded4ee"/></linearGradient></defs>{firing&&<g className="arc-flame"><path d="M47 130Q38 167 70 180q35-33 23-50" fill="#f4bb69"/><path d="M58 130q-3 27 12 36 17-19 12-36" fill="#fff0a9"/></g>}<path d="M40 87Q9 98 18 137l32-15m50-35q30 14 23 50l-32-15" fill="#df9eb9"/><path d="M70 6Q20 53 43 132h54Q122 51 70 6" fill="url(#arc-rocket-body)" stroke="#b5a2d0" strokeWidth="3"/><path d="M70 6Q49 26 43 45h54Q89 24 70 6" fill="#b5a2d0"/><circle cx="70" cy="75" r="21" fill="#b3d8e6" stroke="#a18bbf" strokeWidth="5"/><path d="M58 73q12-19 25-8" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round"/><path d="M45 120h50v13H45" fill="#a18bbf"/></svg>}
export function Astronaut({waving=false}){return <svg viewBox="0 0 120 145" aria-hidden="true"><g className={waving?'arc-wave':''}><path d="m85 78 22-27" stroke="#fffaf0" strokeWidth="17" strokeLinecap="round"/><circle cx="108" cy="50" r="9" fill="#b8c5e2"/></g><path d="M32 80 14 98m29 14-8 24m40-24 9 24" stroke="#fffaf0" strokeWidth="17" strokeLinecap="round"/><rect x="30" y="65" width="59" height="57" rx="20" fill="#fffaf0"/><rect x="42" y="86" width="35" height="23" rx="7" fill="#ac9ed1"/><circle cx="59" cy="40" r="36" fill="#fffaf0"/><rect x="32" y="17" width="54" height="46" rx="22" fill="#9fb8ce"/><g transform="translate(5 -9)">{eyes}</g><circle cx="52" cy="96" r="4" fill="#f4d680"/></svg>}
export function Moon(){return <svg viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="61" fill="#f4e4ba"/><circle cx="44" cy="41" r="13" fill="#e0cf9f"/><circle cx="96" cy="85" r="18" fill="#e6d5aa"/><circle cx="41" cy="92" r="8" fill="#e6d5aa"/><path d="M65 70q8 8 16 0" fill="none" stroke="#b6a070" strokeWidth="3"/></svg>}
export function Earth(){return <svg viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="65" fill="#95bfd5"/><path d="M23 43 54 17l21 10-9 27 23 14-7 29-23-9-10-20-25-4m74-37 25 17-8 25-16 10-9-14m-3 31 38 8-18 23-6 27-22-12-4-25" fill="#9ac4a5"/></svg>}
export const BABIES=['Chick','Bunny','Baby dinosaur','Penguin','Duckling'];
export function BabyAnimal({index=0,celebrate=false}){
 const kind=index%5;
 return <svg className={`arc-baby arc-baby-${kind} ${celebrate?'arc-baby-dance':''}`} viewBox="0 0 120 130" role="img" aria-label={BABIES[kind]}>
 {kind===1&&<><ellipse cx="42" cy="30" rx="13" ry="29" fill="#d1b9e0" transform="rotate(-12 42 30)"/><ellipse cx="75" cy="30" rx="13" ry="29" fill="#d1b9e0" transform="rotate(12 75 30)"/><ellipse cx="42" cy="27" rx="6" ry="19" fill="#ecc3ce"/><ellipse cx="75" cy="27" rx="6" ry="19" fill="#ecc3ce"/></>}
 {kind===2&&<path d="m72 42 9-20 12 19 12-8 2 22-17 5m-4 37q28 20 31-12-12 12-22-8" fill="#84b99a"/>}
 <ellipse cx="60" cy="94" rx="33" ry="30" fill={['#f5d47f','#d1b9e0','#95c4a2','#65778e','#f4d486'][kind]}/>
 <ellipse cx="60" cy="65" rx="35" ry="32" fill={['#f5d47f','#d1b9e0','#95c4a2','#65778e','#f4d486'][kind]}/>
 {kind===3&&<><ellipse cx="60" cy="98" rx="21" ry="24" fill="#fff8e8"/><path d="M32 65q0-33 28-17 28-16 28 17v11H32" fill="#fff8e8"/></>}
 <ellipse cx="42" cy="120" rx="14" ry="6" fill={kind===1?'#b69bcc':'#e8ae68'}/><ellipse cx="77" cy="120" rx="14" ry="6" fill={kind===1?'#b69bcc':'#e8ae68'}/>
 <circle cx="47" cy="61" r="3.5" fill="#4e435d"/><circle cx="73" cy="61" r="3.5" fill="#4e435d"/>
 {[0,3,4].includes(kind)?<path d={kind===4?'M47 72q13-10 28 0-10 14-28 0':'m53 70 7 9 8-9Z'} fill="#e9a464"/>:<path d="M51 76q10 9 18-1" fill="none" stroke="#4e435d" strokeWidth="3" strokeLinecap="round"/>}
 <ellipse cx="35" cy="73" rx="7" ry="4" fill="#eeb5b4"/><ellipse cx="83" cy="73" rx="7" ry="4" fill="#eeb5b4"/>
 {kind===0&&<path d="m51 35 1-14 10 12 8-14 1 18" fill="#f1c466"/>}
 <path className="arc-baby-wing" d="m30 91-14-9m75 9 14-9" stroke={['#e9c064','#b69bcc','#79ae8d','#65778e','#e9c064'][kind]} strokeWidth="11" strokeLinecap="round"/>
 </svg>;
}

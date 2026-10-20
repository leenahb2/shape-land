import React from 'react';
// Local vector art gives every device the same pictures, without emoji or downloads.
export default function Illustration({kind}){
 const face=<><circle cx="43" cy="53" r="2.5" fill="#51465d"/><circle cx="62" cy="53" r="2.5" fill="#51465d"/><path d="M47 63q6 6 12 0" fill="none" stroke="#51465d" strokeWidth="2.5"/></>;
 const animal=(ears,fill)=><><path d={ears} fill={fill}/><ellipse cx="52" cy="58" rx="30" ry="28" fill={fill}/>{face}</>;
 const art={
 apple:<><path d="M53 29q-25-17-32 12c-9 36 18 54 31 43 17 12 41-11 30-40-5-18-18-20-29-15" fill="#ed7d88"/><path d="M52 29V17m1 5q18-17 24-4-9 13-24 4" stroke="#6ba77e" strokeWidth="5" fill="#92bf89"/>{face}</>,
 ball:<><circle cx="52" cy="54" r="34" fill="#efae64"/><path d="M22 40q30 20 59-5M25 77q25-28 54 0M52 20q-18 35 0 68" fill="none" stroke="#fff1d5" strokeWidth="6"/></>,
 cat:animal('M24 44 20 16 46 33 61 33 83 16 80 47','#edb46f'),
 dog:animal('M28 35Q5 19 13 65L31 58M73 35Q99 20 91 66L75 57','#bd9274'),
 rabbit:animal('M32 43Q15-5 36 8L47 35M56 35Q64-6 77 10L73 45','#c5b2d9'),
 goat:<>{animal('M28 39 21 16 42 32M65 32 83 16 77 41','#ddd2b9')}<path d="m44 81 9 12 9-12" fill="#ddd2b9"/></>,
 pig:<>{animal('M25 40 24 18 46 34M63 34 80 18 79 44','#efa7b8')}<ellipse cx="53" cy="66" rx="14" ry="9" fill="#dc859e"/><circle cx="48" cy="66" r="2"/><circle cx="58" cy="66" r="2"/></>,
 fox:<>{animal('M22 46 19 12 46 32M61 32 87 12 81 49','#eaa16a')}<path d="m27 65 26 22 26-22-26 9" fill="#fff5de"/></>,
 zebra:<>{animal('M25 39 25 15 43 33M64 33 82 15 79 42','#eae4da')}<path d="m35 34 7 12m15-15-2 14m17-7-7 11M25 58l11 3m44-3-10 4" stroke="#666078" strokeWidth="5"/></>,
 egg:<><path d="M52 16C30 16 10 81 40 88c48 15 55-29 27-64-5-6-10-8-15-8" fill="#f6e6b8"/>{face}</>,
 fish:<><path d="m74 51 22-22v48L74 62" fill="#efb571"/><ellipse cx="46" cy="54" rx="33" ry="24" fill="#83bac5"/><circle cx="29" cy="49" r="4" fill="#51465d"/><path d="m48 39 9 16-10 12" fill="#b1d9db"/></>,
 hat:<><path d="M28 66 35 23h35l9 43" fill="#b3a0d6"/><path d="M30 53h47v13H30" fill="#f2c76d"/><ellipse cx="53" cy="70" rx="45" ry="10" fill="#9d88c5"/></>,
 insect:<><ellipse cx="52" cy="59" rx="26" ry="31" fill="#ed9298"/><path d="M52 32v56M27 48 12 39m15 24-16 7m66-22 16-9m-16 24 16 7" stroke="#675c72" strokeWidth="4"/><circle cx="52" cy="29" r="13" fill="#675c72"/><circle cx="40" cy="54" r="5" fill="#675c72"/><circle cx="65" cy="69" r="5" fill="#675c72"/></>,
 jam:<><rect x="23" y="28" width="59" height="61" rx="13" fill="#db839c"/><rect x="21" y="19" width="63" height="16" rx="5" fill="#ae9ccc"/><rect x="31" y="46" width="43" height="28" rx="7" fill="#fff3dd"/><path d="m52 51 12 9-12 10-12-10" fill="#e396a5"/></>,
 kite:<><path d="m52 10 32 33-32 33-30-33Z" fill="#8dc5c2"/><path d="m52 10 0 66M22 43h62" stroke="#fff7df" strokeWidth="3"/><path d="M52 76q-18 12 3 20" fill="none" stroke="#a792ca" strokeWidth="3"/></>,
 leaf:<><path d="M20 81Q6 14 87 14 91 82 20 81" fill="#8fbc88"/><path d="m16 91 57-57M32 72l-4-28m19 12 23 4" fill="none" stroke="#568965" strokeWidth="4"/></>,
 moon:<><path d="M72 12A39 39 0 1 0 89 75Q35 84 72 12" fill="#f2cf73"/><circle cx="36" cy="55" r="4" fill="#dfba61"/></>,
 nest:<><path d="M13 58h82q-7 38-43 32Q20 91 13 58" fill="#be9672"/><ellipse cx="52" cy="59" rx="39" ry="12" fill="#987856"/><ellipse cx="42" cy="47" rx="12" ry="18" fill="#b2d7db"/><ellipse cx="65" cy="48" rx="12" ry="18" fill="#d2c3e6"/></>,
 octopus:<><path d="M25 57q-25 46 0 24l10-14q-9 39 9 14l8-12q5 39 13 10l4-12q35 38 12-11" fill="none" stroke="#b49bd5" strokeWidth="12" strokeLinecap="round"/><ellipse cx="53" cy="45" rx="30" ry="29" fill="#b49bd5"/>{face}</>,
 queen:<><path d="m25 34-8-24 25 14 12-19 12 19 24-14-9 24" fill="#f1c762"/><circle cx="53" cy="52" r="25" fill="#f3c7a5"/>{face}<path d="m32 74-12 23h66L74 74" fill="#b29bd1"/></>,
 sun:<><g stroke="#edbe58" strokeWidth="6" strokeLinecap="round">{Array.from({length:8},(_,i)=><path key={i} d="M53 8v9" transform={`rotate(${i*45} 53 53)`}/>)}</g><circle cx="53" cy="53" r="28" fill="#f5ce70"/>{face}</>,
 tree:<><path d="M45 47h16v47H45" fill="#bd9471"/><path d="m53 8 33 42H72l23 26H12l23-26H21Z" fill="#91bd98"/></>,
 umbrella:<><path d="M12 50a41 38 0 0 1 82 0q-14-10-27 0-14-10-27 0-14-10-28 0" fill="#97bcd9"/><path d="M53 50v35q0 16-14 8" fill="none" stroke="#b095c8" strokeWidth="6"/></>,
 van:<><rect x="10" y="30" width="84" height="46" rx="12" fill="#97bda4"/><path d="M20 39h25v20H20m34-20h23l9 20H54" fill="#e7f0e4"/><circle cx="30" cy="78" r="11" fill="#665c75"/><circle cx="78" cy="78" r="11" fill="#665c75"/></>,
 watch:<><path d="M39 6h28v94H39" fill="#ad9bcf"/><circle cx="53" cy="53" r="29" fill="#f1cf7c"/><circle cx="53" cy="53" r="23" fill="#fff9eb"/><path d="M53 34v20l12 8" fill="none" stroke="#756686" strokeWidth="4"/></>,
 yoyo:<><path d="M52 12q-25 29 0 39" fill="none" stroke="#a99bc3" strokeWidth="3"/><circle cx="52" cy="68" r="28" fill="#ed9cae"/><circle cx="52" cy="68" r="15" fill="#f8d3b6"/><circle cx="52" cy="68" r="5" fill="#c78399"/></>
 };
 return <svg viewBox="0 0 106 106" role="img" aria-label={kind}><g strokeLinejoin="round">{art[kind]}</g></svg>;
}

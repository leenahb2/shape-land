import React,{useLayoutEffect,useRef} from 'react';
import './appbar.css';
// Reserve the existing header rhythm; the single visible credit lives in the app shell.
export function Credit(){return <div className="site-credit-space" aria-hidden="true"/>}
export default function AppBar({title='Little Learners Land',home,games,settings,arabic=false,children}){
 const words=title.split(' '),accent=words.pop();
 const ref=useRef();useLayoutEffect(()=>{const node=ref.current;const measure=()=>node.closest('.app')?.style.setProperty('--header-height',`${node.getBoundingClientRect().height}px`);const observer=new ResizeObserver(measure);observer.observe(node);measure();return()=>observer.disconnect();},[]);
 return <nav ref={ref} className="site-bar" aria-label={arabic?'التنقل الرئيسي':'Main navigation'}><Credit arabic={arabic}/><div className="site-bar-row"><div className="site-bar-left">{home&&<button onClick={home}>{arabic?'⌂ الرئيسية':'⌂ Home'}</button>}{games&&<button onClick={games}>{arabic?'الألعاب ←':'← Games'}</button>}</div><span className="site-bar-title"><span aria-hidden="true" className="site-world-mark">✦</span> {words.join(' ')} <em>{accent}</em></span><div className="site-bar-right">{children}{settings&&<button onClick={settings} aria-label={arabic?'إعدادات المعلّمة':'Teacher Settings'}>{arabic?'⚙ إعدادات المعلّمة':'⚙ Teacher Settings'}</button>}</div></div></nav>
}

export const KEY='little-learners-concepts';
export const GAMES=[
 {id:'bears',title:"The Three Bears’ House",tag:'COMPARE • GIVE • GROW',text:'Help two bear friends find belongings that fit.',theme:'rose'},
 {id:'garden',title:'Grow the Magic Garden',tag:'WATER • GROW • COMPARE',text:'A little water makes a wonderful difference.',theme:'sage'},
 {id:'sorting',title:'Super Sorting Factory',tag:'SORT • BUILD • SURPRISE',text:'Find the rule and create a lovely little toy.',theme:'lavender'},
 {id:'family',title:'My Family House',tag:'OPEN • MEET • CONNECT',text:'Meet one storybook family and fill their home.',theme:'rose'},
 {id:'same',title:'Same or Different?',tag:'NOTICE • MATCH • DISCOVER',text:'Spot a surprise, then draw beautiful matching lines.',theme:'sage'}
];
export const ROLES=['Mom','Dad','Brother','Sister','Grandpa','Grandma'];
export const MODES=['colors','shapes','sizes','categories'];
export const HUES={red:'#df606b',blue:'#649aca',yellow:'#e9c766',green:'#8bb99e',purple:'#b29ac8'};
export function preferences(storage){let s={};try{s=JSON.parse(storage?.getItem(KEY)||'{}')||{};}catch{}const select=(value,all)=>Array.isArray(value)?[...new Set(value.filter(v=>all.includes(v)))]:[...all];return {enabled:select(s.enabled,GAMES.map(g=>g.id)),sorting:select(s.sorting,MODES),family:select(s.family,ROLES),difficulty:s.difficulty==='medium'?'medium':'easy',voice:s.voice!==false,effects:s.effects!==false,cheering:s.cheering!==false,reach:s.reach!==false,motion:s.motion===true};}
export function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function partners(items,rng=Math.random){if(items.length<2)return [...items];for(let i=0;i<8;i++){const a=shuffle(items,rng);if(a.every((v,j)=>v!==items[j]))return a;}return [...items.slice(1),items[0]];}
export function rounds(type,s){const medium=s.difficulty==='medium';if(!s.enabled.includes(type))return [];
 if(type==='bears')return [...(medium?['bed','chair','bowl','shoes','toy','bag']:['bed','chair','bowl']).map(item=>({item,mode:'match',tokens:shuffle(['big','small'])})),{mode:'resize',item:'toy',target:medium?75:25}];
 if(type==='garden')return ['flower','tree','tower'].map((kind,i)=>({kind,first:i%2?1:0,tall:80,short:30}));
 if(type==='sorting')return s.sorting.filter(m=>MODES.includes(m)).map((mode,r)=>{const groups=(mode==='colors'?['red','blue','yellow','green']:mode==='shapes'?['circle','triangle','square','star']:mode==='sizes'?['big','small']:['fruits','animals','toys','vehicles']).slice(0,medium?4:2);return {mode,groups,tokens:shuffle(groups.flatMap((group,i)=>[0,1].map(j=>({id:`${r}-${i}-${j}`,group,kind:mode==='categories'?{fruits:['apple','pear'],animals:['bear','cat'],toys:['ball','toy'],vehicles:['car','bus']}[group][j]:mode==='shapes'?group:'ball',hue:mode==='colors'?group:['red','blue','green','yellow'][(i+j)%4],size:mode==='sizes'?group:'big'}))))};});
 if(type==='family'){const roles=s.family.filter(r=>ROLES.includes(r));if(!roles.length)return [];return [...shuffle(roles).map(target=>({mode:'windows',target,roles:shuffle(roles)})),{mode:'portraits',roles:shuffle(roles),cards:partners(roles)}];}
 if(type==='same'){const count=medium?6:4;return [...['shape','color',...(medium?['size','detail']:[])].map((attribute,i)=>{const odd=i%count,base={kind:'butterfly',hue:'blue',size:'big',detail:false};return {mode:'odd',attribute,odd,tokens:Array.from({length:count},(_,j)=>({...base,id:`odd-${i}-${j}`,...(j===odd?attribute==='shape'?{kind:'flower'}:attribute==='color'?{hue:'red'}:attribute==='size'?{size:'small'}:{detail:true}:{})}))};}),{mode:'connect',left:(medium?['butterfly','car','apple','bear']:['butterfly','car','apple']),right:partners(medium?['butterfly','car','apple','bear']:['butterfly','car','apple'])}];}
 return [];
}
export function instruction(type,q){if(type==='bears')return q.mode==='resize'?`Move the size slider to make the toy ${q.target>50?'big':'small'}!`:`Give the big ${q.item} to the big bear!`;if(type==='garden')return `Water the ${q.kind==='tower'?'block garden':q.kind} on the ${q.first?'right':'left'} to make it tall!`;if(type==='sorting')return `Sort by ${q.mode==='categories'?'object category':q.mode}!`;if(type==='family')return q.mode==='windows'?`Can you find ${q.target}?`:'Build our storybook family. Match each portrait!';return q.mode==='odd'?`Which one is different in ${q.attribute}?`:'Draw lines to connect the same pictures!';}
export function inRect(p,r,pad=0){return p.x>=r.left-pad&&p.x<=r.right+pad&&p.y>=r.top-pad&&p.y<=r.bottom+pad;}
export function closestDrop(p,nodes){return Object.entries(nodes).filter(([,n])=>n&&inRect(p,n.getBoundingClientRect(),10)).sort(([,a],[,b])=>{const r=a.getBoundingClientRect(),t=b.getBoundingClientRect();return Math.hypot(p.x-r.left-r.width/2,p.y-r.top-r.height/2)-Math.hypot(p.x-t.left-t.width/2,p.y-t.top-t.height/2);})[0]?.[0]||null;}
export function waterLevel(current,amount=7){return Math.min(100,Math.max(10,current+amount));}
export function resizeFits(value,target){return Math.abs(value-target)<=8;}
export function acceptsBear(size,zone,next,used){return size===zone&&size===next&&!used.includes(size);}
export function acceptsSort(q,id,group,used){return !used.includes(id)&&q.tokens.some(t=>t.id===id&&t.group===group);}
export function acceptsPortrait(role,frame,used){return role===frame&&!used.includes(role);}
export function linePoint(p,r){return {x:(p.x-r.left)*1000/r.width,y:(p.y-r.top)*600/r.height};}

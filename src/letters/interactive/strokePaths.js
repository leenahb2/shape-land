// Deliberately supported, reviewed print forms: A, B, C, S, T only.
// Every stroke has a direction, separate pen lift, sampled centerline, and real coverage validation.
export const TRACE_LETTERS=['A','B','C','S','T'];
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function stroke(start,segments){
 let current={x:start[0],y:start[1]},raw=[current],d=`M${start.join(' ')}`;
 for(const segment of segments){
  if(segment.length===2){const next={x:segment[0],y:segment[1]},steps=Math.ceil(distance(current,next)/2);for(let i=1;i<=steps;i++)raw.push({x:current.x+(next.x-current.x)*i/steps,y:current.y+(next.y-current.y)*i/steps});d+=`L${segment.join(' ')}`;current=next;}
  else{const [x1,y1,x2,y2,x,y]=segment,from=current;for(let i=1;i<=100;i++){const t=i/100,u=1-t;raw.push({x:u*u*u*from.x+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x,y:u*u*u*from.y+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y});}d+=`C${segment.join(' ')}`;current={x,y};}
 }
 const cumulative=[0];for(let i=1;i<raw.length;i++)cumulative.push(cumulative[i-1]+distance(raw[i],raw[i-1]));
 const length=cumulative.at(-1),points=[];let cursor=1;
 for(let at=0;at<length;at+=2){while(cursor<cumulative.length-1&&cumulative[cursor]<at)cursor++;const before=raw[cursor-1],after=raw[cursor],t=(at-cumulative[cursor-1])/(cumulative[cursor]-cumulative[cursor-1]||1);points.push({x:before.x+(after.x-before.x)*t,y:before.y+(after.y-before.y)*t});}points.push(raw.at(-1));
 return {d,points,length,start:points[0],end:points.at(-1)};
}
export const STROKES={
 A:[stroke([120,40],[[50,235]]),stroke([120,40],[[190,235]]),stroke([76,165],[[164,165]])],
 B:[stroke([65,40],[[65,235]]),stroke([65,40],[[200,28,200,137,65,137],[220,124,220,246,65,235]])],
 C:[stroke([185,65],[[140,20,55,40,55,140],[55,235,145,260,185,215]])],
 S:[stroke([180,65],[[150,25,65,30,65,100],[65,145,175,135,175,190],[175,250,80,255,55,215]])],
 T:[stroke([45,45],[[195,45]]),stroke([120,45],[[120,235]])],
};
export const EMPTY_TRACE={index:0,started:false,complete:false,warning:false};
export function beginTrace(path,point,tolerance,state=EMPTY_TRACE){
 if(state.complete)return {...state,started:false};
 return {...state,started:distance(point,path.points[state.index])<=tolerance,warning:distance(point,path.points[state.index])>tolerance};
}
export function advanceTrace(path,state,point,tolerance){
 if(!state.started||state.complete)return state;
 // Search only a short forward window. Endpoint taps and teleports cannot skip a stroke.
 const first=Math.max(0,state.index-2),last=Math.min(path.points.length-1,state.index+15);
 let nearest=state.index,best=Infinity;
 for(let i=first;i<=last;i++){const delta=distance(point,path.points[i]);if(delta<best){best=delta;nearest=i;}}
 if(best>tolerance)return {...state,warning:true};
 const index=Math.max(state.index,nearest),coverage=index/(path.points.length-1);
 const complete=coverage>=.94&&distance(point,path.end)<=tolerance;
 return {index:complete?path.points.length-1:index,started:!complete,complete,warning:false,...(complete?{coverage}:{})};
}
export function traceProgress(path,state){return Math.min(1,state.index/(path.points.length-1));}

export function balloonLayout(width,height,count){
 // A shallow smartboard field uses one row so balloons keep large hitboxes.
 const columns=width>=700&&height<360?count:count>4?3:2,rows=Math.ceil(count/columns),cellW=width/columns,cellH=height/rows;
 const w=Math.max(40,Math.min(165,cellW-20,(cellH-18)*.76)),h=w*1.28;
 return {columns,rows,cellW,cellH,width:w,height:h,driftX:Math.max(0,Math.min(65,(cellW-w)/2-10)),driftY:Math.max(0,Math.min(44,(cellH-h)/2-9))};
}
export function balloonPosition(layout,index,seconds){
 const col=index%layout.columns,row=Math.floor(index/layout.columns),frequency=.23+(index%3)*.035;
 const x=col*layout.cellW+(layout.cellW-layout.width)/2+Math.sin(seconds*frequency+index*1.7)*layout.driftX;
 const wave=(layout.cellH-layout.height)/2+Math.sin(seconds*frequency*.8+index*.8)*layout.driftY;
 const entry=Math.min(1,seconds/1.6),start=layout.cellH-layout.height-8;
 return {x,y:row*layout.cellH+start*(1-entry)+wave*entry};
}

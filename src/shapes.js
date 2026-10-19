export const SHAPES = [
 {id:'circle',name:'Circle',color:'#f28194'},
 {id:'square',name:'Square',color:'#8ccfbd'},
 {id:'triangle',name:'Triangle',color:'#f6cb60'},
 {id:'rectangle',name:'Rectangle',color:'#91bfee'},
 {id:'heart',name:'Heart',color:'#ef8fba'},
 {id:'star',name:'Star',color:'#f7c855'},
 {id:'diamond',name:'Diamond',color:'#b9a0e1'},
 {id:'oval',name:'Oval',color:'#8bcfce'},
 {id:'pentagon',name:'Pentagon',color:'#e9a57c'},
 {id:'semicircle',name:'Semicircle',color:'#a4bded'}
];
export const byId = id => SHAPES.find(s=>s.id===id);
export const COLORS = ['#f28194','#8ccfbd','#f6cb60','#91bfee','#b9a0e1','#efab76'];

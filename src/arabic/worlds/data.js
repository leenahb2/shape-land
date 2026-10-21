import {SHAPES} from '../../shapes.js';
import {COLORS,DEFAULT_COLORS} from '../../colors/colorData.js';
import {ARABIC_EXTRA_COLORS} from '../../colors/arabicPalette.js';
export const SHAPE_NAMES={circle:'دائرة',square:'مربع',triangle:'مثلث',rectangle:'مستطيل',heart:'قلب',star:'نجمة',diamond:'معين',oval:'شكل بيضاوي',pentagon:'خماسي الأضلاع',hexagon:'سداسي الأضلاع',crescent:'هلال',semicircle:'نصف دائرة'};
export const SHAPE_DEFINITE={circle:'الدائرة',square:'المربع',triangle:'المثلث',rectangle:'المستطيل',heart:'القلب',star:'النجمة',diamond:'المعين',oval:'الشكل البيضاوي',pentagon:'خماسي الأضلاع',hexagon:'سداسي الأضلاع',crescent:'الهلال',semicircle:'نصف الدائرة'};
export const ARABIC_SHAPES=[...SHAPES,{id:'hexagon',color:'#b5cb94'},{id:'crescent',color:'#e6c674'}].map(s=>({...s,name:SHAPE_NAMES[s.id]}));
export const ARABIC_COLORS=[...COLORS,...ARABIC_EXTRA_COLORS];
export const SHAPES_KEY='little-learners-arabic-shapes',COLORS_KEY='little-learners-arabic-colors';
export function readWorldPreferences(storage,kind){let s={};try{s=JSON.parse(storage.getItem(kind==='shapes'?SHAPES_KEY:COLORS_KEY)||'{}')||{};}catch{}const key=kind==='shapes'?'shapes':'colors',all=kind==='shapes'?ARABIC_SHAPES:ARABIC_COLORS;return {[key]:Array.isArray(s[key])?[...new Set(s[key].filter(id=>all.some(c=>c.id===id)))]:kind==='shapes'?ARABIC_SHAPES.map(s=>s.id):[...DEFAULT_COLORS],difficulty:s.difficulty==='medium'?'medium':'easy',language:'ar',voice:false,effects:s.effects!==false,celebrations:s.celebrations!==false,reach:s.reach===true,pauseMotion:s.pauseMotion===true};}

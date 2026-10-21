import {color as basicColor} from './colorData';
import {ARABIC_EXTRA_COLORS} from './arabicPalette';
export const color=id=>basicColor(id)||ARABIC_EXTRA_COLORS.find(c=>c.id===id);
export const swatch=id=>color(id)?.hex||'#f5eee3';

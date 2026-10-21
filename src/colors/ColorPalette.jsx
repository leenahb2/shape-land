import {useColorText} from './ColorLocale';
import React from 'react';
import {color,swatch} from './paletteColor';
export default function ColorPalette({colors,selected,onSelect,disabled=false}){const t=useColorText();return <div className="co-palette" data-count={colors.length} style={{'--palette':Math.min(6,colors.length)}} aria-label={t("Paint color palette")}>{t(colors.map(id=><button key={id} className={`co-palette-color ${selected===id?'co-selected':''}`} data-paint={id} aria-label={t(`${color(id).name} paint`)} aria-pressed={selected===id} disabled={disabled} onClick={()=>onSelect(id)}><i style={{background:swatch(id)}} aria-hidden="true"/><span>{t(color(id).name)}</span></button>))}</div>}

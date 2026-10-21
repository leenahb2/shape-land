import React from 'react';

// Desktop bounds measured from the original, unchanged Shape Shadows board:
// 5 × 132px cells + 4 × 14px gaps + 26px tray padding/border = 742px.
// Two 132px rows + 16px row gap + 26px tray padding/border = 306px.
export default function GamePlayArea({reach=false,children}){
 return <div className={`game-play-area${reach?' game-play-area-reach':''}`} data-play-area>{children}</div>;
}

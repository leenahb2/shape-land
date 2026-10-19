import React, { useEffect, useRef, useState } from 'react';
import Shape from './Shape';

const FLOATING_SHAPES = [
  ['circle', '#f29aab'], ['star', '#f5cb68'], ['triangle', '#9cc9b5'],
  ['heart', '#ed9dbe'], ['diamond', '#baa5df'], ['square', '#98c5eb'],
];

export default function Splash({ onEnter }) {
  const [leaving, setLeaving] = useState(false);
  const timer = useRef();
  const start = useRef();
  useEffect(() => {
    start.current?.focus();
    return () => clearTimeout(timer.current);
  }, []);

  function enter() {
    if (leaving) return;
    setLeaving(true);
    timer.current = setTimeout(onEnter, 380);
  }

  return (
    <main className={`splash ${leaving ? 'splash-leaving' : ''}`}>
      <div className="splash-dots" aria-hidden="true" />
      <div className="splash-content">
        <div className="splash-kicker">A LITTLE WORLD OF WONDER</div>
        <div className="shape-parade" aria-hidden="true">
          {FLOATING_SHAPES.map(([id, color], i) => (
            <div className={`parade-shape parade-${i}`} key={id} style={{ '--order': i }}>
              <Shape id={id} color={color} />
              <span className="shape-smile"><i /><i /><b /></span>
            </div>
          ))}
          <span className="parade-spark spark-left">✦</span>
          <span className="parade-spark spark-right">✧</span>
        </div>
        <h1 className="splash-title"><span>Shape</span> <span>Land</span><b>!</b></h1>
        <p className="splash-subtitle">A Magical Shape Adventure</p>
        <div className="splash-signature">
          <span className="signature-heart" aria-hidden="true">♥</span>
          <span>Made with love by <strong>Ms. Leena</strong></span>
        </div>
        <button className="splash-enter" ref={start} onClick={enter} disabled={leaving}>
          Let’s explore! <span aria-hidden="true">→</span>
        </button>
        <p className="splash-note">Little shapes. Big imaginations.</p>
      </div>
      <div className="splash-ground" aria-hidden="true" />
    </main>
  );
}

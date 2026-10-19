import { useLayoutEffect, useRef, useState } from 'react';

// Fit every answer and destination in the available play area, including short
// landscape phones. The teacher's requested size is honored wherever it fits.
export default function usePlayLayout(answerCount, destinationCount, requestedSize) {
  const zoneRef = useRef(null);
  const [layout, setLayout] = useState({ cell: 100, columns: 4, destinationColumns: 5, side: false });
  useLayoutEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    function measure() {
      const { width, height } = zone.getBoundingClientRect();
      const side = destinationCount > 0 && width > 600 && height < 300;
      const gap = width < 600 ? 8 : 14;
      const sectionWidth = side ? (width - 20) / 2 : width;
      const preferred = Math.min(requestedSize * (width > 1500 ? 1.2 : 1), width < 600 ? 100 : 168);
      const reserve = height < 300 ? 76 : width < 600 ? 112 : 134;
      const available = Math.max(0, height - reserve);
      let best = { cell: 44, columns: 1, destinationColumns: 1, score: -Infinity };
      for (let columns = 1; columns <= (answerCount || 1); columns++) {
        for (let destinationColumns = 1; destinationColumns <= (destinationCount || 1); destinationColumns++) {
          const answerRows = Math.ceil((answerCount || 1) / columns);
          const destinationRows = destinationCount ? Math.ceil(destinationCount / destinationColumns) : 0;
          const rows = side ? Math.max(answerRows, destinationRows) : answerRows + destinationRows;
          const byHeight = (available - Math.max(0, rows - 1) * gap) / Math.max(1, rows);
          const widest = Math.max(columns, destinationCount ? destinationColumns : 1);
          const byWidth = (sectionWidth - 24 - (widest - 1) * gap) / widest;
          const cell = Math.max(44, Math.floor(Math.min(preferred, byHeight, byWidth)));
          const score = cell * 100 - rows;
          if (score > best.score) best = { cell, columns, destinationColumns, score };
        }
      }
      const { cell, columns, destinationColumns } = best;
      setLayout(previous => {
        const next = { cell, columns, destinationColumns, side };
        return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
      });
    }
    const observer = new ResizeObserver(measure);
    observer.observe(zone);
    measure();
    return () => observer.disconnect();
  }, [answerCount, destinationCount, requestedSize]);
  return { zoneRef, layout };
}

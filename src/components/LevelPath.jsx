import React from 'react';

const stops = [
  { code: 'A1', label: 'Boshlang\'ich' },
  { code: 'A2', label: 'Kundalik' },
  { code: 'B1', label: 'Mustaqil' },
  { code: 'B2', label: 'IELTS/CEFR' },
];

export default function LevelPath() {
  return (
    <div className="level-path">
      <div className="level-flag">TARGET → BAND 6.5+</div>
      <div className="level-path-track">
        <div className="level-path-line" aria-hidden="true" />
        <div className="level-path-spark" aria-hidden="true" />
        {stops.map((s) => (
          <div className="level-stop" key={s.code}>
            <div className="level-badge">{s.code}</div>
            <div className="level-stop-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

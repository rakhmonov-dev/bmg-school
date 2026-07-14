import React, { useState } from 'react';

const tabs = {
  "O'yinlar": [
    { src: '/gallery/games-1.jpg', alt: 'BMG o\'yin puli bilan mashg\'ulot' },
    { src: '/gallery/games-2.jpg', alt: 'Hayvonlar kartochkalari o\'yini' },
    { src: '/gallery/games-3.jpg', alt: 'Sinf polida so\'z o\'yini' },
    { src: '/gallery/games-4.jpg', alt: 'Halqa otish o\'yini' },
    { src: '/gallery/games-5.jpg', alt: 'Guruh o\'yini, bayroqlar ostida' },
  ],
  'Darslarimiz': [
    { src: '/gallery/classes-1.jpg', alt: 'Interaktiv dars mashg\'uloti' },
    { src: '/gallery/games-3.jpg', alt: 'Amaliy til mashqi' },
    { src: '/gallery/games-4.jpg', alt: 'Guruh faoliyati' },
  ],
  "O'quvchilar": [
    { src: '/gallery/students-1.jpg', alt: 'Bitiruvchilar sertifikat bilan' },
    { src: '/gallery/students-2.jpg', alt: 'O\'g\'il bolalar guruhi sertifikat bilan' },
    { src: '/gallery/students-3.jpg', alt: 'Guruh rasmi, sertifikat topshirish' },
    { src: '/gallery/students-4.jpg', alt: 'Kichik guruh, ustoz bilan' },
  ],
  'Muhit': [
    { src: '/gallery/students-1.jpg', alt: 'Sinf xonasi va jamoa' },
    { src: '/gallery/classes-1.jpg', alt: 'Zamonaviy sinf muhiti' },
    { src: '/gallery/students-4.jpg', alt: 'Do\'stona muhit' },
  ],
};

export default function Gallery() {
  const keys = Object.keys(tabs);
  const [active, setActive] = useState(keys[0]);

  return (
    <div>
      <div className="gallery-tabs">
        {keys.map((k) => (
          <button
            key={k}
            className={`gallery-tab ${active === k ? 'active' : ''}`}
            onClick={() => setActive(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {tabs[active].map((item, i) => (
          <div className="gallery-cell" key={`${active}-${i}`}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

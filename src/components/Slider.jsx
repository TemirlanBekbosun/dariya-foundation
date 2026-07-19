'use client';
import { useState } from 'react';

export default function Slider({ slides }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slider">
      <div className="slider__track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="slider__slide">
            <img src={s.image} alt={s.caption} />
            <p>{s.caption}</p>
          </div>
        ))}
      </div>
      <button onClick={prev} className="slider__btn slider__btn--prev">‹</button>
      <button onClick={next} className="slider__btn slider__btn--next">›</button>
    </div>
  );
}
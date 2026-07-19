'use client';
import { useState } from 'react';

export default function Lightbox({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.thumb}
            alt=""
            onClick={() => { setIndex(i); setOpen(true); }}
            className="gallery__thumb"
          />
        ))}
      </div>
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <button className="lightbox-close" onClick={() => setOpen(false)}>✕</button>
          <img src={images[index].full} alt="" className="lightbox-img" />
        </div>
      )}
    </>
  );
}
'use client';

import { useRef } from 'react';
import Icon from './Icon';

export default function Carousel({ children, perView = 3, navAlign = 'center' }) {
  const viewport = useRef(null);

  const scrollBy = (dir) => {
    const el = viewport.current;
    if (!el) return;
    const first = el.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + 30 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className={`carousel carousel--${perView}`}>
      <div className="carousel__viewport" ref={viewport}>
        {children}
      </div>
      <div className={`carousel__nav ${navAlign === 'left' ? 'carousel__nav--left' : ''}`}>
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous">
          <Icon name="chevronLeft" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next">
          <Icon name="chevronRight" />
        </button>
      </div>
    </div>
  );
}

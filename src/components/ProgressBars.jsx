'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProgressBars({ bars = [] }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bars" ref={ref}>
      {bars.map((bar, i) => (
        <div className="bar" key={i}>
          <div className="bar__top">
            <span>{bar.label}</span>
            <span>{bar.value}%</span>
          </div>
          <div className="bar__track">
            <div
              className="bar__fill"
              style={{ width: on ? `${bar.value}%` : 0, transitionDelay: `${i * 160}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

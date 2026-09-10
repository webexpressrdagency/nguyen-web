'use client';

import { useEffect } from 'react';

export default function ScrollFx() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
      io.observe(n);
    });

    return () => io.disconnect();
  }, []);

  return null;
}

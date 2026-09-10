'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function Accordion({ items = [], withImages = true }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="acc-item" data-open={isOpen} key={i}>
            <button
              type="button"
              className="acc-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="acc-head__num">{String(i + 1).padStart(2, '0')}</span>
              <span>{item.title}</span>
              <span className="acc-head__sign">
                <Icon name={isOpen ? 'minus' : 'plus'} size={20} />
              </span>
            </button>
            {isOpen && (
              <div
                className="acc-panel"
                style={!withImages || !item.image ? { gridTemplateColumns: '1fr' } : undefined}
              >
                {withImages && item.image ? <img src={item.image} alt={item.title} loading="lazy" /> : null}
                <div>
                  <p>{item.body}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

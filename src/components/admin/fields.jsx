'use client';

import { useRef, useState } from 'react';
import Icon, { ICON_NAMES, SOCIAL_ICONS } from '../Icon';

/** Content is English-only. Legacy { en, es } values are read as their English text. */
const asText = (v) => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  if (typeof v === 'object') {
    if (typeof v.en === 'string') return v.en;
    const first = Object.values(v).find((x) => typeof x === 'string');
    return first || '';
  }
  return '';
};

/* ------------------------------------------------------------------ */
export function TextInput({ value, onChange, ...rest }) {
  return (
    <input
      className="adm-input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function TextArea({ value, onChange, rows = 4, ...rest }) {
  return (
    <textarea
      className="adm-textarea"
      rows={rows}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function I18nInput({ value, onChange, area = false, rows = 4 }) {
  const v = asText(value);
  return area ? (
    <TextArea value={v} rows={rows} onChange={onChange} />
  ) : (
    <TextInput value={v} onChange={onChange} />
  );
}

/* ------------------------------------------------------------------ */
export function ImageInput({ value, onChange, hint }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.message || json.error || 'upload failed');
      onChange(json.url);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="adm-image">
      <div
        className="adm-image__preview"
        style={value ? { backgroundImage: `url(${value})` } : undefined}
      >
        {!value ? 'sin imagen' : null}
      </div>
      <div className="adm-image__controls">
        <TextInput value={value} onChange={onChange} placeholder="/img/foto.jpg o https://…" />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="adm-btn adm-btn--ghost adm-btn--sm"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            <Icon name="plus" />
            {busy ? 'Subiendo…' : 'Subir imagen'}
          </button>
          {value ? (
            <button
              type="button"
              className="adm-btn adm-btn--danger adm-btn--sm"
              onClick={() => onChange('')}
            >
              Quitar
            </button>
          ) : null}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => upload(e.target.files?.[0])}
        />
        {err ? <div className="adm-field__hint" style={{ color: '#c53030' }}>{err}</div> : null}
        {hint ? <div className="adm-field__hint">{hint}</div> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Field({ schema, value, onChange }) {
  const { label, type = 'text', hint, options, rows, min, max } = schema;

  const control = (() => {
    switch (type) {
      case 'i18n':
        return <I18nInput value={value} onChange={onChange} />;
      case 'i18nArea':
        return <I18nInput value={value} onChange={onChange} area rows={rows || 5} />;
      case 'area':
        return <TextArea value={value} onChange={onChange} rows={rows || 4} />;
      case 'image':
        return <ImageInput value={value} onChange={onChange} hint={hint} />;
      case 'number':
        return (
          <input
            className="adm-input"
            type="number"
            min={min}
            max={max}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
        );
      case 'date':
        return (
          <input
            className="adm-input"
            type="date"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case 'color':
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: 46, height: 42, border: '1px solid var(--a-line)', borderRadius: 9, background: '#fff' }}
            />
            <TextInput value={value} onChange={onChange} />
          </div>
        );
      case 'icon':
        return (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                display: 'grid',
                placeItems: 'center',
                background: 'var(--a-grad)',
                color: '#fff',
                flex: 'none',
              }}
            >
              <Icon name={value || 'check'} size={20} />
            </span>
            <select className="adm-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
              <option value="">—</option>
              {ICON_NAMES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        );
      case 'social':
        return (
          <select className="adm-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
            {SOCIAL_ICONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        );
      case 'select':
        return (
          <select className="adm-select" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
            {(options || []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case 'check':
        return (
          <label className="adm-toggle">
            <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
            <span>{hint || 'Activado'}</span>
          </label>
        );
      case 'list':
        return (
          <Repeater
            items={Array.isArray(value) ? value : []}
            fields={schema.fields}
            titleKey={schema.titleKey}
            blank={schema.blank}
            addLabel={schema.addLabel}
            onChange={onChange}
          />
        );
      default:
        return <TextInput value={value} onChange={onChange} placeholder={schema.placeholder} />;
    }
  })();

  return (
    <div className="adm-field">
      {label ? <label>{label}</label> : null}
      {control}
      {hint && type !== 'image' && type !== 'check' ? <div className="adm-field__hint">{hint}</div> : null}
    </div>
  );
}

export function Fields({ schema = [], data = {}, onPatch }) {
  return (
    <>
      {schema.map((f) => (
        <Field
          key={f.key}
          schema={f}
          value={data?.[f.key]}
          onChange={(next) => onPatch({ [f.key]: next })}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
export function Repeater({ items = [], fields = [], titleKey, blank = {}, addLabel = 'Añadir', onChange }) {
  const [open, setOpen] = useState(null);

  const patch = (i, part) => {
    const next = items.slice();
    next[i] = { ...next[i], ...part };
    onChange(next);
  };
  const remove = (i) => {
    if (!window.confirm('¿Eliminar este elemento?')) return;
    onChange(items.filter((_, idx) => idx !== i));
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const add = () => {
    onChange([...items, JSON.parse(JSON.stringify(blank))]);
    setOpen(items.length);
  };

  const titleOf = (item, i) => {
    const raw = titleKey ? item?.[titleKey] : item?.title || item?.name;
    const val = raw && typeof raw === 'object' ? raw.en || raw.es : raw;
    return val || `Elemento ${i + 1}`;
  };

  return (
    <div>
      {items.map((item, i) => (
        <div className="adm-item" key={i}>
          <div className="adm-item__head" onClick={() => setOpen(open === i ? null : i)}>
            <b>{titleOf(item, i)}</b>
            <div className="adm-item__actions" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="adm-iconbtn" title="Subir" onClick={() => move(i, -1)}>
                <Icon name="arrowUp" />
              </button>
              <button
                type="button"
                className="adm-iconbtn"
                title="Bajar"
                onClick={() => move(i, 1)}
                style={{ transform: 'rotate(180deg)' }}
              >
                <Icon name="arrowUp" />
              </button>
              <button type="button" className="adm-iconbtn" title="Eliminar" onClick={() => remove(i)}>
                <Icon name="minus" />
              </button>
              <button type="button" className="adm-iconbtn" onClick={() => setOpen(open === i ? null : i)}>
                <Icon name="chevronDown" />
              </button>
            </div>
          </div>
          {open === i ? (
            <div className="adm-item__body">
              <Fields schema={fields} data={item} onPatch={(part) => patch(i, part)} />
            </div>
          ) : null}
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={add}>
        <Icon name="plus" />
        {addLabel}
      </button>
    </div>
  );
}

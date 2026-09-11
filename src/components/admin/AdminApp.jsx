'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../Icon';
import { Field, Fields, Repeater } from './fields';
import {
  SECTION_LABELS,
  SECTION_SCHEMAS,
  COLLECTIONS,
  PAGE_LABELS,
  HERO_SCHEMA,
  PAGE_EXTRA_SCHEMAS,
  SETTINGS_SCHEMA,
  NAV_SCHEMA,
  FOOTER_SCHEMA,
} from './schemas';

const clone = (v) => JSON.parse(JSON.stringify(v));

function setPath(obj, path, value) {
  const next = Array.isArray(obj) ? obj.slice() : { ...obj };
  let cursor = next;
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i];
    const child = cursor[key];
    cursor[key] = Array.isArray(child) ? child.slice() : { ...(child || {}) };
    cursor = cursor[key];
  }
  cursor[path[path.length - 1]] = value;
  return next;
}

function Block({ schema, value, onChange }) {
  if (schema.length === 1 && schema[0].key === '__self') {
    return <Field schema={schema[0]} value={value} onChange={onChange} />;
  }
  return (
    <Fields
      schema={schema}
      data={value || {}}
      onPatch={(part) => onChange({ ...(value || {}), ...part })}
    />
  );
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Inicio', icon: 'award', group: 'Panel' },
  { id: 'sections', label: 'Secciones de la home', icon: 'spine', group: 'Contenido' },
  { id: 'pages', label: 'Páginas internas', icon: 'calendar', group: 'Contenido' },
  { id: 'services', label: 'Servicios', icon: 'hand', group: 'Colecciones' },
  { id: 'products', label: 'Productos', icon: 'wallet', group: 'Colecciones' },
  { id: 'team', label: 'Equipo', icon: 'people', group: 'Colecciones' },
  { id: 'testimonials', label: 'Testimonios', icon: 'quote', group: 'Colecciones' },
  { id: 'posts', label: 'Blog', icon: 'mail', group: 'Colecciones' },
  { id: 'faqs', label: 'Preguntas frecuentes', icon: 'check', group: 'Colecciones' },
  { id: 'gallery', label: 'Galería', icon: 'star', group: 'Colecciones' },
  { id: 'navfooter', label: 'Menú y footer', icon: 'chevronRight', group: 'Estructura' },
  { id: 'inbox', label: 'Bandeja de entrada', icon: 'mail', group: 'Estructura' },
  { id: 'settings', label: 'Ajustes generales', icon: 'shield', group: 'Estructura' },
];

export default function AdminApp({ initial, storage, defaultPassword }) {
  const [content, setContent] = useState(() => clone(initial));
  const [view, setView] = useState('dashboard');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState('');

  const update = useCallback((path, value) => {
    setContent((prev) => setPath(prev, path, value));
    setDirty(true);
  }, []);

  useEffect(() => {
    const onLeave = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onLeave);
    return () => window.removeEventListener('beforeunload', onLeave);
  }, [dirty]);

  useEffect(() => {
    if (!flash) return;
    const id = setTimeout(() => setFlash(''), 4000);
    return () => clearTimeout(id);
  }, [flash]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'save failed');
      setDirty(false);
      setFlash(
        json.persisted
          ? 'Cambios guardados y publicados en el sitio.'
          : 'Guardado temporalmente. Conecte el almacenamiento para que sea permanente.'
      );
    } catch (err) {
      setFlash(`No se pudo guardar: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const title = NAV_ITEMS.find((n) => n.id === view)?.label || 'Panel';
  const groups = useMemo(() => {
    const out = [];
    NAV_ITEMS.forEach((item) => {
      const last = out[out.length - 1];
      if (!last || last.group !== item.group) out.push({ group: item.group, items: [item] });
      else last.items.push(item);
    });
    return out;
  }, []);

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-side__brand">
          {content.settings?.logo ? <img src={content.settings.logo} alt="" /> : null}
          <span>
            <b>{content.settings?.shortName || 'Panel'}</b>
            <span>Administración</span>
          </span>
        </div>

        {groups.map((g) => (
          <div key={g.group}>
            <div className="adm-nav__sep">{g.group}</div>
            <nav className="adm-nav">
              {g.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-active={view === item.id}
                  onClick={() => setView(item.id)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}

        <div className="adm-nav__sep">Sesión</div>
        <nav className="adm-nav">
          <button type="button" onClick={() => window.open('/', '_blank')}>
            <Icon name="arrowRight" />
            <span>Ver el sitio</span>
          </button>
          <button type="button" onClick={logout}>
            <Icon name="minus" />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>

      <div className="adm-main">
        <div className="adm-top">
          <h1>{title}</h1>
          {dirty ? <span className="adm-pill adm-pill--dirty">Cambios sin guardar</span> : null}
          {flash ? <span className="adm-pill adm-pill--ok">{flash}</span> : null}
          <div className="adm-top__spacer" />
          <span className={`adm-pill ${storage === 'blob' ? 'adm-pill--ok' : 'adm-pill--warn'}`}>
            {storage === 'blob' ? 'Almacenamiento conectado' : 'Almacenamiento temporal'}
          </span>
          <button type="button" className="adm-btn" onClick={save} disabled={saving || !dirty}>
            <Icon name="check" />
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>

        <div className="adm-body">
          {storage !== 'blob' ? (
            <div className="adm-note">
              <b>Almacenamiento temporal.</b> Los cambios se pierden al reiniciar el servidor. Para
              guardarlos de forma permanente y poder subir imágenes: en Vercel abra el proyecto →{' '}
              <b>Storage</b> → <b>Create Database</b> → <b>Blob</b>, conéctelo al proyecto y vuelva a
              desplegar. Vercel añade la variable <code>BLOB_READ_WRITE_TOKEN</code> automáticamente.
            </div>
          ) : null}

          {defaultPassword ? (
            <div className="adm-note">
              <b>Contraseña por defecto activa.</b> Configure la variable de entorno{' '}
              <code>ADMIN_PASSWORD</code> en Vercel (Settings → Environment Variables) para proteger
              este panel.
            </div>
          ) : null}

          {view === 'dashboard' ? <Dashboard content={content} onGo={setView} /> : null}

          {view === 'sections' ? (
            <SectionsView
              sections={content.home?.sections || []}
              onChange={(next) => update(['home', 'sections'], next)}
            />
          ) : null}

          {view === 'pages' ? <PagesView pages={content.pages || {}} update={update} /> : null}

          {COLLECTIONS[view] ? (
            <CollectionView
              config={COLLECTIONS[view]}
              items={content[view] || []}
              onChange={(next) => update([view], next)}
            />
          ) : null}

          {view === 'navfooter' ? (
            <>
              <div className="adm-card">
                <h2>Menú principal</h2>
                <Block schema={NAV_SCHEMA} value={content.nav || []} onChange={(v) => update(['nav'], v)} />
              </div>
              <div className="adm-card">
                <h2>Pie de página</h2>
                <Block
                  schema={FOOTER_SCHEMA}
                  value={content.footer || {}}
                  onChange={(v) => update(['footer'], v)}
                />
              </div>
            </>
          ) : null}

          {view === 'inbox' ? (
            <Inbox
              submissions={content.submissions || { appointments: [], contacts: [] }}
              onChange={(next) => update(['submissions'], next)}
            />
          ) : null}

          {view === 'settings' ? (
            <SettingsView content={content} update={update} setContent={setContent} setDirty={setDirty} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
function Dashboard({ content, onGo }) {
  const pending = (content.submissions?.appointments || []).filter((s) => !s.read).length;
  const stats = [
    { n: (content.services || []).length, l: 'Servicios' },
    { n: (content.products || []).length, l: 'Productos' },
    { n: (content.posts || []).length, l: 'Artículos del blog' },
    { n: pending, l: 'Citas sin leer' },
  ];

  return (
    <>
      <div className="adm-stats">
        {stats.map((s) => (
          <div className="adm-stat" key={s.l}>
            <b>{s.n}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      <div className="adm-card">
        <h2>Cómo editar el sitio</h2>
        <p>
          Todo el contenido está en un solo lugar. Elija una sección en el menú de la izquierda, haga
          los cambios y pulse <b>Guardar cambios</b> arriba a la derecha. El sitio está en inglés,
          así que escriba los textos del sitio en inglés aunque el panel esté en español.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onGo('sections')}>
            Editar la página de inicio
          </button>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onGo('services')}>
            Editar servicios
          </button>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onGo('products')}>
            Editar productos
          </button>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onGo('settings')}>
            Teléfono, dirección y colores
          </button>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onGo('inbox')}>
            Ver solicitudes de cita
          </button>
        </div>
      </div>

      <div className="adm-card">
        <h2>Enlaces del sitio</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          <li>
            <a href="/" target="_blank" rel="noreferrer">
              Página de inicio
            </a>
          </li>
          <li>
            <a href="/products" target="_blank" rel="noreferrer">
              Productos
            </a>
          </li>
          <li>
            <a href="/services" target="_blank" rel="noreferrer">
              Servicios
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

/* ================================================================== */
function SectionsView({ sections, onChange }) {
  const [open, setOpen] = useState(null);

  const patch = (i, part) => onChange(sections.map((s, idx) => (idx === i ? { ...s, ...part } : s)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = sections.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };

  return (
    <>
      <div className="adm-note" style={{ background: '#f3f8ff', borderColor: '#cfe0fb', color: '#2c5282' }}>
        Puede reordenar las secciones con las flechas, ocultar una sin borrarla con el interruptor, y
        editar sus textos e imágenes al abrirla.
      </div>

      {sections.map((section, i) => (
        <div className="adm-item" key={section.id || i}>
          <div className="adm-item__head" onClick={() => setOpen(open === i ? null : i)}>
            <b>{SECTION_LABELS[section.type] || section.type}</b>
            <span className="adm-item__badge" data-off={section.enabled === false}>
              {section.enabled === false ? 'oculta' : 'visible'}
            </span>
            <div className="adm-item__actions" onClick={(e) => e.stopPropagation()}>
              <label className="adm-toggle" title="Mostrar u ocultar">
                <input
                  type="checkbox"
                  checked={section.enabled !== false}
                  onChange={(e) => patch(i, { enabled: e.target.checked })}
                />
              </label>
              <button type="button" className="adm-iconbtn" onClick={() => move(i, -1)} title="Subir">
                <Icon name="arrowUp" />
              </button>
              <button
                type="button"
                className="adm-iconbtn"
                onClick={() => move(i, 1)}
                title="Bajar"
                style={{ transform: 'rotate(180deg)' }}
              >
                <Icon name="arrowUp" />
              </button>
              <button type="button" className="adm-iconbtn" onClick={() => setOpen(open === i ? null : i)}>
                <Icon name="chevronDown" />
              </button>
            </div>
          </div>
          {open === i ? (
            <div className="adm-item__body">
              <Fields
                schema={SECTION_SCHEMAS[section.type] || []}
                data={section.data || {}}
                onPatch={(part) => patch(i, { data: { ...(section.data || {}), ...part } })}
              />
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}

/* ================================================================== */
function PagesView({ pages, update }) {
  const keys = Object.keys(PAGE_LABELS).filter((k) => pages[k]);
  const [active, setActive] = useState(keys[0] || 'about');
  const page = pages[active] || {};
  const extras = PAGE_EXTRA_SCHEMAS[active] || {};

  return (
    <>
      <div className="adm-card">
        <div className="adm-field">
          <label>Página</label>
          <select className="adm-select" value={active} onChange={(e) => setActive(e.target.value)}>
            {keys.map((k) => (
              <option key={k} value={k}>
                {PAGE_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="adm-card">
        <h2>Cabecera</h2>
        <Fields
          schema={HERO_SCHEMA}
          data={page.hero || {}}
          onPatch={(part) => update(['pages', active, 'hero'], { ...(page.hero || {}), ...part })}
        />
      </div>

      {Object.entries(extras).map(([key, schema]) => (
        <div className="adm-card" key={key}>
          <h2>{schema[0]?.key === '__self' ? schema[0].label : key === 'story' ? 'Contenido' : key}</h2>
          <Block
            schema={schema}
            value={page[key]}
            onChange={(value) => update(['pages', active, key], value)}
          />
        </div>
      ))}
    </>
  );
}

/* ================================================================== */
function CollectionView({ config, items, onChange }) {
  return (
    <div className="adm-card">
      <h2>{config.label}</h2>
      <p style={{ marginTop: -4 }}>
        Arrastre con las flechas para cambiar el orden en que aparecen en el sitio.
      </p>
      <Repeater
        items={items}
        fields={config.fields}
        titleKey={config.titleKey}
        blank={config.blank}
        addLabel={`Añadir a ${config.label.toLowerCase()}`}
        onChange={(next) =>
          onChange(
            next.map((item, i) => ({
              ...item,
              id: item.id || `${Date.now()}-${i}`,
            }))
          )
        }
      />
    </div>
  );
}

/* ================================================================== */
function Inbox({ submissions, onChange }) {
  const groups = [
    { key: 'appointments', label: 'Solicitudes de cita' },
    { key: 'contacts', label: 'Mensajes de contacto' },
  ];

  const toggleRead = (key, id) =>
    onChange({
      ...submissions,
      [key]: (submissions[key] || []).map((s) => (s.id === id ? { ...s, read: !s.read } : s)),
    });

  const remove = (key, id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    onChange({ ...submissions, [key]: (submissions[key] || []).filter((s) => s.id !== id) });
  };

  const exportCsv = (key, rows) => {
    const cols = ['createdAt', 'name', 'phone', 'email', 'service', 'date', 'time', 'subject', 'message'];
    const csv = [
      cols.join(','),
      ...rows.map((r) => cols.map((c) => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${key}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <div className="adm-note" style={{ background: '#f3f8ff', borderColor: '#cfe0fb', color: '#2c5282' }}>
        Los cambios en esta bandeja (marcar como leído o eliminar) también requieren pulsar
        <b> Guardar cambios</b>.
      </div>

      {groups.map((g) => {
        const rows = submissions[g.key] || [];
        return (
          <div className="adm-card" key={g.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0 }}>
                {g.label} ({rows.length})
              </h2>
              <div style={{ marginLeft: 'auto' }}>
                {rows.length ? (
                  <button
                    type="button"
                    className="adm-btn adm-btn--ghost adm-btn--sm"
                    onClick={() => exportCsv(g.key, rows)}
                  >
                    Exportar CSV
                  </button>
                ) : null}
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="adm-empty">Todavía no hay registros.</div>
            ) : (
              <div style={{ overflowX: 'auto', marginTop: 14 }}>
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Contacto</th>
                      <th>Detalle</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} data-unread={!r.read}>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          {new Date(r.createdAt).toLocaleString('es-DO')}
                        </td>
                        <td>
                          <b style={{ color: 'var(--a-ink)' }}>{r.name}</b>
                          {r.locale ? <div style={{ fontSize: 12 }}>{r.locale.toUpperCase()}</div> : null}
                        </td>
                        <td>
                          {r.phone ? <div>{r.phone}</div> : null}
                          {r.email ? <div>{r.email}</div> : null}
                        </td>
                        <td>
                          {r.service ? <div>{r.service}</div> : null}
                          {r.date || r.time ? (
                            <div>
                              {r.date} {r.time}
                            </div>
                          ) : null}
                          {r.subject ? <div>{r.subject}</div> : null}
                          {r.message ? <div style={{ color: '#7b8598' }}>{r.message}</div> : null}
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn--ghost adm-btn--sm"
                            onClick={() => toggleRead(g.key, r.id)}
                          >
                            {r.read ? 'No leído' : 'Leído'}
                          </button>{' '}
                          <button
                            type="button"
                            className="adm-btn adm-btn--danger adm-btn--sm"
                            onClick={() => remove(g.key, r.id)}
                          >
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ================================================================== */
function SettingsView({ content, update, setContent, setDirty }) {
  const settings = content.settings || {};

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'contenido-nguyen.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (file) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed?.settings) throw new Error('Archivo no válido');
      setContent(parsed);
      setDirty(true);
    } catch (err) {
      window.alert(`No se pudo importar: ${err.message}`);
    }
  };

  const blocks = [
    { key: 'brand', label: 'Marca', path: ['settings'], schema: SETTINGS_SCHEMA.brand, value: settings },
    {
      key: 'colors',
      label: 'Colores del sitio',
      path: ['settings', 'colors'],
      schema: SETTINGS_SCHEMA.colors,
      value: settings.colors,
    },
    {
      key: 'contact',
      label: 'Datos de contacto',
      path: ['settings', 'contact'],
      schema: SETTINGS_SCHEMA.contact,
      value: settings.contact,
    },
    {
      key: 'hours',
      label: 'Horario',
      path: ['settings', 'hours'],
      schema: SETTINGS_SCHEMA.hours,
      value: settings.hours,
    },
    {
      key: 'social',
      label: 'Redes sociales',
      path: ['settings', 'social'],
      schema: SETTINGS_SCHEMA.social,
      value: settings.social,
    },
    { key: 'seo', label: 'SEO', path: ['settings', 'seo'], schema: SETTINGS_SCHEMA.seo, value: settings.seo },
  ];

  return (
    <>
      {blocks.map((b) => (
        <div className="adm-card" key={b.key}>
          <h2>{b.label}</h2>
          {b.key === 'brand' ? (
            <Fields
              schema={b.schema}
              data={settings}
              onPatch={(part) => update(['settings'], { ...settings, ...part })}
            />
          ) : (
            <Block schema={b.schema} value={b.value} onChange={(v) => update(b.path, v)} />
          )}
        </div>
      ))}

      <div className="adm-card">
        <h2>Copia de seguridad</h2>
        <p style={{ marginTop: -4 }}>
          Descargue todo el contenido en un archivo JSON o restaure una copia anterior.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={exportJson}>
            Descargar copia
          </button>
          <label className="adm-btn adm-btn--ghost adm-btn--sm" style={{ cursor: 'pointer' }}>
            Restaurar copia
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => importJson(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>
    </>
  );
}

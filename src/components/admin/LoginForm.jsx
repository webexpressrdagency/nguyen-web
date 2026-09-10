'use client';

import { useState } from 'react';

export default function LoginForm({ logo, name }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Contraseña incorrecta');
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login__box">
        {logo ? <img src={logo} alt="" /> : null}
        <h1 style={{ fontSize: 20 }}>{name}</h1>
        <p style={{ margin: 0, fontSize: 14 }}>Panel de administración</p>

        <form onSubmit={submit}>
          {error ? <div className="adm-err">{error}</div> : null}
          <div className="adm-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="adm-input"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="adm-btn" style={{ width: '100%' }} disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

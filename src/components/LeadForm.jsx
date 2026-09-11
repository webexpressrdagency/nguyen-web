'use client';

import { useState } from 'react';

export default function LeadForm({
  kind = 'contact',
  locale = 'en',
  labels = {},
  services = [],
  defaultSubject = '',
}) {
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, locale, ...data }),
      });
      if (!res.ok) throw new Error('bad response');
      form.reset();
      setState('done');
    } catch (err) {
      setError(labels.formError || 'Error');
      setState('idle');
    }
  };

  if (state === 'done') {
    return <div className="alert alert--ok">{labels.thanks}</div>;
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${kind}-name`}>{labels.name}</label>
          <input id={`${kind}-name`} name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={`${kind}-phone`}>{labels.phone}</label>
          <input id={`${kind}-phone`} name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor={`${kind}-email`}>{labels.email}</label>
          <input id={`${kind}-email`} name="email" type="email" required autoComplete="email" />
        </div>

        {kind === 'appointment' ? (
          <>
            <div className="field">
              <label htmlFor={`${kind}-service`}>{labels.service}</label>
              <select id={`${kind}-service`} name="service" defaultValue="">
                <option value="" disabled>
                  {labels.selectOne}
                </option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${kind}-date`}>{labels.date}</label>
              <input id={`${kind}-date`} name="date" type="date" />
            </div>
            <div className="field">
              <label htmlFor={`${kind}-time`}>{labels.time}</label>
              <input id={`${kind}-time`} name="time" type="time" />
            </div>
          </>
        ) : (
          <div className="field">
            <label htmlFor={`${kind}-subject`}>{labels.subject}</label>
            <input
              id={`${kind}-subject`}
              name="subject"
              type="text"
              defaultValue={defaultSubject}
            />
          </div>
        )}

        <div className="field field--full">
          <label htmlFor={`${kind}-message`}>{labels.message}</label>
          <textarea id={`${kind}-message`} name="message" rows={5} />
        </div>

        {error ? (
          <div className="field--full">
            <div className="alert alert--err">{error}</div>
          </div>
        ) : null}

        <div className="field--full">
          <button type="submit" className="btn" disabled={state === 'sending'}>
            {state === 'sending'
              ? labels.sending
              : kind === 'appointment'
                ? labels.requestAppointment
                : labels.send}
          </button>
        </div>
      </div>
    </form>
  );
}

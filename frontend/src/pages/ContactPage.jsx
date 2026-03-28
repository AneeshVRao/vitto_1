import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const initial = {
  name: '',
  email: '',
  institution: '',
  institution_type: '',
  use_case: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.institution.trim()) return;
    setSent(true);
  };

  const input = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 8,
    fontSize: 14,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F5F5F7',
    fontFamily: 'DM Sans, sans-serif',
  };

  const label = {
    display: 'block',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    color: '#9CA3AF',
    marginBottom: 6,
  };

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            CONTACT
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F5F5F7', marginBottom: 12 }}>
            Request a demo
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#6B7280', marginBottom: 32, lineHeight: 1.65 }}>
            Share your institution context and primary use case. A solution engineer will respond within two business days.
            For faster institutional onboarding, use{' '}
            <Link to="/signup" style={{ color: '#ef5350', textDecoration: 'none' }}>self sign-up</Link>.
          </p>

          {sent ? (
            <div style={{ borderRadius: 14, border: '1px solid rgba(34,197,94,0.35)', background: 'rgba(34,197,94,0.08)', padding: 28, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F7', marginBottom: 8 }}>Request received</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', margin: 0 }}>
                In production this form posts to CRM. For the assignment, this is a client-side acknowledgement only.
              </p>
              <Link to="/" style={{ display: 'inline-block', marginTop: 20, fontSize: 14, color: '#ef5350', textDecoration: 'none' }}>
                ← Back to homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ marginBottom: 16 }}>
                <label style={label}>Your name</label>
                <input style={input} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" className="vitto-input" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={label}>Work email *</label>
                <input style={input} type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@institution.com" className="vitto-input" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={label}>Institution name *</label>
                <input style={input} required value={form.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Legal name" className="vitto-input" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={label}>Institution type</label>
                <select style={{ ...input, cursor: 'pointer' }} value={form.institution_type} onChange={(e) => set('institution_type', e.target.value)} className="vitto-input">
                  <option value="">Select</option>
                  {['Bank', 'NBFC', 'MFI', 'HFC', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={label}>Primary use case</label>
                <select style={{ ...input, cursor: 'pointer' }} value={form.use_case} onChange={(e) => set('use_case', e.target.value)} className="vitto-input">
                  <option value="">Select</option>
                  {['Origination / LOS', 'Collections', 'LMS migration', 'API integration', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={label}>Message</label>
                <textarea
                  style={{ ...input, minHeight: 120, resize: 'vertical' }}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Context, timeline, integration constraints…"
                  className="vitto-input"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                Submit request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ENDPOINTS = [
  { method: 'POST', path: '/api/auth/send-otp', note: 'Start verified institution onboarding' },
  { method: 'POST', path: '/api/auth/verify-otp', note: 'Exchange OTP for short-lived JWT' },
  { method: 'POST', path: '/api/leads', note: 'Create lead — Bearer token required' },
  { method: 'GET', path: '/api/leads/:id', note: 'Retrieve lead metadata' },
];

export default function ApiPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ padding: '80px 24px 40px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            API INFRASTRUCTURE
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 46px)', color: '#F5F5F7', letterSpacing: '-0.03em', marginBottom: 18, maxWidth: 720 }}>
            Embed Vitto into your origination and servicing stack
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', maxWidth: 680, lineHeight: 1.75 }}>
            Vitto exposes REST APIs for authentication, lead capture, and (in production) underwriting decisions, webhooks, and document workflows.
            Co-lenders and sponsor banks integrate without replacing their core — they consume decision payloads and status events over HTTPS.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { title: 'Authentication', body: 'JWT bearer tokens issued after OTP or SSO. Scoped claims for lead:create, decision:read, webhook:manage. Rotation and expiry enforced server-side.' },
              { title: 'Webhooks (roadmap)', body: 'Signed outbound events for application status, disbursement, DPD migration, and collections outcomes. Idempotency keys on every delivery.' },
              { title: 'Sandbox', body: 'Isolated tenant with synthetic bureau files and mock payment rails. Rate limits mirror production so load tests are representative.' },
            ].map((c) => (
              <div key={c.title} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(26,26,46,0.5)', padding: 22 }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F7', marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7', marginBottom: 16 }}>Current API surface (assignment)</h2>
          <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            {ENDPOINTS.map((row, i) => (
              <div
                key={row.path}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '88px 1fr 1.2fr',
                  gap: 16,
                  padding: '14px 18px',
                  borderBottom: i < ENDPOINTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                  alignItems: 'center',
                }}
                className="api-row-grid"
              >
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{row.method}</span>
                <span style={{ color: '#F5F5F7' }}>{row.path}</span>
                <span style={{ color: '#6B7280', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>{row.note}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#6B7280', marginTop: 16 }}>
            OpenAPI spec and Postman collection ship in the repo under <code style={{ color: '#9CA3AF' }}>docs/</code>. Request sandbox access through your Vitto partner manager.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', margin: 0 }}>
              Postman collection: <code style={{ color: '#F5F5F7' }}>docs/vitto-api.postman_collection.json</code>
            </p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
              Request sandbox
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .api-row-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

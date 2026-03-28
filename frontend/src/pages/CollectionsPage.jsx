import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    title: 'Propensity-to-pay scoring',
    body: 'Every delinquent account is scored daily on recovery likelihood — not just amount overdue. Features include bureau trend, payment velocity before default, channel responsiveness, and prior PTP behaviour. The model retrains on portfolio outcomes; strategy teams see lift charts by score decile.',
  },
  {
    title: 'Allotment and capacity',
    body: 'Accounts route to field agents, dialers, and digital channels based on score, geography, language, and agent productivity — not round-robin from an aging report. Capacity rules prevent queue buildup while protecting high-propensity cases from neglect.',
  },
  {
    title: 'Omni-channel orchestration',
    body: 'WhatsApp, SMS, email, and AI voice share a single contact policy engine. Frequency caps, quiet hours, and consent flags are enforced centrally. Channel selection is optimised per borrower segment using response history.',
  },
  {
    title: 'Field agent intelligence',
    body: 'The mobile app surfaces visit priority, suggested talking points from the last interaction, and approved settlement bands. PTP capture syncs in real time; breaches trigger automatic re-queueing.',
  },
];

export default function CollectionsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ padding: '80px 24px 48px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: '10%', width: 400, height: 280, borderRadius: '50%', background: 'rgba(230,126,34,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E67E22', marginBottom: 14 }}>
            COLLECTIONS INTELLIGENCE
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: 20, maxWidth: 720 }}>
            Recovery driven by models — not buckets
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', maxWidth: 640, lineHeight: 1.75, marginBottom: 28 }}>
            For NBFCs and MFIs under portfolio stress, collections is where technology either compounds losses or contains them.
            Vitto replaces reactive dialling lists with a predictive operating layer: who to call, when, through which channel, and what to offer.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
              Book a collections walkthrough
            </Link>
            <Link
              to="/automation"
              style={{
                display: 'inline-block', padding: '12px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                color: '#F5F5F7', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)',
              }}
            >
              View full-stack modules
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: '#F5F5F7', marginBottom: 28 }}>
            What we optimise for
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {PILLARS.map((p) => (
              <div
                key={p.title}
                style={{
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(26,26,46,0.5)',
                  padding: 24,
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(230,126,34,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F7', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              borderRadius: 14,
              border: '1px solid rgba(211,47,47,0.25)',
              background: 'linear-gradient(135deg, rgba(211,47,47,0.08) 0%, rgba(26,26,46,0.6) 100%)',
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', maxWidth: 560, margin: 0 }}>
              <strong style={{ color: '#F5F5F7' }}>Methodology note:</strong> Recovery lift claims are validated against hold-out portfolios and documented for credit committee review — not generic vendor benchmarks.
            </p>
            <Link to="/signup" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#ef5350', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Institution sign-up →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

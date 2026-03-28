import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ padding: '80px 24px 48px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            ABOUT VITTO
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F5F7', letterSpacing: '-0.03em', marginBottom: 24 }}>
            Why we exist
          </h1>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#9CA3AF', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 18 }}>
              Vitto was founded on a simple observation: most lending technology was built to <em style={{ color: '#F5F5F7', fontStyle: 'normal' }}>record</em> transactions,
              not to <em style={{ color: '#F5F5F7', fontStyle: 'normal' }}>improve</em> decisions. When machine learning arrived, it was grafted onto architectures that could never feed models the data they need in real time.
            </p>
            <p style={{ marginBottom: 18 }}>
              We are building AI-native credit infrastructure for banks, NBFCs, and MFIs — underwriting, collections, LMS, and agentic interfaces on one unified data layer.
              The goal is not feature parity with legacy LOS vendors; it is decision quality, auditability, and operational velocity that compound over years.
            </p>
            <p style={{ marginBottom: 0 }}>
              Our team combines credit practitioners who have run portfolios through cycles with engineers who have shipped regulated systems at scale.
              If you are evaluating a ten-year core partnership, we invite scrutiny of our architecture — not our slide deck.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(26,26,46,0.45)', padding: 28 }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#F5F5F7', marginBottom: 12, letterSpacing: '-0.01em' }}>
              Positioning
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 17, color: '#9CA3AF', lineHeight: 1.65, margin: 0 }}>
              A traditional LOS is a transaction system. <span style={{ color: '#F5F5F7' }}>Vitto is a decisioning system.</span>
            </p>
          </div>
          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
              Talk to us
            </Link>
            <Link to="/platform" style={{ display: 'inline-block', padding: '12px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#9CA3AF', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Explore the platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

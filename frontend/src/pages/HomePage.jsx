import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    number: '01',
    title: 'Fragmented Systems',
    body: 'Siloed LOS, LMS, and CRM create data gaps at every handoff. Your credit officers reconcile spreadsheets instead of making decisions. There is no unified truth — only disconnected records.',
  },
  {
    number: '02',
    title: 'Non-AI Native Vendors',
    body: 'Legacy core platforms add AI as an afterthought — a score appended after the decision is already made. The model never sees the data it needs because the architecture was never designed for it.',
  },
  {
    number: '03',
    title: 'Reactive Collections',
    body: 'Collections teams work from static aging buckets. There is no borrower propensity model, no channel intelligence, and no prioritisation signal. Field agents operate on instinct, not evidence.',
  },
  {
    number: '04',
    title: 'Static Rule Engines',
    body: 'Policy rules are hard-coded and reviewed annually. When your portfolio shifts — new borrower segments, macro headwinds, product variants — the engine does not adapt. Every exception is a manual override.',
  },
];

const MODULES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Data-Based Assessment',
    desc: 'Bureau, bank statement, GST, and alternative data unified into a single, auditable credit signal.',
    href: '/platform#data',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    title: 'ML Model',
    desc: 'Domain-trained models that score risk across bureau thin-files, cash-flow patterns, and behavioural signals.',
    href: '/platform#ml',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Rule Engine & Decisioning',
    desc: 'Configurable policy rules layered over ML scores. Explainable output per application, policy-compliant by design.',
    href: '/platform#rules',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Fraud Intelligence',
    desc: 'Real-time identity verification, document forensics, and network-level fraud graph detection across the portfolio.',
    href: '/platform#fraud',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Collections Intelligence',
    desc: 'Propensity-to-pay scoring, channel-level optimisation, and AI-assisted recovery across every DPD bucket.',
    href: '/collections',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="18" cy="6" r="3"/><path d="M18 3v3l2 1"/>
      </svg>
    ),
    title: 'Agentic AI Layer',
    desc: 'Borrower, Field Agent, and Underwriter agents trained on your credit policy — not generic internet text.',
    href: '/agentic',
  },
];

const IMPACT = [
  { stat: '< 90s', label: 'Credit decision latency', sub: 'From application submit to sanction' },
  { stat: '40%', label: 'Reduction in portfolio NPA', sub: 'Across early-stage NBFC deployments' },
  { stat: '3.2×', label: 'Improvement in recovery rates', sub: 'AI-prioritised collections vs manual' },
  { stat: '120+', label: 'Pre-built integrations', sub: 'Bureaus, banks, insurers, courts, GST' },
];

const TESTIMONIALS = [
  {
    quote: 'We moved from a rule engine that required a dev sprint to update to one where our credit team configures decisions directly. Vitto gave us decisioning autonomy we did not know was possible.',
    name: 'Arjun Mehta',
    title: 'Chief Risk Officer',
    institution: 'Finova Capital — NBFC',
  },
  {
    quote: 'The Agentic AI layer handles a significant share of borrower queries and PTP confirmations. Our collections team now focuses on the cases that genuinely need human judgement.',
    name: 'Priya Nambiar',
    title: 'Head of Digital Transformation',
    institution: 'Sundaram Finance — Bank',
  },
];

const PARTNER_LOGOS = ['Finova Capital', 'Sundaram Finance', 'CapFirst MFI', 'CreditBridge', 'Avanta NBFC', 'Northern Arc'];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="grid-overlay"
      style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        paddingTop: 120, paddingBottom: 80,
        background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)',
      }}
    >
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: 500, height: 500, top: -100, right: -80, background: 'rgba(211,47,47,0.07)' }} />
      <div className="glow-orb" style={{ width: 350, height: 350, bottom: -50, left: -80, background: 'rgba(211,47,47,0.05)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* Left: Copy */}
          <div>
            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.25)',
              borderRadius: 100, padding: '5px 14px', marginBottom: 28,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef5350', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, color: '#ef5350', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                AI-Native Credit Infrastructure
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 58px)', lineHeight: 1.1,
              color: '#F5F5F7', letterSpacing: '-0.03em', marginBottom: 24,
            }}>
              AI-First Infrastructure<br />
              for Modern{' '}
              <span style={{
                background: 'linear-gradient(90deg, #D32F2F 0%, #ff7070 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Financial Services
              </span>
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 400,
              color: '#9CA3AF', lineHeight: 1.7, marginBottom: 36, maxWidth: 500,
            }}>
              Not retrofitted AI on a legacy core. Not fragmented point solutions from five different vendors.
              Vitto is end-to-end lending infrastructure — built from scratch for Banks, NBFCs, and MFIs — where
              machine learning is the architecture, not an add-on.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                className="btn-primary"
                style={{
                  padding: '13px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600,
                  color: '#fff', textDecoration: 'none', display: 'inline-block',
                  background: '#D32F2F',
                  boxShadow: '0 4px 20px rgba(211,47,47,0.35)',
                }}
                onMouseEnter={e => { e.target.style.background = '#ef5350'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.target.style.background = '#D32F2F'; e.target.style.transform = 'translateY(0)'; }}
              >
                Book a Demo
              </Link>
              <Link
                to="/platform"
                className="btn-secondary"
                style={{
                  padding: '13px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500,
                  color: '#F5F5F7', textDecoration: 'none', display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.15)', background: 'transparent',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.35)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.background = 'transparent'; }}
              >
                Explore Platform →
              </Link>
            </div>

            {/* Social proof strip */}
            <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: -8 }}>
                {['A','B','C'].map((c, i) => (
                  <div key={c} style={{
                    width: 32, height: 32, borderRadius: '50%', marginLeft: i > 0 ? -10 : 0,
                    background: `hsl(${i * 40 + 200}, 40%, 40%)`,
                    border: '2px solid #0D0D1A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, color: '#fff',
                  }}>{c}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5F5F7' }}>
                  Trusted by 30+ lenders
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#6B7280' }}>
                  Banks · NBFCs · MFIs across India
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div style={{ position: 'relative' }}>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(26,26,46,0.8)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      position: 'relative',
    }}>
      {/* Window chrome */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <div style={{
          marginLeft: 12, flex: 1, background: 'rgba(255,255,255,0.04)',
          borderRadius: 4, padding: '3px 10px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#6B7280',
        }}>
          app.vitto.in/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ padding: 20 }}>
        {/* Top stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Applications Today', val: '1,247', change: '+12%', up: true },
            { label: 'Auto-Approved', val: '986', change: '79.1%', up: true },
            { label: 'Risk Flags', val: '23', change: '-8%', up: false },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)', padding: '10px 12px',
            }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#6B7280', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 500, color: '#F5F5F7' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: s.up ? '#22c55e' : '#ef5350', marginTop: 2 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div style={{
          background: 'rgba(255,255,255,0.02)', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.05)', padding: 14, marginBottom: 12,
        }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#6B7280', marginBottom: 10 }}>
            AI Decisioning — 7 Day Trend
          </div>
          <MiniChart />
        </div>

        {/* Recent decisions */}
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#6B7280', marginBottom: 8 }}>
          Live Decision Queue
        </div>
        {[
          { id: 'VT-20401', score: 742, status: 'APPROVED', time: '2s ago' },
          { id: 'VT-20400', score: 498, status: 'REVIEW', time: '14s ago' },
          { id: 'VT-20399', score: 801, status: 'APPROVED', time: '28s ago' },
        ].map(d => (
          <div key={d.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9CA3AF' }}>{d.id}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#6B7280' }}>{d.score}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
              background: d.status === 'APPROVED' ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)',
              color: d.status === 'APPROVED' ? '#22c55e' : '#eab308',
            }}>{d.status}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#4B5563' }}>{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniChart() {
  const points = [30, 52, 38, 65, 55, 72, 68, 80, 74, 88, 82, 90, 85, 92];
  const max = Math.max(...points), min = Math.min(...points);
  const normalize = v => 50 - ((v - min) / (max - min)) * 44;
  const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 260} ${normalize(v)}`).join(' ');
  const areaD = pathD + ` L 260 55 L 0 55 Z`;

  return (
    <svg width="100%" viewBox="0 0 260 58" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D32F2F" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#D32F2F" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} stroke="#D32F2F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProblemSection() {
  return (
    <section style={{ background: '#0D0D1A', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="animate-on-scroll" style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14,
          }}>
            THE PROBLEM
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#F5F5F7', letterSpacing: '-0.02em', maxWidth: 520 }}>
            The Reality of Today's Lending Technology
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.number}
              className="card-glass module-card animate-on-scroll"
              style={{
                borderRadius: 12, padding: '28px 24px',
                animationDelay: `${i * 0.1}s`,
                background: 'rgba(26,26,46,0.5)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 500,
                color: 'rgba(211,47,47,0.2)', lineHeight: 1, marginBottom: 20,
              }}>
                {p.number}
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F7', marginBottom: 12, letterSpacing: '-0.01em' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#6B7280', lineHeight: 1.65 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const features = [
    { icon: '◈', title: 'Domain-Trained Models', desc: 'Every model is trained on BFSI-specific data — bureau outcomes, repayment behaviour, collection effectiveness. Not generic ML re-applied to credit.' },
    { icon: '⬡', title: 'Unified Architecture', desc: 'One data layer feeds origination, underwriting, servicing, and collections. A payment in LMS reflects instantly in the collections propensity model.' },
    { icon: '◎', title: 'Explainability by Design', desc: 'Every decision produces an audit-grade explanation — reasons, scores, rule triggers, and data sources. RBI-compliant decisioning documentation included.' },
  ];

  return (
    <section style={{ background: '#121224', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb" style={{ width: 600, height: 400, top: -100, left: '30%', background: 'rgba(211,47,47,0.04)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* Left: Copy */}
          <div className="animate-on-scroll">
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14,
            }}>
              THE SOLUTION
            </div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 3.2vw, 40px)',
              color: '#F5F5F7', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20,
            }}>
              AI-native decisioning meets full-stack operational automation
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              Vitto replaces the patchwork of LOS vendors, rule engine providers, and AI startups with a single,
              deeply integrated platform. The AI is not a module — it is the substrate every workflow runs on.
            </p>
            <Link
              to="/platform"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#D32F2F', textDecoration: 'none',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '12px'}
              onMouseLeave={e => e.currentTarget.style.gap = '8px'}
            >
              See how it works →
            </Link>
          </div>

          {/* Right: Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="module-card animate-on-scroll"
                style={{
                  display: 'flex', gap: 20, padding: '22px 24px',
                  background: 'rgba(26,26,46,0.6)', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.07)',
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: '#D32F2F',
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#F5F5F7', marginBottom: 6 }}>
                    {f.title}
                  </h4>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModulesSection() {
  return (
    <section style={{ background: '#0D0D1A', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            THE AI LAYER
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#F5F5F7', letterSpacing: '-0.02em' }}>
            Six AI Modules. One Unified Platform.
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.65 }}>
            Each module is independently powerful. Together, they form a decision intelligence layer that operates across the entire lending lifecycle.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => (
            <div
              key={mod.title}
              className="card-glass module-card animate-on-scroll"
              style={{
                padding: '28px 24px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(26,26,46,0.5)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'rgba(211,47,47,0.08)', border: '1px solid rgba(211,47,47,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ef5350', marginBottom: 20,
              }}>
                {mod.icon}
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F7', marginBottom: 10 }}>
                {mod.title}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: '#6B7280', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>
                {mod.desc}
              </p>
              <Link
                to={mod.href}
                style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                  color: '#D32F2F', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                onMouseLeave={e => e.currentTarget.style.gap = '4px'}
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg, #121224 0%, #1A1A2E 100%)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            BUSINESS IMPACT
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#F5F5F7', letterSpacing: '-0.02em' }}>
            Measurable from Day One
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
          className="grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((item, i) => (
            <div
              key={item.label}
              className="animate-on-scroll"
              style={{
                textAlign: 'center', padding: '36px 20px',
                background: 'rgba(26,26,46,0.5)', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="stat-number" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 12 }}>
                {item.stat}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 14, color: '#F5F5F7', marginBottom: 6 }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section style={{ background: '#0D0D1A', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Partner logos */}
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#4B5563', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>
            Trusted by leading financial institutions
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 24px',
            paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {PARTNER_LOGOS.map(name => (
              <div key={name} style={{
                padding: '8px 22px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 13, color: '#6B7280',
                transition: 'color 0.2s, border-color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
          className="grid-cols-1 lg:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card animate-on-scroll"
              style={{
                padding: '36px 32px', borderRadius: 14,
                background: 'rgba(26,26,46,0.6)', border: '1px solid rgba(255,255,255,0.07)',
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: 20, opacity: 0.3 }}>
                <path d="M0 20V12C0 5.373 4.477 1.28 13.43 0L14 2.167C9.892 3.08 7.837 5.44 7.837 9.247H12V20H0ZM16 20V12C16 5.373 20.477 1.28 29.43 0L30 2.167C25.892 3.08 23.837 5.44 23.837 9.247H28V20H16Z" fill="#D32F2F"/>
              </svg>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, #D32F2F, #22223A)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F5F5F7' }}>{t.name}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#6B7280' }}>{t.title} · {t.institution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #b71c1c 0%, #D32F2F 50%, #c62828 100%)',
      padding: '80px 24px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Discover the key to grow your business
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.65 }}>
          Join the financial institutions already running on AI-native infrastructure.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/contact"
            style={{
              padding: '13px 32px', borderRadius: 8, background: '#fff',
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
              color: '#D32F2F', textDecoration: 'none', display: 'inline-block',
              transition: 'transform 0.15s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; }}
          >
            Book a Demo
          </Link>
          <Link
            to="/platform"
            style={{
              padding: '13px 32px', borderRadius: 8, background: 'transparent',
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
              color: '#fff', textDecoration: 'none', display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.4)',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState('');

  const cols = [
    {
      heading: 'Pages',
      links: [
        { label: 'Home', to: '/' },
        { label: 'Platform', to: '/platform' },
        { label: 'Automation', to: '/automation' },
        { label: 'Collections', to: '/collections' },
        { label: 'Agentic AI', to: '/agentic' },
        { label: 'API', to: '/api' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      heading: 'Partners',
      links: [
        { label: 'Banks', to: '/about' },
        { label: 'NBFCs', to: '/about' },
        { label: 'MFIs', to: '/about' },
        { label: 'API Partners', to: '/api' },
        { label: 'Integrations', to: '/api' },
      ],
    },
    {
      heading: 'Platform',
      links: [
        { label: 'LOS', to: '/automation' },
        { label: 'LMS', to: '/automation' },
        { label: 'Collections', to: '/collections' },
        { label: 'KYC & Fraud', to: '/platform' },
        { label: 'Agentic AI', to: '/agentic' },
        { label: 'API Docs', to: '/api' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#0D0D1A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #D32F2F 0%, #ff6b6b 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#fff', fontSize: 16 }}>V</span>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7' }}>Vitto</span>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: '#4B5563', lineHeight: 1.7, marginBottom: 24, maxWidth: 260 }}>
              AI-native digital credit infrastructure for Banks, NBFCs, and Microfinance Institutions.
            </p>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#6B7280', display: 'block', marginBottom: 8 }}>
                Subscribe to our updates
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@bank.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="vitto-input"
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 6, fontSize: 13 }}
                />
                <button
                  onClick={() => setEmail('')}
                  style={{
                    padding: '8px 14px', borderRadius: 6, background: '#D32F2F', border: 'none',
                    color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.background = '#ef5350'}
                  onMouseLeave={e => e.target.style.background = '#D32F2F'}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#F5F5F7', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 20 }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: '#4B5563', textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.target.style.color = '#9CA3AF'; }}
                      onMouseLeave={(e) => { e.target.style.color = '#4B5563'; }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#374151' }}>
            © 2026 Vitto Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 12 }} aria-label="Social links">
              {[
                { label: 'LinkedIn', href: '#' },
                { label: 'X', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#4B5563',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = '#9CA3AF'; }}
                  onMouseLeave={(e) => { e.target.style.color = '#4B5563'; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service', 'Security'].map(link => (
                <a key={link} href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#374151', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#6B7280'}
                  onMouseLeave={e => e.target.style.color = '#374151'}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useScrollAnimation();

  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ModulesSection />
      <ImpactSection />
      <SocialProofSection />
      <CTABanner />
      <Footer />
    </>
  );
}

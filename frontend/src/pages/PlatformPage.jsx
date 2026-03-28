import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── DATA ────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: 'data',
    anchor: 'data',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    label: 'Module 01',
    title: 'Data-Based Assessment',
    tagline: 'From raw data to a unified credit signal',
    description: `Vitto's data ingestion layer connects to every structured and unstructured data source relevant to a credit decision — CIBIL, Experian, CRIF, bank statement parsers, GST returns, ITR, Aadhaar eKYC, MCA filings, and alternative data providers. Each source is normalised, quality-scored, and fed into a feature store shared by all downstream models.

The core insight is that data quality and data architecture determine underwriting quality. Most lenders experience their data layer as a series of manual API calls that happen before the credit team reviews a file. Vitto's approach inverts this: the data layer is always-on, continuously enriching borrower profiles as new signals arrive — repayment behaviour, utilisation changes, bureau updates — so the underwriting model at origination and the collections model at delinquency see the same borrower through the same lens.`,
    bullets: [
      'Multi-bureau aggregation with conflict resolution logic',
      'Bank statement parser with cash-flow feature extraction',
      'GST and ITR data pull via government APIs',
      'Alternative data: utility, telecom, device signals (with consent)',
      'Feature store with 200+ credit-relevant variables',
    ],
  },
  {
    id: 'ml',
    anchor: 'ml',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    label: 'Module 02',
    title: 'ML Underwriting Model',
    tagline: 'Credit scoring that learns from your portfolio',
    description: `Vitto's ML underwriting engine is trained on BFSI-native data — not generic tabular ML. The base models are pre-trained on aggregated lending outcomes across diverse borrower profiles, then fine-tuned on each institution's own historical portfolio during onboarding. This transfer learning approach means a new lender does not start with a cold model.

The model outputs a probability of default (PD), a loss given default (LGD) estimate, and a composite credit score between 300 and 900. Each output is accompanied by the top contributing features — enabling the credit officer to understand exactly which signals drove the decision. For thin-file borrowers (no bureau history), Vitto falls back to cash-flow underwriting and behavioural scoring, expanding your addressable market without compromising portfolio quality.`,
    bullets: [
      'Gradient-boosted ensemble with SHAP-based explainability',
      'Thin-file handling via alternative data scoring',
      'Transfer learning: institution-specific fine-tuning at onboarding',
      'PD, LGD, and EAD output for IFRS 9 provisioning alignment',
      'Continuous retraining pipeline with drift detection alerts',
    ],
  },
  {
    id: 'rules',
    anchor: 'rules',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'Module 03',
    title: 'Rule Engine & Decisioning',
    tagline: 'Policy as code — configurable without engineering',
    description: `The rule engine is the credit team's interface to the ML layer. It does not replace the model — it operationalises it. Credit managers configure acceptance, review, and rejection bands over model scores. They define policy rules (maximum LTV, minimum income, bureau write-off exclusions) in a no-code interface. Rules are version-controlled, auditable, and effective-dated.

Every application that passes through Vitto produces a decision report: model score, applicable rules, the rule that triggered each gate, data sources used, and a plain-language reason code. This is not a courtesy feature — it is the foundation of RBI Fair Practice Code compliance and the documentation required for internal audit and board reporting.`,
    bullets: [
      'No-code policy rule builder for credit teams',
      'Configurable score bands: auto-approve / review / auto-reject',
      'Version-controlled rule history with effective dating',
      'Reason code generation for every application outcome',
      'Override workflow with maker-checker and audit log',
    ],
  },
  {
    id: 'fraud',
    anchor: 'fraud',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Module 04',
    title: 'Fraud Intelligence',
    tagline: 'Real-time detection across identity, documents, and networks',
    description: `Fraud in lending occurs at multiple points: identity fabrication during onboarding, document manipulation during verification, and network fraud (mule accounts, connected entity fraud) that only becomes visible at the portfolio level. Vitto addresses all three.

At the application level, Vitto performs liveness detection and face-match on Aadhaar, runs OCR + forensic verification on income documents, and checks PAN and mobile against a deduplicated UCIC (Unique Customer Identification Code) database. At the network level, Vitto builds a graph of shared identifiers across all applications — same mobile number, same address, same device — flagging rings and synthetic identity clusters. Fraud scores are integrated into the credit decision, not treated as a separate workflow.`,
    bullets: [
      'Aadhaar-based liveness + face match at onboarding',
      'Document forensics: OCR, tampering detection, metadata analysis',
      'UCIC with PAN, Aadhaar, mobile cross-deduplication',
      'Graph-based network fraud detection (connected entity analysis)',
      'Bureau negative-list and court record checks',
    ],
  },
  {
    id: 'collections',
    anchor: 'collections',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Module 05',
    title: 'Collections Intelligence',
    tagline: 'Propensity scoring that turns reactive collections into a strategy',
    description: `Collections performance is the most direct lever on portfolio profitability. Vitto's collections module starts before a borrower misses a payment — the propensity-to-default model scores every active loan daily, flagging accounts that show early delinquency signals (declining utilisation, bureau deterioration, payment pattern shift) before they move into DPD.

When a borrower does go delinquent, Vitto ranks the portfolio by propensity-to-pay (P2P) — not by outstanding amount. It assigns the optimal contact channel (WhatsApp, SMS, AI voice call, or field agent) based on borrower communication preferences and historical response patterns. Field agents receive a prioritised worklist on their mobile app, updated in real time. Supervisors see collection efficiency by agent, channel, and DPD bucket.`,
    bullets: [
      'Early-warning propensity model scoring active portfolio daily',
      'Propensity-to-pay ranking for intelligent field allotment',
      'Omnichannel outreach: WhatsApp, SMS, AI voice, email',
      'PTP capture and follow-up workflow with breach tracking',
      'Supervisor dashboard: bucket-wise recovery, channel ROI, agent performance',
    ],
  },
  {
    id: 'agentic',
    anchor: 'agentic',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="18" cy="6" r="3"/><path d="M18 3v3l2 1"/>
      </svg>
    ),
    label: 'Module 06',
    title: 'Agentic AI Layer',
    tagline: 'Trained on your credit policy — not the internet',
    description: ``,  // handled separately
    bullets: [],
    isAgentic: true,
  },
];

const AGENTS = [
  {
    icon: '◉',
    title: 'Borrower Agent',
    role: 'Self-service queries',
    desc: 'Handles loan status, EMI schedules, statement requests, and repayment queries over WhatsApp or the mobile app. Resolves 70–80% of inbound borrower contacts without human intervention.',
  },
  {
    icon: '◈',
    title: 'Field Agent',
    role: 'Assisted collections',
    desc: 'Provides field collectors with AI-guided conversation prompts, borrower payment history, dispute handling steps, and escalation paths. Surfaces optimal negotiation strategy based on DPD and propensity score.',
  },
  {
    icon: '◎',
    title: 'Underwriter Agent',
    role: 'Policy Q&A',
    desc: 'Answers credit policy questions for the underwriting team — "What is the maximum LTV for a gold loan top-up?" — citing the specific policy document clause. No hallucination. No generic internet answer.',
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AgenticSection() {
  return (
    <div>
      {/* Why not ChatGPT */}
      <div style={{
        background: 'rgba(211,47,47,0.04)', border: '1px solid rgba(211,47,47,0.15)',
        borderRadius: 12, padding: '28px 28px', marginBottom: 32,
      }}>
        <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#ef5350', marginBottom: 12 }}>
          Why not ChatGPT or a public LLM?
        </h4>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', lineHeight: 1.75 }}>
          Generic large language models are trained on internet text. They have no access to your credit policy, your product
          documents, or your borrower data. When asked a specific policy question, they either hallucinate an answer or give a
          generic one — both of which are liabilities in a regulated lending environment. Public LLMs cannot be audited for
          their outputs, cannot be restricted to your data perimeter, and cannot be made to cite their sources in a way that
          satisfies a regulatory examination. They are not designed for explainability or compliance. They are designed for
          broad conversational coverage.
        </p>
      </div>

      {/* How it works */}
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.8, marginBottom: 28 }}>
        Vitto's Agentic AI layer is built on a <strong style={{ color: '#F5F5F7' }}>RAG (Retrieval-Augmented Generation) pipeline</strong> over
        a <strong style={{ color: '#F5F5F7' }}>Small Language Model (SLM) trained on BFSI-specific credit data.</strong> This architecture
        means the model answers questions by retrieving relevant context from your actual policy documents, product
        terms, and borrower records — and generating a response grounded in that retrieved context. No inference
        from general knowledge. No confabulation.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}
        className="grid-cols-1 md:grid-cols-3">
        {[
          { step: '01', title: 'Query arrives', desc: 'Borrower or agent sends a natural-language query via WhatsApp or internal app.' },
          { step: '02', title: 'Context retrieval', desc: 'RAG pipeline fetches the most relevant policy clauses, product specs, or account records.' },
          { step: '03', title: 'Grounded response', desc: 'SLM generates a response using only retrieved context. Source citations included.' },
        ].map(s => (
          <div key={s.step} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '20px 18px',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, color: 'rgba(211,47,47,0.3)', marginBottom: 10 }}>{s.step}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F5F5F7', marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Why SLM */}
      <div style={{
        background: 'rgba(26,26,46,0.6)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12, padding: '28px 28px', marginBottom: 32,
      }}>
        <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F7', marginBottom: 16 }}>
          Why a domain-trained Small Language Model matters
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          className="grid-cols-1 md:grid-cols-2">
          {[
            { label: 'Explainability', desc: 'Every SLM output cites the document and clause it drew from. Required for RBI audit trail.' },
            { label: 'Policy compliance', desc: 'The model operates within your product boundaries. It cannot suggest terms or features that do not exist.' },
            { label: 'Hallucination control', desc: 'RAG + domain training dramatically reduces confabulation. If the answer is not in context, the model says so.' },
            { label: 'Data perimeter', desc: 'Deployed on-premise or in your private cloud. Borrower data does not leave your infrastructure.' },
          ].map(p => (
            <div key={p.label} style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D32F2F', marginTop: 8, flexShrink: 0 }} />
              <div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#F5F5F7' }}>{p.label} — </span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#6B7280' }}>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three agents */}
      <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F7', marginBottom: 16 }}>
        Three AI Agents
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}
        className="grid-cols-1 md:grid-cols-3">
        {AGENTS.map(a => (
          <div key={a.title} style={{
            background: 'rgba(26,26,46,0.7)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '22px 20px',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(211,47,47,0.3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, color: '#D32F2F', marginBottom: 12 }}>{a.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#F5F5F7', marginBottom: 4 }}>{a.title}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
              color: '#D32F2F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
            }}>{a.role}</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.65 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleDetail({ mod, isActive, onToggle }) {
  return (
    <div
      id={mod.anchor}
      style={{
        borderRadius: 14, border: '1px solid',
        borderColor: isActive ? 'rgba(211,47,47,0.3)' : 'rgba(255,255,255,0.07)',
        background: isActive ? 'rgba(26,26,46,0.8)' : 'rgba(26,26,46,0.4)',
        overflow: 'hidden', transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20,
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: isActive ? 'rgba(211,47,47,0.15)' : 'rgba(255,255,255,0.04)',
          border: '1px solid',
          borderColor: isActive ? 'rgba(211,47,47,0.3)' : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isActive ? '#ef5350' : '#6B7280',
          transition: 'all 0.3s',
        }}>
          {mod.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500, color: '#D32F2F', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            {mod.label}
          </div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7', letterSpacing: '-0.01em', marginBottom: 4 }}>
            {mod.title}
          </h3>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#6B7280' }}>{mod.tagline}</div>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#6B7280', transition: 'transform 0.3s',
          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Content */}
      {isActive && (
        <div style={{ padding: '0 32px 32px' }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

          {mod.isAgentic ? (
            <AgenticSection />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}
              className="grid-cols-1 lg:grid-cols-2">
              <div>
                {mod.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.8, marginBottom: 16 }}>
                    {para}
                  </p>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F5F5F7', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Capabilities
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mod.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="#D32F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function PlatformPage() {
  const [activeModule, setActiveModule] = useState('agentic');

  useEffect(() => {
    window.scrollTo(0, 0);
    // hash navigation
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setActiveModule(id);
    }
  }, []);

  const toggle = (id) => setActiveModule(prev => prev === id ? null : id);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(211,47,47,0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            AI-FIRST PLATFORM
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 54px)', color: '#F5F5F7', letterSpacing: '-0.03em', maxWidth: 700, lineHeight: 1.1, marginBottom: 20 }}>
            Six AI Modules. One Decision Intelligence Layer.
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 17, color: '#6B7280', maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
            Each module is purpose-built for a specific function in the lending lifecycle. Together, they share a unified data architecture — so a signal captured at onboarding informs a collections strategy 18 months later.
          </p>

          {/* Module nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {MODULES.map(m => (
              <button
                key={m.id}
                onClick={() => { setActiveModule(m.id); setTimeout(() => document.getElementById(m.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}
                style={{
                  padding: '7px 16px', borderRadius: 100,
                  background: activeModule === m.id ? 'rgba(211,47,47,0.12)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid',
                  borderColor: activeModule === m.id ? 'rgba(211,47,47,0.3)' : 'rgba(255,255,255,0.08)',
                  color: activeModule === m.id ? '#ef5350' : '#6B7280',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {m.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modules accordion */}
      <section style={{ padding: '40px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {MODULES.map(mod => (
            <ModuleDetail
              key={mod.id}
              mod={mod}
              isActive={activeModule === mod.id}
              onToggle={() => toggle(mod.id)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          background: 'linear-gradient(135deg, #1A1A2E 0%, #22223A 100%)',
          border: '1px solid rgba(211,47,47,0.2)', borderRadius: 16,
          padding: '52px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32,
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 28, color: '#F5F5F7', letterSpacing: '-0.02em', marginBottom: 10 }}>
              See the platform in your context
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#6B7280', maxWidth: 500, lineHeight: 1.65 }}>
              Every Vitto deployment is scoped to your institution's product mix, policy configuration, and integration requirements. A 45-minute technical walkthrough is enough to map it to your use case.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexShrink: 0 }}>
            <Link
              to="/contact"
              style={{
                padding: '13px 28px', borderRadius: 8, background: '#D32F2F',
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                color: '#fff', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = '#ef5350'}
              onMouseLeave={e => e.target.style.background = '#D32F2F'}
            >
              Book a Technical Demo
            </Link>
            <Link
              to="/automation"
              style={{
                padding: '13px 28px', borderRadius: 8, background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500,
                color: '#F5F5F7', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; }}
            >
              View Automation Modules
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

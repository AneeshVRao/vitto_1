import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AGENTS = [
  {
    name: 'Borrower Agent',
    role: 'Self-service',
    desc: 'Answers product and repayment questions grounded in the borrower’s live loan contract and communication history. No training data leakage across tenants.',
  },
  {
    name: 'Field Agent',
    role: 'Collections',
    desc: 'Surfaces visit priority, approved negotiation bands, and last PTP status. Escalates to human when sentiment or policy edge cases trigger.',
  },
  {
    name: 'Underwriter Agent',
    role: 'Policy Q&A',
    desc: 'Retrieves relevant credit policy clauses and explains how a case maps to rules — with citations for audit, not generic LLM prose.',
  },
];

export default function AgenticPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ padding: '80px 24px 40px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            AGENTIC AI
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 46px)', color: '#F5F5F7', letterSpacing: '-0.03em', marginBottom: 20, maxWidth: 800 }}>
            Compliant assistance — not generic chat
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', maxWidth: 700, lineHeight: 1.75 }}>
            Public LLMs are unsuitable for regulated lending: they hallucinate, lack traceability, and cannot enforce policy boundaries.
            Vitto’s agentic layer combines a <strong style={{ color: '#F5F5F7' }}>RAG pipeline</strong> over your documents and credit policy library with a{' '}
            <strong style={{ color: '#F5F5F7' }}>domain-trained SLM</strong> so outputs stay grounded, explainable, and auditable.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(26,26,46,0.5)', padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F7', marginBottom: 14 }}>How it works in BFSI</h2>
            <ol style={{ margin: 0, paddingLeft: 20, fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.85 }}>
              <li>User query → intent classification (borrower vs internal role).</li>
              <li>Retrieval from approved corpora: policy PDFs, product schedules, account facts — never the open web.</li>
              <li>SLM generates a response constrained to retrieved spans; citations returned with every answer.</li>
              <li>Guardrails block off-policy commitments; overrides log to audit trail.</li>
            </ol>
          </div>

          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F7', marginBottom: 16 }}>Why a domain SLM matters</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              { t: 'Explainability', d: 'Answers tie back to specific clauses and data fields — required for RBI inspections and internal credit review.' },
              { t: 'Policy compliance', d: 'The model is not a general conversationalist; it is tuned on lending vocabulary and risk language.' },
              { t: 'Hallucination control', d: 'If retrieval returns nothing, the system declines to invent — unlike consumer chatbots.' },
            ].map((x) => (
              <div key={x.t} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: 18, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#ef5350', marginBottom: 6 }}>{x.t}</div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', margin: 0, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F7', marginBottom: 18 }}>Three agents</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {AGENTS.map((a) => (
              <div
                key={a.name}
                style={{
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(26,26,46,0.45)',
                  padding: 22,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(211,47,47,0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#D32F2F', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{a.role}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#F5F5F7', marginBottom: 10 }}>{a.name}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/platform#agentic" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#ef5350', textDecoration: 'none' }}>
              Full module detail on Platform →
            </Link>
            <Link to="/contact" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#6B7280', textDecoration: 'none' }}>
              Schedule architecture review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

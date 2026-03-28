import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LAYERS = [
  {
    id: 'acquisition',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    letter: 'A',
    title: 'Customer Acquisition',
    subtitle: 'From lead to application — four journeys, one platform',
    color: '#4F86C6',
    description: 'Vitto supports four distinct acquisition journeys: self-service (DIY), banker-assisted, partner-sourced, and employee-facing. Each journey is independently configurable — forms, document requirements, consent flows, and eligibility screens — without rebuilding the underlying platform.',
    modules: [
      {
        name: 'Lead Management',
        desc: 'Capture, dedup, and score leads from web, mobile, and partner channels. Automatic lead assignment based on geography, product, and agent capacity.',
      },
      {
        name: 'Partner Onboarding',
        desc: 'DSA, fintech partner, and BC network management. Agreement execution, payout tracking, and performance analytics by sourcing channel.',
      },
      {
        name: 'DIY Journey',
        desc: 'End-to-end self-service application flow. KYC, income upload, consent, and application submission without agent involvement.',
      },
      {
        name: 'Assisted Journey',
        desc: 'Banker or RM completes the application on behalf of the customer with co-browsing capability and in-app guidance.',
      },
      {
        name: 'Partner / Employee Journey',
        desc: 'Separate interfaces for DSA agents and internal sales staff, with product-specific eligibility calculators and commission views.',
      },
    ],
  },
  {
    id: 'underwriting',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9"/>
        <path d="M12 3v9l4.5 2.5"/>
      </svg>
    ),
    letter: 'B',
    title: 'Underwriting & LOS',
    subtitle: 'From KYC to disbursement — fully automated',
    color: '#D32F2F',
    description: 'The LOS covers the complete origination workflow: identity verification, credit pull, income assessment, fraud check, policy evaluation, and disbursement. Every step is instrumented for TAT tracking and SLA management. Maker-checker controls with full audit trail at each stage.',
    modules: [
      {
        name: 'KYC — Individual & Entity',
        desc: 'Aadhaar eKYC, PAN verification, face-match liveness, and entity verification (GST, MCA) for MSME borrowers.',
      },
      {
        name: 'UCIC & Deduplication',
        desc: 'Cross-product deduplication using PAN, Aadhaar, mobile, and email. Creates and maintains a Unique Customer Identifier across the full portfolio.',
      },
      {
        name: 'Document Fetch & Analyzer',
        desc: 'API-based fetch of ITR, Form 26AS, GST returns, and bank statements. OCR extraction with automated validation against stated income.',
      },
      {
        name: 'Rule Engine',
        desc: 'No-code policy rule configuration layered over ML scores. Version-controlled with effective dating and override workflow.',
      },
      {
        name: 'Underwriting Workflow',
        desc: 'Configurable underwriting queue with SLA tracking. Maker-checker for manual review cases. Complete credit memo generation.',
      },
      {
        name: 'E-Sign & Disbursement',
        desc: 'Aadhaar-based eSign, loan agreement execution, and NACH mandate registration. Disbursement via NEFT/IMPS/UPI with escrow integration.',
      },
    ],
  },
  {
    id: 'collections',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    letter: 'C',
    title: 'Collections',
    subtitle: 'AI-driven recovery from early bucket to legal',
    color: '#E67E22',
    description: 'Collections operations in Vitto are structured around the propensity-to-pay model, not the aging bucket. The system automatically allots accounts to agents, channels, and strategies based on recovery probability — not just outstanding amount. Every touchpoint is logged and contributes to future strategy calibration.',
    modules: [
      {
        name: 'Account Allotment',
        desc: 'Automated daily allotment of delinquent accounts to field agents, telecallers, and digital channels based on P2P score, geography, and capacity.',
      },
      {
        name: 'PTP Capture & Tracking',
        desc: 'Promise-to-pay recording with systematic follow-up workflows. Breach detection triggers escalation automatically.',
      },
      {
        name: 'Payment Gateway Integration',
        desc: 'Collections payments via UPI, NACH, net banking, and cash — all reconciled back to the loan ledger in real time.',
      },
      {
        name: 'Omnichannel Automation',
        desc: 'WhatsApp, SMS, email, and AI voice outreach coordinated by the channel optimisation model. Frequency and message type adapt to borrower response history.',
      },
      {
        name: 'AI Collections Calls',
        desc: 'Outbound AI voice agent for payment reminders, PTP confirmation, and EMI rescheduling offers. Escalates to human agent on sentiment trigger.',
      },
    ],
  },
  {
    id: 'lms',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h.01M10 15h4"/>
      </svg>
    ),
    letter: 'D',
    title: 'Loan Management System',
    subtitle: 'Full loan lifecycle from disbursement to closure',
    color: '#27AE60',
    description: "Vitto's LMS is the ledger of record for every loan on the platform. It handles all post-disbursement operations: EMI scheduling and amortisation, payment posting, prepayment calculations, insurance deductions, and loan closure. The ledger is GAAP-compliant and produces IFRS 9 provisions automatically.",
    modules: [
      {
        name: 'Ledger Creation & Amortisation',
        desc: 'Automated EMI schedule generation for flat rate, reducing balance, and bullet structures. Amortisation adjustments on prepayment or restructuring.',
      },
      {
        name: 'Insurance Auto Deduct',
        desc: 'Integration with credit life and property insurance providers. Premium auto-deduction at disbursement with policy number linkage.',
      },
      {
        name: 'Loan Closure & NOC',
        desc: 'Prepayment calculations, foreclosure settlement, NOC generation, and CIBIL reporting update on closure.',
      },
      {
        name: 'Debt Tagging & Classification',
        desc: 'NPA classification, sub-standard, doubtful, and loss asset tagging per RBI guidelines. Automated IFRS 9 Stage migration.',
      },
    ],
  },
  {
    id: 'crm',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    letter: 'E',
    title: 'CRM & Communications',
    subtitle: 'Complete customer view — from acquisition to closure',
    color: '#8E44AD',
    description: 'The CRM layer aggregates every interaction, transaction, and event in the borrower relationship into a single profile. Service requests, complaints, and escalations are managed through a structured ticketing workflow. Internal teams use the Hub for coordination across credit, collections, and operations.',
    modules: [
      {
        name: '360° Customer View',
        desc: 'Single screen showing all active loans, repayment history, communication timeline, document vault, and credit score trajectory.',
      },
      {
        name: 'Service Management',
        desc: 'Structured ticketing for statements, foreclosure requests, complaint handling, and escalations. SLA-governed with customer notification at each stage.',
      },
      {
        name: 'Internal Hub',
        desc: 'Cross-team collaboration workspace for credit, operations, and collections. Case-linked notes, approvals, and escalation threads.',
      },
      {
        name: 'Campaigns',
        desc: 'Product cross-sell and top-up campaigns based on repayment behaviour, utilisation, and credit score improvement. Rule-based eligibility engine.',
      },
      {
        name: 'Reporting & Analytics',
        desc: 'Pre-built dashboards for portfolio quality, acquisition funnel, collections performance, and agent productivity. Custom report builder with export.',
      },
    ],
  },
];

export default function AutomationPage() {
  const [activeLayer, setActiveLayer] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0D0D1A', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', background: 'linear-gradient(180deg, #0D0D1A 0%, #121224 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, left: '20%', width: 500, height: 300, borderRadius: '50%', background: 'rgba(211,47,47,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D32F2F', marginBottom: 14 }}>
            FULL-STACK AUTOMATION
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 52px)', color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
            29+ Operational Modules Across 5 Layers
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B7280', maxWidth: 600, lineHeight: 1.7 }}>
            Vitto covers every operational workflow from lead to closure. Not by stitching APIs together, but through a unified data model where every layer shares context with every other.
          </p>
        </div>
      </section>

      {/* Layer overview */}
      <section style={{ padding: '20px 24px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Layer pill nav */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            {LAYERS.map(l => (
              <button
                key={l.id}
                onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 18px', borderRadius: 100,
                  background: activeLayer === l.id ? `${l.color}18` : 'rgba(255,255,255,0.04)',
                  border: '1px solid',
                  borderColor: activeLayer === l.id ? `${l.color}50` : 'rgba(255,255,255,0.08)',
                  color: activeLayer === l.id ? l.color : '#6B7280',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: activeLayer === l.id ? l.color : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 10,
                  color: activeLayer === l.id ? '#fff' : '#6B7280',
                  transition: 'all 0.2s',
                }}>
                  {l.letter}
                </div>
                {l.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Layers */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {LAYERS.map((layer, layerIndex) => (
            <div
              key={layer.id}
              style={{
                borderRadius: 14,
                border: `1px solid ${activeLayer === layer.id ? layer.color + '40' : 'rgba(255,255,255,0.07)'}`,
                background: activeLayer === layer.id ? 'rgba(26,26,46,0.8)' : 'rgba(26,26,46,0.4)',
                overflow: 'hidden', transition: 'all 0.3s',
              }}
            >
              {/* Layer header */}
              <button
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20, textAlign: 'left',
                }}
              >
                {/* Layer letter */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: activeLayer === layer.id ? `${layer.color}20` : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${activeLayer === layer.id ? layer.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: activeLayer === layer.id ? layer.color : '#6B7280',
                  transition: 'all 0.3s',
                }}>
                  {layer.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500,
                      color: layer.color, opacity: activeLayer === layer.id ? 1 : 0.5,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      Layer {layer.letter}
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
                      padding: '2px 8px', borderRadius: 100,
                      background: `${layer.color}15`, color: layer.color,
                    }}>
                      {layer.modules.length} modules
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7', letterSpacing: '-0.01em', marginBottom: 4 }}>
                    {layer.title}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#6B7280' }}>{layer.subtitle}</p>
                </div>

                {/* Module name chips (collapsed) */}
                {activeLayer !== layer.id && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 320, justifyContent: 'flex-end' }}>
                    {layer.modules.slice(0, 3).map(m => (
                      <div key={m.name} style={{
                        padding: '3px 10px', borderRadius: 100,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                        fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#4B5563',
                      }}>
                        {m.name}
                      </div>
                    ))}
                    {layer.modules.length > 3 && (
                      <div style={{
                        padding: '3px 10px', borderRadius: 100,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                        fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#4B5563',
                      }}>
                        +{layer.modules.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6B7280', transition: 'transform 0.3s', flexShrink: 0,
                  transform: activeLayer === layer.id ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              {activeLayer === layer.id && (
                <div style={{ padding: '0 32px 32px' }}>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.75, marginBottom: 32, maxWidth: 700 }}>
                    {layer.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                    {layer.modules.map((mod, i) => (
                      <div
                        key={mod.name}
                        style={{
                          background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                          border: '1px solid rgba(255,255,255,0.06)', padding: '20px 20px',
                          transition: 'border-color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = `${layer.color}40`;
                          e.currentTarget.style.background = `${layer.color}06`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                            background: `${layer.color}15`, border: `1px solid ${layer.color}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600, color: layer.color,
                          }}>
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F5F5F7', lineHeight: 1.3 }}>
                            {mod.name}
                          </h4>
                        </div>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.6, paddingLeft: 36 }}>
                          {mod.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Positioning statement */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', padding: '20px 40px',
            background: 'rgba(26,26,46,0.6)', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 600, color: '#9CA3AF', fontStyle: 'italic' }}>
              "A traditional LOS is a transaction system. Vitto is a decisioning system."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

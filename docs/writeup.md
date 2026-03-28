# Vitto — Submission Write-Up

**Assignment:** Full Stack Intern Assignment — AI-First BFSI Website
**Submission Date:** [Date]
**Author:** [Your Name]

---

## What I Built

### Deliverable 1 — Sitemap

Documented nine pages with strategic rationale, primary audience definition, and conversion goal for each. The sitemap is structured around BFSI decision-maker psychology: technical evaluators need depth before they book demos, so pages like the AI Platform and API Infrastructure exist to answer "how does it actually work?" before asking for a commitment.

### Deliverable 2 — Homepage (React)

A complete, fully-functional homepage in React with eight sections:

- **Hero** — AI-native positioning, dashboard mockup built in SVG/React (no external image), dual CTA
- **Problem** — Four problems as numbered cards matching the design reference
- **Solution** — Two-column layout with domain-trained model differentiators
- **AI Modules** — 3×2 grid of the six platform modules with Explore links
- **Business Impact** — Four stat cards with JetBrains Mono numerics
- **Social Proof** — Partner logo row + two testimonial cards
- **CTA Banner** — Red background with grid overlay, dual buttons
- **Footer** — Brand + newsletter + three navigation columns

Typography: Syne (display) + DM Sans (body) + JetBrains Mono (stats/code). Palette: `#1A1A2E` navy and `#D32F2F` crimson per spec.

### Deliverable 3 — AI Platform Page

All six modules with real technical copy in an accordion layout. The Agentic AI section covers:
- Why generic LLMs cannot serve regulated lending
- RAG pipeline architecture with three-step visual
- Why domain-trained SLMs matter: explainability, hallucination control, data perimeter
- Three agents: Borrower, Field Agent, Underwriter

### Deliverable 4 — Full Stack Automation Page

Five operational layers, each with a description and expandable module cards. The collapsed state shows a preview of module names as chips. The expanded state shows individual module cards with numbered labels and hover interactions. Positioned as the "breadth" counterpart to the Platform page's "depth".

### Deliverable 5 — Thought Leadership Article

"Retrofit AI vs AI-Native Infrastructure in BFSI" — 780 words covering architecture comparison, the data layer problem, long-term cost implications, and the case for rearchitecting. Written for an NBFC CTO audience.

### Deliverable 6 — Sign-Up Flow (Frontend + Backend)

**Frontend:** Three-step flow with step indicator, OTP toggle (email/phone), organisation details form, and confirmation screen. All loading states, error states, and input validation handled.

**Backend:**
- `POST /api/auth/send-otp` — validates input, generates and hashes a 6-digit OTP, stores session in MongoDB with 10-minute TTL, delivers via console (mock)
- `POST /api/auth/verify-otp` — compares bcrypt hash, issues JWT with `lead:create` scope
- `POST /api/leads` — validates JWT scope, saves lead to PostgreSQL via parameterised query
- `GET /api/leads/:id` — retrieves lead by ID with auth

---

## Most Challenging Part

**The Agentic AI copy (Deliverable 3).** The requirement was to explain a RAG pipeline and SLM vs public LLM distinction to a senior BFSI audience without being either too technical (losing the CRO) or too vague (losing the CTO). The constraint was: every sentence had to earn its place — no filler, no hollow claims.

The solution was to lead with the decision-maker's actual concern ("My team wants to use ChatGPT for borrower queries — why shouldn't we?") and answer it structurally: regulatory explainability requirements, data perimeter constraints, and hallucination risk in a compliance context. This reframing made the SLM explanation land as a direct answer to a real objection rather than a feature specification.

---

## One Thing I'd Do Differently With More Time

I would build the **Collections Intelligence page** as a fully separate, persona-driven page. Collections is the entry point for most NBFC conversations — "our NPA is climbing and our collections team is overwhelmed" is a more immediate pain than "we need to modernise our LOS." A dedicated page that opens with a portfolio stress scenario rather than a feature list would convert that audience significantly better.

I'd also integrate a real OTP provider (MSG91 or SendGrid) and build the Calendly embed on the contact page — the two pieces that currently require manual follow-up to test end-to-end.

---

## Thought Leadership Article

*(See `docs/article.md` for the full text, reproduced below)*

---

### Retrofit AI vs AI-Native Infrastructure in BFSI

The conversation about artificial intelligence in financial services has become unavoidable. Every vendor in the lending ecosystem now features AI prominently in its positioning. The problem is that "AI" has become a category that means almost nothing without examining the architecture underneath it.

There are two fundamentally different things being sold as AI in BFSI today. One is genuinely new. The other is a repackaging of existing systems with a machine learning layer bolted on after the fact. The difference between them is not visible in a product brochure — but it is very visible in credit decision quality, operational efficiency, and long-term cost of ownership.

**The Two Approaches**

Retrofit AI starts with a core platform built for a world of rules and batch processing. When the AI mandate arrived, the organisation integrated a scoring vendor at a specific point in the workflow. The model receives the data available at that point, scores the application, and returns a result. The rest of the system processes the result as it would a rule output.

AI-Native Infrastructure is designed with machine learning as the substrate. Data ingestion, feature engineering, model inference, policy application, and decision logging are co-designed components sharing a unified data layer. The model is not called at a single point; it informs every stage of the lifecycle.

| Dimension | Retrofit AI | AI-Native (Vitto) |
|---|---|---|
| Architecture | ML appended to legacy core | ML is the core |
| Data access | Point-in-time, siloed | Continuous, unified |
| Model updates | Manual, infrequent | Continuous retraining |
| Explainability | Score + generic reason code | Feature-level attribution |
| Policy changes | Dev sprint required | No-code configuration |

**The Data Layer Problem**

The most consequential difference is what data the model can see. A retrofitted AI model operates at the completed application form — bureau scores, declared income, uploaded documents. The rest of the platform's data is locked inside other systems with no real-time bridge.

An AI-native platform is built around a shared feature store. A borrower's repayment behaviour on a previous loan is a live signal in the underwriting model for a new product. A missed payment this week adjusts the collections agent's allotment order today — not at the next batch run.

This architectural difference is not recoverable by incremental investment.

**The Long-Term Cost Equation**

Institutions that chose to retrofit AI in the early 2020s are confronting three costs they did not model: model maintenance burden (retraining cycles require vendor procurement loops measured in months), integration debt (every API bridge between legacy LOS and an AI service is a maintenance liability), and explainability liability (RBI's model risk management guidance requires decision-level documentation that generic reason codes cannot satisfy).

**Why Future-Ready Institutions Must Rearchitect**

Borrower profiles are becoming more heterogeneous. Regulatory requirements on explainability are becoming more specific. The economics of collections demand predictive intelligence that batch-processed aging buckets cannot provide.

None of this is addressable by applying more AI to the top of a system not designed for it. The constraint is not model sophistication. It is the architecture that determines what data the model sees, how quickly it responds, and how its decisions can be explained and audited.

The institutions making this investment now are building a decisioning advantage that compounds over time. The ones deferring it are accumulating technical debt that becomes progressively harder to resolve.

---

*Vitto Technologies Pvt. Ltd. | hello@vitto.in*

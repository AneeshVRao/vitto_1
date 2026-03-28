# Vitto — Submission Write-Up

**Assignment:** Full Stack Intern Assignment — AI-First BFSI Website
**Submission Date:** March 28, 2026
**Author:** Aneesh

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

"Retrofit AI vs AI-Native Infrastructure in BFSI" — ~832 words (within the 600–900 requirement) covering architecture comparison, the data layer problem, long-term cost implications, and the case for rearchitecting. Full text: `docs/article.md`.

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

I would add the **optional lifecycle diagram** (SVG or React) from lead acquisition through closure with explicit AI decision nodes — it is the fastest way for a board to see where Vitto sits relative to a transaction-only LOS.

I would also integrate a **production OTP provider** (MSG91 / SendGrid), a **Calendly** embed on the contact page, and wire the demo form to a CRM webhook so nothing relies on manual inbox triage.

---

## Thought Leadership Article

Deliverable 5 is **`docs/article.md`** (~832 words). Export it into your submission PDF alongside this write-up.

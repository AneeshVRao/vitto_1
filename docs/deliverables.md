# Vitto — Full Stack Intern Assignment

**Official brief:** product + engineering exercise (React, Node/Express, PostgreSQL, MongoDB).

This document tracks **every required deliverable**, where it lives in the repo, and **what you still must do manually** (deployment, PDF, databases).

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| Done | Implemented in this repository |
| You | Action required on your machine / accounts |

---

## Deliverable 1 — Website structure & sitemap

| Requirement | Status | Location |
|-------------|--------|----------|
| Structured sitemap with rationale, audience, conversion goal per page | Done | [`docs/sitemap.md`](./sitemap.md) |
| Required pages covered (Home, Platform, Automation, Collections, Agentic, API, About, Contact, Sign-up) | Done | Routes in [`frontend/src/App.jsx`](../frontend/src/App.jsx); pages under `frontend/src/pages/` |

**You:** Read `docs/sitemap.md` before any interview so you can explain each page’s purpose.

---

## Deliverable 2 — Homepage (full React)

| Section | Status | Notes |
|---------|--------|--------|
| A — Hero (headline, three-part sub-copy, Book a Demo + Explore Platform, dashboard mockup) | Done | [`frontend/src/pages/HomePage.jsx`](../frontend/src/pages/HomePage.jsx) — `Hero`, `DashboardMockup` |
| B — Problem (four numbered cards) | Done | `ProblemSection` — copy aligned to spec |
| C — Solution (two columns, three differentiators) | Done | `SolutionSection` |
| D — Six modules (3×2, Explore links) | Done | `ModulesSection` — titles include **ML Model**, **Collection Intelligence**, etc. |
| E — Business impact (four claims + integrations count) | Done | `ImpactSection` — includes **120+** pre-built integrations |
| F — Social proof (logos + two testimonials) | Done | `SocialProofSection` |
| G — Red CTA banner + two buttons | Done | `CTABanner` — “Discover the key to grow your business” |
| H — Footer (logo, tagline, newsletter, 3 nav columns, social + copyright) | Done | `Footer` — Pages / Partners / Platform; LinkedIn & X placeholders; © 2026 |

**Design spec:** Navy `#1A1A2E` / red `#D32F2F`, Syne + DM Sans, `html { scroll-behavior: smooth; }`, hover on cards/buttons, responsive grids.

---

## Deliverable 3 — AI-first platform page

| Requirement | Status | Location |
|-------------|--------|----------|
| Six modules — technical copy | Done | [`frontend/src/pages/PlatformPage.jsx`](../frontend/src/pages/PlatformPage.jsx) |
| Agentic AI: RAG + SLM, vs ChatGPT, explainability / compliance / hallucinations | Done | `AgenticSection` + dedicated [`AgenticPage.jsx`](../frontend/src/pages/AgenticPage.jsx) at `/agentic` |
| Three agents (Borrower, Field, Underwriter) | Done | Platform + Agentic page |

---

## Deliverable 4 — Full stack automation (5 layers)

| Requirement | Status | Location |
|-------------|--------|----------|
| 29+ modules in 5 layers, visual hierarchy, not a flat list | Done | [`frontend/src/pages/AutomationPage.jsx`](../frontend/src/pages/AutomationPage.jsx) |

---

## Deliverable 5 — Thought leadership article

| Requirement | Status | Location |
|-------------|--------|----------|
| Title: *Retrofit AI vs AI-Native Infrastructure in BFSI* | Done | [`docs/article.md`](./article.md) |
| 600–900 words | Done | ~**832** words (validated after edit) |
| Comparison, cost of retrofitting, data-layer depth, rearchitecture | Done | See sections + table in `article.md` |

**You:** Paste `docs/article.md` into your **PDF** (or export via Markdown → PDF).

---

## Deliverable 6 — Self sign-up (frontend + backend)

| Requirement | Status | Location |
|-------------|--------|----------|
| Step 1: email **or** phone + OTP | Done | [`SignupPage.jsx`](../frontend/src/pages/SignupPage.jsx) |
| Step 2: org name, type, city, loan book size | Done | Same (extra institution types allowed) |
| Step 3: confirmation (“within 24 hours”) | Done | `StepConfirmation` |
| `POST /api/auth/send-otp` | Done | [`backend/src/routes/auth.js`](../backend/src/routes/auth.js) |
| `POST /api/auth/verify-otp` (JWT) | Done | Same |
| `POST /api/leads` | Done | [`backend/src/routes/leads.js`](../backend/src/routes/leads.js) |
| `GET /api/leads/:id` | Done | Same |
| PostgreSQL schema + migration on boot | Done | [`backend/src/db/postgres.js`](../backend/src/db/postgres.js) |
| MongoDB OTP sessions, TTL ~10 min | Done | [`backend/src/models/OTPSession.js`](../backend/src/models/OTPSession.js) |
| Validation & errors | Done | express-validator + middleware |
| Postman + curl | Done | [`vitto-api.postman_collection.json`](./vitto-api.postman_collection.json), [`curl-commands.sh`](./curl-commands.sh) |

**You (for a working API):**

1. Run **PostgreSQL** and **MongoDB** locally *or* use **Neon/Supabase + MongoDB Atlas** in the cloud.
2. Copy `backend/.env.example` → `backend/.env` and set `DATABASE_URL`, `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`.
3. `cd backend && npm install && npm run dev` — server must connect to both DBs or it exits.

---

## Technical stack & repo hygiene

| Requirement | Status |
|-------------|--------|
| React function components + hooks | Done |
| Tailwind available + global CSS | Done |
| Express, async/await, JWT | Done |
| `pg` + Mongoose | Done |
| `.gitignore` excludes `.env` | Done |
| README: setup, env vars, run instructions | Done [`../README.md`](../README.md) |

**You:** **GitHub** — keep pushing clean commits. **Feature branches** are “preferred” by the brief; optional for a small repo.

---

## Design & UX checklist

| Item | Status |
|------|--------|
| Palette & institutional typography | Done |
| Responsive layouts | Done |
| Hover on interactive UI | Done |
| Loading states on sign-up API calls | Done |
| **Bonus:** Lending lifecycle diagram | Not built (optional) |

**Positioning line (bonus):** *“A traditional LOS is a transaction system. Vitto is a decisioning system.”* — in [`README.md`](../README.md) and [`AboutPage.jsx`](../frontend/src/pages/AboutPage.jsx).

---

## Submission format (what’s left for you)

| Submission item | Code status | Your action |
|-----------------|-------------|-------------|
| GitHub repo | Pushed if you use remote | Keep repo public; verify link |
| **Vercel** (or Netlify) frontend | Config present [`frontend/vercel.json`](../frontend/vercel.json) | Connect repo, set **root** `frontend/`, env **`REACT_APP_API_URL`** = production API URL |
| **Render / Railway** backend | Ready | Deploy `backend/`, set env vars, **PostgreSQL + MongoDB** URLs |
| Live URLs in README | Placeholder URLs | Replace with **your** Vercel + Render URLs |
| **PDF** 1–2 pages | Source: [`writeup.md`](./writeup.md) + [`article.md`](./article.md) | Fill name/date; export PDF |
| Test APIs | Documented | Run Postman or `docs/curl-commands.sh` against deployed API |

---

## Quick file map

| Deliverable | Primary files |
|-------------|----------------|
| 1 | `docs/sitemap.md` |
| 2 | `frontend/src/pages/HomePage.jsx` |
| 3 | `frontend/src/pages/PlatformPage.jsx`, `AgenticPage.jsx` |
| 4 | `frontend/src/pages/AutomationPage.jsx` |
| 5 | `docs/article.md` |
| 6 | `frontend/src/pages/SignupPage.jsx`, `backend/src/**/*.js` |

---

*Internal checklist — align with the official Vitto assignment PDF/email. If the brief conflicts with this file, the official brief wins.*

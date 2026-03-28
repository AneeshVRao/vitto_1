# Vitto — Full Stack Engineering Submission

**Candidate:** Aneesh
**Role:** Full Stack Software Engineering Intern
**Date:** March 28, 2026

## Project Overview

Vitto is an AI-first digital credit infrastructure platform for Banks, NBFCs, and Microfinance Institutions.
This project demonstrates the transition from traditional LOS systems to AI-driven decisioning platforms. It is a full-stack web application designed for BFSI decision-makers, guiding them through Vitto's architecture, automation capabilities, and providing a seamless self-serve onboarding flow.

## Key Deliverables

- **Strategic Sitemap:** Architected 9 core pages mapping to BFSI buyer psychology, answering technical "how it works" objections before pushing conversion.
- **Conversion-Optimized Homepage:** Developed a responsive React homepage featuring an SVG functional dashboard mockup, value-prop grids, and interactive stat counters.
- **AI Platform Hub:** Authored structured technical copy defining Vitto's proprietary Small Language Model (SLM) strategy, RAG pipelines, and isolated data perimeters.
- **Full-Stack Automation Map:** Designed a 5-layer visual hierarchy mapping 29+ internal automated modules to showcase horizontal platform breadth.
- **Thought Leadership Content:** Authored a technical thesis on "Retrofit AI vs AI-Native Infrastructure", highlighting architectural data-layer limits of legacy systems.
- **E2E Authentication & Onboarding Flow:** Built a robust Node/Express + React signup sequence featuring OTP verification, stateless JWT session handling, and structured Postgres institutional data capture.

## Technical Architecture

- **Frontend:** React.js, Tailwind CSS (simulated via global CSS variables for dynamic state control), responsive grids. Deployed on Vercel.
- **Backend:** Node.js, Express.js. Deployed on Render.
- **Primary Database:** PostgreSQL (via Supabase) for normalized institutional lead capture and transactional relational data.
- **Ephemeral Database:** MongoDB Atlas for high-throughput, auto-expiring OTP session management using native TTL indexes.
- **Authentication:** Stateless JWT design. OTP sessions are decoupled from client-side state.

## Key Decisions

- **Segregating Data Layers (Postgres + MongoDB):** Rather than burdening Postgres with ephemeral OTP tokens and building a cron-job to purge stale rows, MongoDB TTL indexes natively expire documents precisely 10 minutes after creation.
- **Stateless Sign-up (JWT):** The sign-up flow bridges two isolated backend steps. A short-lived JWT scoped specifically for 'lead:create' eliminates the need for complex, sticky server-side sessions.
- **Styling Architecture:** Chosen institutional typography (Syne + DM Sans) over default Tailwind aesthetics to signal enterprise maturity.

## Scalability & Real-World Thinking

This system is designed as a decisioning platform, not just a transactional system.

- **Idempotent Migrations:** The database schema self-validates and provisions tables cleanly on application boot, zeroing out deployment friction.
- **Connection Pooling:** Shifted Supabase connections from direct IPv6 to IPv4 Transaction Poolers (port 6543) ensuring robust scaling under high connections directly from serverless Render environments.
- **Stateless Validation:** Comprehensive middleware validation catches malformed data before hitting the database, mitigating basic DDOS, injection, and constraint strain on cloud resources.

## Links

- **GitHub Repository:** [https://github.com/AneeshVRao/vitto_1](https://github.com/AneeshVRao/vitto_1)
- **Frontend Application (Vercel):** [https://vitto-1.vercel.app/](https://vitto-1.vercel.app/)
- **Backend API Layer (Render):** [https://vitto-1.onrender.com/health](https://vitto-1.onrender.com/health)

# Vitto — AI-Native Credit Infrastructure

> "This project demonstrates the transition from traditional LOS systems to AI-driven decisioning platforms."

Vitto represents a shift from legacy, rule-bound transaction processing to dynamic, ML-driven credit decisioning. This full-stack digital platform provides a technical demonstration of modern BFSI infrastructure, featuring intelligent automation discovery, robust explainable SLMs, and an end-to-end institutional onboarding flow.

---

## Technical Architecture

This application is built as a modular monorepo, cleanly separating the client interface from the backend microservices.

**Frontend:**
- **React.js**: Functional components and modern hook architecture.
- **CSS Architecture**: Custom scalable CSS variables and institutional typography (Syne + DM Sans) ensuring a premium enterprise feel.
- **Deployment**: Vercel Serverless Edge.

**Backend:**
- **Node.js + Express.js**: RESTful service with rigorous validation middleware.
- **PostgreSQL (Supabase)**: Persistent connection-pooled relational storage for deterministic institutional lead capture.
- **MongoDB Atlas**: Native TTL-indexed document storage handling ephemeral OTP authentication sessions.
- **Deployment**: Render Web Services.

---

## Live Deployments

| Service | Environment |
| --- | --- |
| **Client Application** | [Vitto on Vercel](https://vitto-1.vercel.app/) |
| **API Target** | [Vitto on Render](https://vitto-1.onrender.com) |
| **API Health Check** | [Render Health Ping](https://vitto-1.onrender.com/health) |

---

## Core Features

- **Stateless JWT Authentication**: Decouples the client from server state during staggered sign-up flows.
- **Automated Database Idempotency**: Postgres schemas and tables self-provision on startup, eliminating deployment friction.
- **Ephemeral Token Storage**: OTPs securely stored in MongoDB with 10-minute native TTls, removing the need for manual row purging.
- **Interactive UI Substrates**: Functional SVG dashboards, interactive product grids, and complex CSS state hover mechanics.

---

## Local Setup

### 1. Backend API

```bash
cd backend
npm install
cp .env.example .env
```

**Configure .env**:
Ensure you provide your exact database URIs:
```env
PORT=4000
DATABASE_URL=postgresql://postgres.xxx:password@aws-0-pooler.supabase.com:6543/postgres
MONGO_URI=mongodb+srv://admin:pass@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=super_secure_random_string_here
FRONTEND_URL=http://localhost:3000
```

**Run Server**:
```bash
npm run dev
# Server spins up on http://localhost:4000
```

### 2. Frontend Client

```bash
cd frontend
npm install
```

**Configure Environment**:
Create a `.env.local` inside `frontend/`
```env
REACT_APP_API_URL=http://localhost:4000
```

**Run Client**:
```bash
npm start
# Client spins up on http://localhost:3000
```

---

## API Documentation

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | None | Base Ping |
| `POST` | `/api/auth/send-otp` | None | Generates and hashes a cryptographically secure 6-digit pin |
| `POST` | `/api/auth/verify-otp` | None | Compares bcrypt hashes and issues a scoped JWT |
| `POST` | `/api/leads` | Bearer JWT | Captures organizational data to the Postgres cluster |
| `GET`  | `/api/leads/:id` | Bearer JWT | Retrieves payload data by UUID key |

*Refer to `docs/vitto-api.postman_collection.json` or `docs/curl-commands.sh` for exact request body schemas.*

---

## Author

**Aneesh**
Full Stack Engineering Intern Candidate | March 2026

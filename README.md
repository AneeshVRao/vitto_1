# Vitto — AI-Native Credit Infrastructure

> "A traditional LOS is a transaction system. Vitto is a decisioning system."

This repository contains the complete Vitto website and API, built as part of the Vitto Full Stack Intern Assignment. It is a monorepo with a React frontend and Node.js + Express backend.

---

## Live URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | `https://vitto-frontend.vercel.app` |
| Backend (Render) | `https://vitto-api.onrender.com` |
| API Health | `https://vitto-api.onrender.com/health` |

---

## Repository Structure

```
vitto/
├── frontend/                 # React app (Vitto website)
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Deliverable 2 — Full homepage
│   │   │   ├── PlatformPage.jsx    # Deliverable 3 — AI Platform page
│   │   │   ├── AutomationPage.jsx  # Deliverable 4 — Full stack automation
│   │   │   ├── CollectionsPage.jsx
│   │   │   ├── AgenticPage.jsx
│   │   │   ├── ApiPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── SignupPage.jsx      # Deliverable 6 — Self sign-up flow
│   │   ├── App.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── db/
│   │   │   └── postgres.js         # PostgreSQL pool + migrations
│   │   ├── models/
│   │   │   └── OTPSession.js       # Mongoose model with TTL index
│   │   ├── routes/
│   │   │   ├── auth.js             # POST /send-otp, POST /verify-otp
│   │   │   └── leads.js            # POST /api/leads, GET /api/leads/:id
│   │   └── index.js                # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── docs/
    ├── deliverables.md             # Checklist: all assignment items + your manual steps
    ├── sitemap.md                  # Deliverable 1 — Sitemap & strategy
    ├── article.md                  # Deliverable 5 — Thought leadership article
    ├── writeup.md                  # Submission write-up
    ├── vitto-api.postman_collection.json
    └── curl-commands.sh
```

---

## Prerequisites

- Node.js ≥ 18
- PostgreSQL ≥ 14
- MongoDB ≥ 6

---

## Local Setup — Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # Set REACT_APP_API_URL=http://localhost:4000
npm start
# → http://localhost:3000
```

**Environment variables (frontend):**

| Variable | Value |
|---|---|
| `REACT_APP_API_URL` | Backend API base URL |

---

## Local Setup — Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DB credentials (see below)
npm run dev
# → http://localhost:4000
```

**Environment variables (backend):**

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/vitto` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/vitto` |
| `JWT_SECRET` | Long random string for JWT signing | `your-long-random-secret` |
| `OTP_CONSOLE_LOG` | Print OTP to console (dev only) | `true` |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:3000` |

**Postgres database setup:**

```sql
-- Run once to create the database
CREATE DATABASE vitto;
```

The `leads` table is created automatically on first server boot via the `migrate()` function in `src/db/postgres.js`.

**MongoDB:**

No setup required. The OTP session collection is created automatically. The TTL index (10-minute expiry) is set in the Mongoose schema via `expires: 60 * 10`.

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/send-otp` | None | Send OTP to email or phone |
| `POST` | `/api/auth/verify-otp` | None | Verify OTP, receive JWT |
| `POST` | `/api/leads` | JWT | Create lead record in Postgres |
| `GET` | `/api/leads/:id` | JWT | Retrieve lead by ID |
| `GET` | `/health` | None | Server health check |

Full request/response examples: see `docs/vitto-api.postman_collection.json` or `docs/curl-commands.sh`.

---

## Testing the API

**Import Postman collection:**

1. Open Postman
2. Import → `docs/vitto-api.postman_collection.json`
3. Set the `base_url` variable to your server URL
4. Run requests in order: Health → Send OTP → Verify OTP → Create Lead → Get Lead
5. Token and lead ID are auto-saved between requests via test scripts

**Or use curl:**

```bash
chmod +x docs/curl-commands.sh
# Edit the OTP value from server console output, then:
bash docs/curl-commands.sh
```

---

## Deployment

**Frontend → Vercel:**

```bash
cd frontend
npm run build
# Push to GitHub → connect repo to Vercel
# Set REACT_APP_API_URL to your Render backend URL
```

**Backend → Render:**

1. Create a new Web Service on Render
2. Connect your GitHub repository, set root directory to `backend/`
3. Build command: `npm install`
4. Start command: `node src/index.js`
5. Add all environment variables from `.env.example`
6. Add a free PostgreSQL database and MongoDB Atlas (free tier) and copy connection strings

---

## Design Decisions

**Why Syne + DM Sans?**
Syne is a display typeface with institutional weight without being corporate-stiff. DM Sans reads cleanly at small sizes for body copy and form labels. Both are free and load fast via Google Fonts.

**Why inline styles over Tailwind classes?**
The assignment required precise control over the Vitto palette and animation states. Inline styles with CSS variables allow hover/focus state mutations via `onMouseEnter`/`onMouseLeave` without a Tailwind JIT compile step.

**Why MongoDB for OTPs?**
TTL indexes in MongoDB are native and require zero application-level cleanup logic. An OTP session document is created, and MongoDB deletes it automatically after 10 minutes. A Postgres approach would require a scheduled cron to purge expired rows.

**Why JWT instead of sessions?**
The sign-up flow is stateless across two steps. A JWT issued at OTP verification carries the scope `lead:create`, scoped and time-limited. No server-side session storage required.

---

## Commit History Conventions

```
feat: add hero section with dashboard mockup
feat: implement OTP session model with TTL index
feat: create leads API endpoint with validation
fix: correct stat-number font rendering on mobile
docs: add postman collection and curl examples
```

---

## Author

Built by [Your Name] for the Vitto Full Stack Intern Assignment.

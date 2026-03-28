require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const { migrate } = require("./db/postgres");

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger (lightweight, no morgan dependency)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/leads"));

// Health check
app.get("/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() }),
);

// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("[unhandled]", err);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Boot ────────────────────────────────────────────────────────────────────

async function boot() {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[mongodb] Connected");

    // Run Postgres migrations
    await migrate();

    app.listen(PORT, () => {
      console.log(`\n🚀 Vitto API running on http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/health\n`);
    });
  } catch (err) {
    console.error("[boot] Failed to start server:", err);
    process.exit(1);
  }
}

boot();

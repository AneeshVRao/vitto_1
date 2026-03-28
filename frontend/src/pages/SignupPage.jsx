import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp, createLead } from "../services/api";

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function StepOTP({ onNext }) {
  const [medium, setMedium] = useState("email");
  const [value, setValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    if (!value.trim()) {
      toast.error("Please enter a valid " + medium);
      return;
    }
    setLoading(true);
    try {
      const data = await sendOtp({ [medium]: value });
      if (data.error) throw new Error(data.error);
      setOtpSent(true);
      toast.success(data.message || "OTP sent successfully!");
    } catch (e) {
      toast.error(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length < 6) {
      toast.error("Enter the OTP sent to your " + medium);
      return;
    }
    setLoading(true);
    try {
      const data = await verifyOtp({ [medium]: value, otp });
      if (data.error) throw new Error(data.error);
      toast.success("OTP verified!");
      onNext({ [medium]: value, token: data.token });
    } catch (e) {
      toast.error(e.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={headingStyle}>Verify your identity</h2>
      <p style={subtitleStyle}>
        We'll send a one-time code to confirm you're real.
      </p>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["email", "phone"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMedium(m);
              setOtpSent(false);
              setOtp("");
              setError("");
            }}
            style={{
              flex: 1,
              padding: "9px",
              borderRadius: 8,
              border: "1px solid",
              borderColor: medium === m ? "#D32F2F" : "rgba(255,255,255,0.1)",
              background: medium === m ? "rgba(211,47,47,0.1)" : "transparent",
              color: medium === m ? "#ef5350" : "#9CA3AF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}
          >
            {m === "email" ? "✉ Email" : "☏ Phone"}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>
          {medium === "email" ? "Work email" : "Mobile number"}
        </label>
        <input
          type={medium === "email" ? "email" : "tel"}
          placeholder={
            medium === "email" ? "cro@yourbank.com" : "+91 9876543210"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="vitto-input"
          style={inputStyle}
          disabled={otpSent}
        />
      </div>

      {/* OTP field */}
      {otpSent && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Enter OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="vitto-input"
            style={{ ...inputStyle, letterSpacing: "0.3em", fontSize: 20 }}
            autoFocus
          />
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 12,
              color: "#6B7280",
              marginTop: 8,
            }}
          >
            Check your {medium}. Code expires in 10 minutes.{" "}
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#D32F2F",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
              }}
            >
              Resend
            </button>
          </div>
        </div>
      )}

      <button
        onClick={otpSent ? verifyOTP : sendOTP}
        disabled={loading}
        style={primaryBtnStyle(loading)}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Sending...
          </div>
        ) : otpSent ? (
          "Verify OTP →"
        ) : (
          "Send OTP →"
        )}
      </button>
    </div>
  );
}

function StepOrg({ data, onNext, onBack }) {
  const [form, setForm] = useState({
    institution_name: "",
    institution_type: "",
    city: "",
    loan_book_size: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async () => {
    const required = [
      "institution_name",
      "institution_type",
      "city",
      "loan_book_size",
    ];
    if (required.some((k) => !form[k])) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await createLead(
        { ...form, email: data.email, phone: data.phone },
        data.token,
      );
      if (result.error) throw new Error(result.error);
      onNext({ ...data, ...form, leadId: result.id });
    } catch (e) {
      toast.error(e.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={headingStyle}>Tell us about your institution</h2>
      <p style={subtitleStyle}>
        This helps us tailor the platform walkthrough to your specific context.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Institution name</label>
          <input
            value={form.institution_name}
            onChange={(e) => set("institution_name", e.target.value)}
            placeholder="e.g. Avanta Finance Pvt. Ltd."
            className="vitto-input"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Institution type</label>
          <select
            value={form.institution_type}
            onChange={(e) => set("institution_type", e.target.value)}
            className="vitto-input"
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          >
            <option value="" disabled>
              Select type...
            </option>
            {["Bank", "NBFC", "MFI", "HFC", "Fintech Lender"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>City / Headquarters</label>
          <input
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="e.g. Mumbai"
            className="vitto-input"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Approximate loan book size</label>
          <select
            value={form.loan_book_size}
            onChange={(e) => set("loan_book_size", e.target.value)}
            className="vitto-input"
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          >
            <option value="" disabled>
              Select range...
            </option>
            {[
              "< ₹50 Cr",
              "₹50–200 Cr",
              "₹200–500 Cr",
              "₹500 Cr – ₹2,000 Cr",
              "> ₹2,000 Cr",
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        <button onClick={onBack} style={secondaryBtnStyle}>
          ← Back
        </button>
        <button
          onClick={submit}
          disabled={loading}
          style={{ ...primaryBtnStyle(loading), flex: 1 }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Sending...
            </div>
          ) : (
            "Submit →"
          )}
        </button>
      </div>
    </div>
  );
}

function StepConfirmation({ data }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(34,197,94,0.1)",
          border: "2px solid rgba(34,197,94,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 28px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16l7 7 13-13"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 style={{ ...headingStyle, textAlign: "center" }}>
        You're on our radar
      </h2>
      <p
        style={{
          ...subtitleStyle,
          textAlign: "center",
          maxWidth: 380,
          margin: "0 auto 32px",
        }}
      >
        Our team will reach out within{" "}
        <strong style={{ color: "#F5F5F7" }}>24 hours</strong> to schedule a
        technical walkthrough tailored to{" "}
        <strong style={{ color: "#F5F5F7" }}>
          {data.institution_name || "your institution"}
        </strong>
        .
      </p>

      {/* What to expect */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: "24px",
          marginBottom: 28,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: "#F5F5F7",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          What happens next
        </div>
        {[
          "A solution engineer will review your institution profile",
          "We'll prepare a platform walkthrough specific to your product mix",
          "Expect a 45-minute technical demo — no sales pitch",
        ].map((s, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 12, marginBottom: i < 2 ? 12 : 0 }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(211,47,47,0.1)",
                border: "1px solid rgba(211,47,47,0.2)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "#D32F2F",
                fontWeight: 600,
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 14,
                color: "#9CA3AF",
                lineHeight: 1.5,
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "11px 28px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: "#F5F5F7",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.target.style.background = "rgba(255,255,255,0.1)")
        }
        onMouseLeave={(e) =>
          (e.target.style.background = "rgba(255,255,255,0.06)")
        }
      >
        Back to homepage
      </Link>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [collected, setCollected] = useState({});

  const next = (newData) => {
    setCollected((prev) => ({ ...prev, ...newData }));
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const STEPS = ["Verify", "Organisation", "Confirmed"];

  return (
    <div
      style={{
        background: "#0D0D1A",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #D32F2F 0%, #ff6b6b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                V
              </span>
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#F5F5F7",
              }}
            >
              Vitto
            </span>
          </Link>
        </div>

        {/* Step indicators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            marginBottom: 40,
          }}
        >
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      step > i + 1
                        ? "#22c55e"
                        : step === i + 1
                          ? "#D32F2F"
                          : "rgba(255,255,255,0.08)",
                    border: `2px solid ${step > i + 1 ? "#22c55e" : step === i + 1 ? "#D32F2F" : "rgba(255,255,255,0.1)"}`,
                    fontFamily:
                      step > i + 1 ? "none" : "JetBrains Mono, monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    color: step >= i + 1 ? "#fff" : "#6B7280",
                    transition: "all 0.3s",
                  }}
                >
                  {step > i + 1 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 10,
                    color: step === i + 1 ? "#F5F5F7" : "#4B5563",
                    fontWeight: step === i + 1 ? 600 : 400,
                  }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 1,
                    background:
                      step > i + 1 ? "#22c55e" : "rgba(255,255,255,0.1)",
                    margin: "0 4px",
                    marginBottom: 20,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(26,26,46,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "40px 36px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {step === 1 && <StepOTP onNext={next} />}
          {step === 2 && (
            <StepOrg data={collected} onNext={next} onBack={back} />
          )}
          {step === 3 && <StepConfirmation data={collected} />}
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: "DM Sans, sans-serif",
            fontSize: 12,
            color: "#374151",
            marginTop: 20,
          }}
        >
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "#6B7280", textDecoration: "none" }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "#6B7280", textDecoration: "none" }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const headingStyle = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: 24,
  color: "#F5F5F7",
  letterSpacing: "-0.02em",
  marginBottom: 8,
};
const subtitleStyle = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: 14,
  color: "#6B7280",
  lineHeight: 1.6,
  marginBottom: 28,
};
const labelStyle = {
  display: "block",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 12,
  fontWeight: 500,
  color: "#9CA3AF",
  marginBottom: 6,
  letterSpacing: "0.02em",
};
const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 8,
  fontSize: 14,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#F5F5F7",
  fontFamily: "DM Sans, sans-serif",
};
const errorStyle = {
  background: "rgba(211,47,47,0.1)",
  border: "1px solid rgba(211,47,47,0.25)",
  borderRadius: 8,
  padding: "10px 14px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 13,
  color: "#ef9090",
};
const primaryBtnStyle = (loading) => ({
  width: "100%",
  padding: "13px",
  borderRadius: 8,
  marginTop: 8,
  background: loading ? "rgba(211,47,47,0.5)" : "#D32F2F",
  border: "none",
  color: "#fff",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 15,
  fontWeight: 600,
  cursor: loading ? "not-allowed" : "pointer",
  transition: "background 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});
const secondaryBtnStyle = {
  padding: "13px 20px",
  borderRadius: 8,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#9CA3AF",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s",
};

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <path
        d="M9 2a7 7 0 0 1 7 7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

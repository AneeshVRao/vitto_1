const BASE_URL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000";

export const sendOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const verifyOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createLead = async (data, token) => {
  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

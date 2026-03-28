import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import AutomationPage from "./pages/AutomationPage";
import CollectionsPage from "./pages/CollectionsPage";
import AgenticPage from "./pages/AgenticPage";
import ApiPage from "./pages/ApiPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      {/* Navbar not shown on signup page */}
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/platform" element={<PlatformPage />} />
                <Route path="/automation" element={<AutomationPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/agentic" element={<AgenticPage />} />
                <Route path="/api" element={<ApiPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

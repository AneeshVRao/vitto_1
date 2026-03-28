import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Automation', href: '/automation' },
  { label: 'Collections', href: '/collections' },
  { label: 'Agentic AI', href: '/agentic' },
  { label: 'API', href: '/api' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(13,13,26,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #D32F2F 0%, #ff6b6b 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#fff', fontSize: 16, letterSpacing: '-0.02em' }}>V</span>
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
            Vitto
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                color: location.pathname === link.href.split('#')[0] ? '#F5F5F7' : '#9CA3AF',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                transition: 'color 0.2s, background 0.2s',
                background: location.pathname === link.href.split('#')[0] ? 'rgba(255,255,255,0.06)' : 'transparent',
              }}
              onMouseEnter={e => { e.target.style.color = '#F5F5F7'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => {
                const active = location.pathname === link.href.split('#')[0];
                e.target.style.color = active ? '#F5F5F7' : '#9CA3AF';
                e.target.style.background = active ? 'rgba(255,255,255,0.06)' : 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            to="/signup"
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
              color: '#9CA3AF', textDecoration: 'none', padding: '6px 14px',
              display: 'none',
            }}
            className="hidden md:block"
          >
            Sign In
          </Link>
          <Link
            to="/contact"
            className="btn-primary"
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
              color: '#fff', textDecoration: 'none', padding: '8px 20px',
              borderRadius: 7, background: '#D32F2F',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.target.style.background = '#ef5350'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.background = '#D32F2F'; e.target.style.transform = 'translateY(0)'; }}
          >
            Book a Demo
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              color: '#F5F5F7', padding: 6,
            }}
            className="md:hidden flex"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(13,13,26,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px 24px', backdropFilter: 'blur(16px)',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              style={{
                display: 'block', padding: '10px 0',
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500,
                color: '#F5F5F7', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/signup"
            style={{
              display: 'block', marginTop: 16, textAlign: 'center',
              padding: '10px', borderRadius: 8, background: '#D32F2F',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
              color: '#fff', textDecoration: 'none',
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

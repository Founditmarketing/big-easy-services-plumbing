/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Wrench,
  Menu,
  X,
  Mail,
  MapPin,
  Star,
  ChevronDown,
  Droplets,
  Drill,
  HardHat,
} from 'lucide-react';

// ============================================
// SCROLL TO TOP ON ROUTE CHANGE
// ============================================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ============================================
// NAVBAR
// ============================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/our-promise', label: 'Our Promise' },
    { to: '/service-area', label: 'Service Area' },
    { to: '/credentials', label: 'Credentials' },
    { to: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { to: '/services/plumbing', label: 'Plumbing', icon: Droplets, color: '#3B82F6' },
    { to: '/services/directional-boring', label: 'Directional Boring', icon: Drill, color: '#F59E0B' },
    { to: '/services/utility-work', label: 'Utility Work', icon: HardHat, color: '#059669' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    if (to === '/services') return location.pathname.startsWith('/services');
    return location.pathname === to;
  };

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-nav">
        <div className="section-container" style={{ padding: '0 1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img
                src="/images/logobes.png"
                alt="Big Easy Services Plumbing"
                style={{
                  height: 42,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hidden md:flex">
              {/* Home link */}
              <Link
                to="/"
                className={isActive('/') ? 'nav-link-active' : ''}
                style={{
                  color: isActive('/') ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive('/') ? 700 : 600,
                  fontFamily: 'var(--font-heading)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '4px',
                }}
                onMouseEnter={(e) => { if (!isActive('/')) e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { if (!isActive('/')) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                ref={dropdownRef}
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to="/services"
                  className="nav-dropdown-trigger"
                  style={{
                    color: isServicesActive ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: isServicesActive ? 700 : 600,
                    fontFamily: 'var(--font-heading)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  Services
                  <ChevronDown
                    style={{
                      width: 14,
                      height: 14,
                      transition: 'transform 0.25s ease',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </Link>

                {/* Dropdown Panel */}
                <div className={`nav-dropdown-panel ${servicesOpen ? 'open' : ''}`}>
                  <div className="nav-dropdown-inner">
                    {serviceLinks.map((svc) => {
                      const SvcIcon = svc.icon;
                      return (
                        <Link
                          key={svc.to}
                          to={svc.to}
                          className="nav-dropdown-item"
                          onClick={() => setServicesOpen(false)}
                        >
                          <div
                            className="nav-dropdown-icon"
                            style={{ background: `${svc.color}18` }}
                          >
                            <SvcIcon style={{ width: 18, height: 18, color: svc.color }} />
                          </div>
                          <span>{svc.label}</span>
                        </Link>
                      );
                    })}
                    <div className="nav-dropdown-footer">
                      <Link
                        to="/services"
                        className="nav-dropdown-all"
                        onClick={() => setServicesOpen(false)}
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rest of nav links */}
              {navLinks.filter((l) => l.to !== '/').map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={isActive(link.to) ? 'nav-link-active' : ''}
                  style={{
                    color: isActive(link.to) ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: isActive(link.to) ? 700 : 600,
                    fontFamily: 'var(--font-heading)',
                    transition: 'color 0.2s',
                    position: 'relative',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={(e) => { if (!isActive(link.to)) e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { if (!isActive(link.to)) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:5043012052" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                <Phone style={{ width: 16, height: 16, fill: 'var(--navy-deep)' }} />
                (504) 301-2052
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', zIndex: 1001 }}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X style={{ width: 28, height: 28 }} /> : <Menu style={{ width: 28, height: 28 }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>

        {/* Services accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: isServicesActive ? 'var(--gold)' : 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: 0,
            }}
          >
            Services
            <ChevronDown
              style={{
                width: 20,
                height: 20,
                transition: 'transform 0.25s ease',
                transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          <div
            style={{
              overflow: 'hidden',
              maxHeight: mobileServicesOpen ? '400px' : '0px',
              transition: 'max-height 0.35s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: mobileServicesOpen ? '0.75rem' : '0',
            }}
          >
            <Link
              to="/services"
              style={{
                fontSize: '1rem',
                color: 'var(--gold)',
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
              }}
            >
              All Services
            </Link>
            {serviceLinks.map((svc) => (
              <Link
                key={svc.to}
                to={svc.to}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                }}
              >
                {svc.label}
              </Link>
            ))}
          </div>
        </div>

        {navLinks.filter((l) => l.to !== '/').map((link) => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
        <a href="tel:5043012052" className="btn-primary" style={{ marginTop: '1rem' }}>
          <Phone style={{ width: 18, height: 18, fill: 'var(--navy-deep)' }} />
          (504) 301-2052
        </a>
      </div>
    </>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="bg-dynamic-dark" style={{
      background: '#050D1A',
      color: 'var(--slate-400)',
      padding: '3.5rem 1.5rem 2rem'
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '2rem'
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem', textDecoration: 'none' }}>
              <img
                src="/images/logobes.png"
                alt="Big Easy Services Plumbing"
                style={{
                  height: 36,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Link>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Hispanic-owned, woman-owned & family-operated since 2005. Proudly serving the Greater New Orleans community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', fontSize: '0.9375rem', marginBottom: '1rem' }}>Quick Links</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services' },
              { to: '/our-promise', label: 'Our Promise' },
              { to: '/service-area', label: 'Service Area' },
              { to: '/credentials', label: 'Credentials' },
              { to: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ display: 'block', color: 'var(--slate-400)', textDecoration: 'none', fontSize: '0.875rem', padding: '0.25rem 0', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--slate-400)'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', fontSize: '0.9375rem', marginBottom: '1rem' }}>Services</h4>
            {[
              { to: '/services/plumbing', label: 'Plumbing' },
              { to: '/services/directional-boring', label: 'Directional Boring' },
              { to: '/services/utility-work', label: 'Utility Work' },
            ].map((svc) => (
              <Link
                key={svc.to}
                to={svc.to}
                style={{ display: 'block', fontSize: '0.875rem', padding: '0.25rem 0', color: 'var(--slate-400)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--slate-400)'}
              >
                {svc.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', fontSize: '0.9375rem', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              <a href="tel:5043012052" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>(504) 301-2052</a>
              <a href="mailto:info@big-ez.com" style={{ color: 'var(--slate-400)', textDecoration: 'none' }}>info@big-ez.com</a>
              <span>2451 Belle Chasse Hwy.<br />Terrytown, LA 70056</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', fontSize: '0.8125rem', color: 'var(--slate-500)'
        }}>
          <span>© {new Date().getFullYear()} Big Easy Services Of New Orleans, LLC. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
            <span>LMP #5923</span>
            <span>LMNGF #10369</span>
            <span>CAGE: 9V6R3</span>
            <span>UEI: EXLNLYSKJRJ4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// LAYOUT
// ============================================
export default function Layout() {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

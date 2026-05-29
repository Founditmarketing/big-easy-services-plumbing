/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { BRAND_INFO, LA_LICENSES, TRUST_BADGES, NAICS_CODES } from '../data';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function CredentialsPage() {
  useScrollReveal();

  return (
    <div>
      <SEOHead
        title="Licenses & Certifications"
        description="Big Easy Services Plumbing holds Louisiana Licensed Master Plumber (LMP #5923), Licensed Natural Gas Fitter (LMNGF #10369), and multiple certifications. Woman-owned, TWIC & DBIDS cleared. Verified credentials for Greater New Orleans."
        canonical="https://big-ez.com/credentials"
        jsonLd={[generateLocalBusinessSchema()]}
      />
      {/* ======== PHOTO HERO ======== */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/DSC03726.jpg"
            alt="Big Easy Services blueprints, hardhat, and professional equipment"
          />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="animate-fade-in-up">
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} /> Trust & Credentials
            </span>
          </div>
          <h1
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '1rem'
            }}
          >
            Licensed, Certified & Verified
          </h1>
          <p
            className="animate-fade-in-up delay-300"
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 auto'
            }}
          >
            Complete transparency in every credential, license, and certification. Verified and current.
          </p>
        </div>
      </section>

      {/* ======== LICENSES ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)' }}>
              State Licenses
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {LA_LICENSES.map((lic, i) => (
              <div key={lic.id} className="reveal card-hover" style={{
                background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)',
                padding: '1.5rem', transitionDelay: `${i * 80}ms`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(13,92,222,0.08)', padding: '0.5rem', borderRadius: 10 }}>
                    <Shield style={{ width: 22, height: 22, color: 'var(--cobalt)' }} />
                  </div>
                  <span style={{
                    background: 'var(--navy-deep)', color: 'var(--gold)',
                    fontSize: '0.8125rem', fontWeight: 800, padding: '0.3rem 0.875rem',
                    borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-heading)'
                  }}>
                    {lic.number}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.0625rem', color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
                  {lic.licenseName}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  {lic.scope}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--slate-400)', fontWeight: 600 }}>
                  {lic.authority}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== TRUST BADGES ======== */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)' }}>
              Certifications & Affiliations
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {TRUST_BADGES.map((badge, i) => {
              const colors: Record<string, { bg: string; icon: string }> = {
                safety: { bg: '#FEF3C7', icon: '#D97706' },
                credentials: { bg: '#DBEAFE', icon: '#2563EB' },
                affiliations: { bg: '#EDE9FE', icon: '#7C3AED' }
              };
              const c = colors[badge.category] || colors.credentials;
              return (
                <div key={badge.id} className="reveal card-hover" style={{
                  background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  transitionDelay: `${i * 60}ms`
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: c.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <CheckCircle2 style={{ width: 20, height: 20, color: c.icon }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--navy-deep)', marginBottom: '0.25rem' }}>
                      {badge.label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)', lineHeight: 1.6 }}>
                      {badge.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== AFFILIATED ORGANIZATIONS ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
              Affiliated Organizations
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--slate-500)', maxWidth: 500, margin: '0 auto' }}>
              Proud member of industry-leading associations.
            </p>
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
            <div style={{
              background: 'var(--off-white)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem',
              border: '1px solid var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <img src="/images/AWC-Logo_RGB-Web.png" alt="Association of Women Contractors" style={{ height: 80, width: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{
              background: 'var(--off-white)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem',
              border: '1px solid var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <img src="/images/image006-scaled.png" alt="Association of Women Contractors — 30 Years (1995–2025)" style={{ height: 90, width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ======== CORPORATE IDENTIFIERS ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
              Corporate Identifiers
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--slate-500)', maxWidth: 500, margin: '0 auto' }}>
              For government procurement officers and contracting officials — all identifiers verified and current in SAM.gov.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', maxWidth: 700, margin: '0 auto' }}>
            {[
              { label: 'CAGE Code', value: BRAND_INFO.identifiers.cage },
              { label: 'UEI (SAM)', value: BRAND_INFO.identifiers.uei },
              { label: 'LaPAC Vendor No.', value: BRAND_INFO.identifiers.lapac },
              { label: 'DUNS Number', value: BRAND_INFO.identifiers.duns }
            ].map((item, i) => (
              <div key={item.label} className="reveal" style={{
                background: 'var(--navy-deep)', borderRadius: 'var(--radius-lg)', padding: '1.5rem',
                textAlign: 'center', transitionDelay: `${i * 80}ms`
              }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1.375rem', fontWeight: 900, color: 'var(--gold)', letterSpacing: '0.05em' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== NAICS CODES ======== */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)' }}>
              NAICS Classifications
            </h2>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 900, margin: '0 auto' }}>
            {NAICS_CODES.map((naics, i) => (
              <div key={naics.code} className="reveal card-hover" style={{
                background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)',
                padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
                transitionDelay: `${i * 60}ms`
              }}>
                <div style={{
                  fontFamily: 'monospace', fontSize: '1.125rem', fontWeight: 900, color: 'var(--cobalt)',
                  background: 'rgba(13,92,222,0.06)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap', flexShrink: 0
                }}>
                  {naics.code}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--navy-deep)' }}>
                      {naics.title}
                    </span>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)', letterSpacing: '0.03em',
                      background: naics.relevance === 'Primary Code' ? 'rgba(250,204,21,0.12)' : 'rgba(148,163,184,0.1)',
                      color: naics.relevance === 'Primary Code' ? 'var(--gold-warm)' : 'var(--slate-400)'
                    }}>
                      {naics.relevance}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', lineHeight: 1.5 }}>{naics.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CLASSIFICATIONS ======== */}
      <section className="gradient-navy section-padding" style={{ padding: '3rem 1.5rem' }}>
        <div className="section-container reveal" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {BRAND_INFO.classifications.map((cl) => (
              <span key={cl} style={{
                border: '2px solid rgba(250,204,21,0.4)', color: 'var(--gold)',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem',
                padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)'
              }}>
                {cl}
              </span>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            Established {BRAND_INFO.established} &bull; President: {BRAND_INFO.president}
          </p>
        </div>
      </section>

      {/* ======== PHOTO CTA ======== */}
      <section className="photo-cta">
        <div className="photo-cta-bg">
          <img
            src="/images/DSC03595 (1).jpg"
            alt="Big Easy Services Plumbing van in front of headquarters"
          />
        </div>
        <div className="photo-cta-overlay" style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.9) 0%, rgba(245,158,11,0.95) 100%)' }} />
        <div className="photo-cta-content">
          <h2
            className="reveal"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 900,
              color: 'var(--navy-deep)',
              marginBottom: '1.25rem'
            }}
          >
            Ready to Work With a Trusted Partner?
          </h2>
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(11,34,64,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Licensed, insured, and committed to excellence. Let's get your project started.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5043012052" className="btn-navy">
              <Phone style={{ width: 18, height: 18 }} /> Call (504) 301-2052
            </a>
            <Link to="/contact" className="btn-navy" style={{ background: 'white', color: 'var(--navy-deep)' }}>
              Request a Quote <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

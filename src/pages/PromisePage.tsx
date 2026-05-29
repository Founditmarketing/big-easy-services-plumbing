/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  Banknote,
  Award,
  UserCheck,
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react';
import { IRONCLAD_GUARANTEES, BRAND_INFO } from '../data';

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

const getIcon = (name: string, size = 36) => {
  const s = { width: size, height: size, color: 'var(--gold)' };
  switch (name) {
    case 'Clock': return <Clock style={s} />;
    case 'Banknote': return <Banknote style={s} />;
    case 'Award': return <Award style={s} />;
    case 'UserCheck': return <UserCheck style={s} />;
    default: return <Sparkles style={s} />;
  }
};

export default function PromisePage() {
  useScrollReveal();

  return (
    <div>
      <SEOHead
        title="Our Guarantees & Promises"
        description="Big Easy Services Plumbing backs every job with 4 ironclad guarantees — $50 On-Time Guarantee, upfront pricing, licensed workmanship warranty, and a courtesy commitment. Serving Greater New Orleans since 2005."
        canonical="https://big-ez.com/our-promise"
        jsonLd={[generateLocalBusinessSchema()]}
      />
      {/* ======== PHOTO HERO ======== */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/Copy of DSC03873.jpg"
            alt="Big Easy Services crew working with professional pipe fusion equipment"
          />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="animate-fade-in-up">
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} /> Our Promise
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
            The Big Easy Code of Promises
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
            We don't just talk about quality — we put our money behind it. Four ironclad
            guarantees that protect every customer on every call.
          </p>
        </div>
      </section>

      {/* ======== GUARANTEES DETAIL ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          {IRONCLAD_GUARANTEES.map((g, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={g.id}
                className={isEven ? 'reveal-left' : 'reveal-right'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '3rem',
                  alignItems: 'center',
                  padding: '3rem 0',
                  borderBottom: i < IRONCLAD_GUARANTEES.length - 1 ? '1px solid var(--slate-200)' : 'none'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2.5rem',
                    alignItems: 'center'
                  }}
                  className="lg:!grid-cols-2"
                >
                  {/* Icon side */}
                  <div style={{ order: isEven ? 0 : 1, textAlign: 'center' }} className={isEven ? '' : 'lg:!order-2'}>
                    <div style={{
                      width: 100,
                      height: 100,
                      borderRadius: 20,
                      background: 'rgba(250,204,21,0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      {getIcon(g.iconName, 48)}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      background: 'var(--navy-deep)',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      padding: '0.375rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '0.5rem'
                    }}>
                      {g.badgeText}
                    </div>
                    <p style={{
                      fontStyle: 'italic',
                      color: 'var(--slate-500)',
                      fontSize: '0.9375rem',
                      marginTop: '0.5rem',
                      maxWidth: 300,
                      margin: '0.5rem auto 0'
                    }}>
                      {g.slogan}
                    </p>
                  </div>

                  {/* Content side */}
                  <div style={{ order: isEven ? 1 : 0 }} className={isEven ? '' : 'lg:!order-1'}>
                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.375rem, 3vw, 1.75rem)',
                      fontWeight: 900,
                      color: 'var(--navy-deep)',
                      marginBottom: '1rem'
                    }}>
                      {g.title}
                    </h2>
                    <p style={{
                      fontSize: '1.0625rem',
                      color: 'var(--slate-600)',
                      lineHeight: 1.8
                    }}>
                      {g.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======== MISSION STATEMENT ======== */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container reveal" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 900,
            color: 'var(--navy-deep)',
            marginBottom: '1.5rem'
          }}>
            Our Mission
          </h2>
          <blockquote style={{
            borderLeft: '4px solid var(--gold)',
            paddingLeft: '1.5rem',
            textAlign: 'left',
            fontStyle: 'italic',
            fontSize: '1.0625rem',
            color: 'var(--slate-600)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            "{BRAND_INFO.missionStatement}"
          </blockquote>
          <div style={{ marginBottom: '1.5rem' }}>
            <img
              src="/images/Copy of DSC03873.jpg"
              alt="Big Easy Services team members working with professional pipe fusion equipment"
              style={{
                width: '100%',
                maxWidth: 500,
                height: 'auto',
                borderRadius: 'var(--radius-xl)',
                margin: '0 auto 1.5rem',
                display: 'block',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}
            />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--navy-deep)' }}>
              {BRAND_INFO.president}
            </p>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>President, {BRAND_INFO.legalEntity}</p>
            <span style={{
              display: 'inline-block',
              marginTop: '0.75rem',
              background: 'rgba(250,204,21,0.12)',
              color: 'var(--gold-warm)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '0.25rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(250,204,21,0.2)'
            }}>
              Since {BRAND_INFO.established}
            </span>
          </div>
        </div>
      </section>

      {/* ======== PHOTO CTA ======== */}
      <section className="photo-cta">
        <div className="photo-cta-bg">
          <img
            src="/images/DSC03726.jpg"
            alt="Big Easy Services blueprints, hardhat, and professional equipment"
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
            Experience Our Promise Firsthand
          </h2>
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(11,34,64,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Licensed, insured, and committed to punctuality. Let's get your project started.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5043012052" className="btn-navy">
              <Phone style={{ width: 18, height: 18 }} /> Call (504) 301-2052
            </a>
            <Link to="/contact" className="btn-navy" style={{ background: 'white', color: 'var(--navy-deep)' }}>
              Schedule Service <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

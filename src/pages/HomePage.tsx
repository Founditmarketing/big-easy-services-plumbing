/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema, generateAggregateRatingSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ShieldCheck,
  Clock,
  Users,
  Phone,
  ArrowRight,
  Star,
  Award,
  Banknote,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { SERVICE_DETAILS } from '../serviceData';
import { IRONCLAD_GUARANTEES } from '../data';

/* ---------- animated counter hook ---------- */
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ---------- scroll reveal hook ---------- */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const GUARANTEE_ICONS: Record<string, React.ReactNode> = {
  Clock: <Clock style={{ width: 32, height: 32, color: 'var(--gold)' }} />,
  Banknote: <Banknote style={{ width: 32, height: 32, color: 'var(--gold)' }} />,
  Award: <Award style={{ width: 32, height: 32, color: 'var(--gold)' }} />,
  UserCheck: <UserCheck style={{ width: 32, height: 32, color: 'var(--gold)' }} />,
};

const HomePage = () => {
  useScrollReveal();

  const years = useCountUp(20, 1800);
  const stars = useCountUp(5, 1400);

  /* ---- GSAP hero opening animation ---- */
  const heroRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* 0 — curtain lifts from solid black */
      tl.fromTo(
        curtainRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 1.2, ease: 'power2.inOut' }
      );

      /* 0.2 — hero photo scales down from zoomed */
      tl.fromTo(
        bgImgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        0.2
      );

      /* 0.6 — badge drops in */
      tl.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' },
        0.6
      );

      /* 0.85 — headline rises in */
      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
        0.85
      );

      /* 1.15 — subtitle fades up */
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.15
      );

      /* 1.4 — CTA buttons pop in */
      tl.fromTo(
        ctaRef.current!.children,
        { y: 25, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' },
        1.4
      );

      /* 1.7 — trust badges stagger in */
      tl.fromTo(
        trustRef.current!.children,
        { y: 20, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.6)' },
        1.7
      );

      /* 2.1 — scroll indicator */
      tl.fromTo(
        scrollRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.1
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEOHead
        title="Licensed Master Plumber"
        description="Big Easy Services Plumbing — Licensed Master Plumber & Natural Gas Fitter serving Greater New Orleans since 2005. 24/7 emergency plumbing, gas line fitting, drain cleaning. Woman-owned. Call (504) 301-2052."
        canonical="https://bigeasyservicesplumbing.com/"
        jsonLd={[generateLocalBusinessSchema(), generateAggregateRatingSchema()]}
      />
      {/* ============================
          HERO — FULL VIEWPORT PHOTO
          ============================ */}
      <section className="hero-photo" ref={heroRef}>
        {/* GSAP curtain — starts solid black, fades out */}
        <div
          ref={curtainRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#050D1A',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        <div className="hero-photo-bg">
          <img
            ref={bgImgRef}
            src="/images/DSC03595 (1).jpg"
            alt="Big Easy Services Plumbing van in front of headquarters"
            style={{ opacity: 0 }}
          />
        </div>
        <div className="hero-photo-overlay" />

        <div className="hero-photo-content">
          <div ref={badgeRef} style={{ opacity: 0 }}>
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              Licensed Master Plumber — LMP #5923
            </span>
          </div>

          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            New Orleans' Trusted{' '}
            <span style={{ color: 'var(--gold)' }}>Licensed Master Plumber</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: 'var(--gold)',
              lineHeight: 1.3,
              marginBottom: '1.5rem',
              opacity: 0,
            }}
            ref={subRef}
          >
            The Plumbers You'd Trust in Your Own Mother's House.
          </p>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 600,
              margin: '0 auto 2.5rem',
            }}
          >
            20+ years serving Greater New Orleans. 24/7 emergency plumbing, gas line, and
            drain services — backed by our{' '}
            <strong style={{ color: 'var(--gold)' }}>$50 On-Time Guarantee</strong>.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}
          >
            <a href="tel:5043012052" className="btn-primary animate-pulse-glow" style={{ opacity: 0 }}>
              <Phone style={{ width: 18, height: 18 }} />
              Call Now — (504) 301-2052
            </a>
            <Link to="/contact" className="btn-secondary" style={{ opacity: 0 }}>
              Book Online
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            ref={trustRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              justifyContent: 'center',
            }}
          >
            {[
              { icon: <ShieldCheck style={{ width: 20, height: 20, color: 'var(--gold)' }} />, text: 'Licensed & Insured' },
              { icon: <Clock style={{ width: 20, height: 20, color: 'var(--gold)' }} />, text: '$50 On-Time Guarantee' },
              { icon: <Users style={{ width: 20, height: 20, color: 'var(--gold)' }} />, text: 'Woman-Owned Business' },
            ].map((item) => (
              <div
                key={item.text}
                className="glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.9)',
                  whiteSpace: 'nowrap',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  opacity: 0,
                }}
              >
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            opacity: 0,
          }}
        >
          <div
            className="animate-bounce-subtle"
            style={{
              width: 28,
              height: 44,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: 4,
                height: 10,
                borderRadius: 2,
                background: 'var(--gold)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ============================
          STATS COUNTER BAR
          ============================ */}
      <section className="stats-bar">
        <div className="stats-grid">
          {[
            { ref: years.ref, value: `${years.value}+`, label: 'Years Experience', delay: 0 },
            { ref: null, value: '24/7', label: 'Emergency Service', delay: 100 },
            { ref: null, value: '$50', label: 'On-Time Guarantee', delay: 200 },
            { ref: stars.ref, value: `${stars.value}★`, label: 'Google Rating', delay: 300 },
          ].map((stat, i) => (
            <div
              key={stat.label}
              ref={stat.ref}
              className="stat-item"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          SERVICES — PHOTO CARDS
          ============================ */}
      <section className="section-padding bg-dynamic-light" style={{ background: 'var(--off-white)' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title" style={{ color: 'var(--navy-deep)' }}>
              Professional Plumbing Services
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From emergency repairs to commercial build-outs, our licensed team delivers expert solutions backed by our ironclad guarantees.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {SERVICE_DETAILS.slice(0, 6).map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="photo-card reveal"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Photo */}
                  <div className="photo-card-img">
                    <img src={service.image} alt={service.title} />
                    {/* Icon overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(11, 34, 64, 0.85)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Icon style={{ width: 22, height: 22, color: service.color }} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="photo-card-body">
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--navy-deep)',
                        marginBottom: '0.375rem',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--slate-500)',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                        flex: 1,
                      }}
                    >
                      {service.shortDescription}
                    </p>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: service.color,
                      }}
                    >
                      Learn More <ArrowRight style={{ width: 16, height: 16 }} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          PHOTO-TEXT SPLIT — CREW
          ============================ */}
      <section className="split-section">
        <div className="split-photo">
          <img
            src="/images/Copy of DSC03873.jpg"
            alt="Big Easy Services crew working with professional pipe fusion equipment"
          />
        </div>
        <div className="split-content" style={{ background: 'var(--navy-deep)' }}>
          <div className="reveal-right">
            <span className="section-label">Who We Are</span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 900,
                color: 'var(--white)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Built on Integrity.<br />
              <span style={{ color: 'var(--gold)' }}>Driven by Excellence.</span>
            </h2>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              For over 20 years, Big Easy Services Plumbing has been the trusted name in Greater
              New Orleans. We're a woman-owned, family-operated company led by President
              Paula D. Baldwin, delivering licensed expertise with the values of honesty,
              punctuality, and craftsmanship on every call.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Licensed Master Plumber — LMP #5923', 'Licensed Natural Gas Fitter — LMNGF #10369', 'Woman-Owned & Hispanic-Owned', 'TWIC® & DBIDS Cleared Crews'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <CheckCircle2 style={{ width: 18, height: 18, color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/credentials" className="btn-outline-gold">
              View Our Credentials <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          PHOTO-TEXT SPLIT — JOBSITE (REVERSED)
          ============================ */}
      <section className="split-section reverse">
        <div className="split-photo">
          <img
            src="/images/DSC03752.jpg"
            alt="Big Easy Services crew and heavy equipment on a Greater New Orleans jobsite"
          />
        </div>
        <div className="split-content" style={{ background: 'var(--white)' }}>
          <div className="reveal-left">
            <span className="section-label">Our Reach</span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 900,
                color: 'var(--navy-deep)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Serving Greater<br />
              <span style={{ color: 'var(--cobalt)' }}>New Orleans</span>
            </h2>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--slate-600)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              Headquartered in Terrytown with rapid-dispatch coverage across Jefferson Parish,
              Orleans Parish, and St. Bernard Parish. Average emergency response time under 30 minutes
              in our active zones.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              {['Terrytown', 'Gretna', 'Belle Chasse', 'Downtown NOLA', 'Metairie', 'Marrero'].map((area) => (
                <span
                  key={area}
                  style={{
                    padding: '0.375rem 1rem',
                    background: 'rgba(13, 92, 222, 0.06)',
                    border: '1px solid rgba(13, 92, 222, 0.12)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--cobalt)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
            <Link to="/service-area" className="btn-navy">
              Check Your Area <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          GUARANTEES — DARK + BOLD
          ============================ */}
      <section className="section-padding bg-dynamic-dark" style={{ background: 'var(--navy-deep)' }}>

        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <span className="section-label">
              <ShieldCheck style={{ width: 14, height: 14 }} />
              Our Promise
            </span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>
              The Big Easy Code of Promises
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto 3rem', lineHeight: 1.7 }}>
              We don't just talk about quality — we put our money behind it.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {IRONCLAD_GUARANTEES.map((g, idx) => (
              <div
                key={g.id}
                className="reveal"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.875rem',
                  transitionDelay: `${idx * 120}ms`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(250,204,21,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(250,204,21,0.2)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(250,204,21,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {GUARANTEE_ICONS[g.iconName] || (
                    <ShieldCheck style={{ width: 32, height: 32, color: 'var(--gold)' }} />
                  )}
                </div>

                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {g.badgeText}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--white)',
                  }}
                >
                  {g.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '3rem' }}>
            <Link to="/our-promise" className="btn-outline-gold">
              Learn More About Our Promises
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          PHOTO CTA BANNER
          ============================ */}
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
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 900,
              color: 'var(--navy-deep)',
              marginBottom: '1.25rem',
            }}
          >
            Ready to Experience the Big Easy Difference?
          </h2>
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(11,34,64,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Licensed, insured, and committed to punctuality. Let's get your project started.
          </p>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <a href="tel:5043012052" className="btn-navy">
              <Phone style={{ width: 18, height: 18 }} />
              Call Now — (504) 301-2052
            </a>
            <Link to="/contact" className="btn-navy" style={{ background: 'var(--navy-mid)' }}>
              Schedule Service
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

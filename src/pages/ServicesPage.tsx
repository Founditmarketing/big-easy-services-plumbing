/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  Zap,
  Award,
} from 'lucide-react';
import { SERVICE_DETAILS } from '../serviceData';

const ServicesPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title="Professional Plumbing Services"
        description="Big Easy Services Plumbing offers expert plumbing services in Greater New Orleans — emergency repairs, gas line fitting, drain cleaning, standby generator connections, backflow testing, and commercial plumbing. Licensed Master Plumber. Call (504) 301-2052."
        canonical="https://bigeasyservicesplumbing.com/services"
        jsonLd={[generateLocalBusinessSchema()]}
      />
      {/* ============================
          PHOTO HERO
          ============================ */}
      <section className="page-hero">
        <img
          src="/images/DSC03752.jpg"
          alt="Professional plumbing services"
          className="page-hero-bg"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-label animate-fade-in-up">Our Expertise</span>
          <h1 className="animate-fade-in-up delay-200">
            Professional Plumbing Services
          </h1>
          <p className="animate-fade-in-up delay-300">
            From emergency repairs to large-scale commercial projects, our licensed team delivers
            expert solutions with integrity and our signature punctuality guarantee.
          </p>
        </div>
      </section>

      {/* ============================
          SERVICE CARDS GRID
          ============================ */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem',
            }}
          >
            {SERVICE_DETAILS.slice(0, 6).map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="photo-card reveal"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Card Image */}
                  <div className="photo-card-img">
                    <img
                      src={service.image}
                      alt={service.title}
                    />
                    {/* Icon overlay badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.75rem',
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-full)',
                        background: service.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Icon style={{ width: 24, height: 24, color: '#fff' }} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="photo-card-body">
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.375rem',
                        fontWeight: 800,
                        color: 'var(--navy-deep)',
                        margin: 0,
                      }}
                    >
                      {service.title}
                    </h2>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontStyle: 'italic',
                        color: 'var(--slate-400)',
                        margin: 0,
                      }}
                    >
                      {service.tagline}
                    </p>

                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--slate-600)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {service.shortDescription}
                    </p>

                    {/* Feature checklist */}
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      {service.features.slice(0, 3).map((feat) => (
                        <li
                          key={feat.title}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--slate-700)',
                          }}
                        >
                          <CheckCircle2
                            style={{ width: 16, height: 16, color: 'var(--emerald)', flexShrink: 0 }}
                          />
                          {feat.title}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
                    <Link
                      to={`/services/${service.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--cobalt)',
                        textDecoration: 'none',
                        marginTop: 'auto',
                        transition: 'gap var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '0.625rem';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '0.375rem';
                      }}
                    >
                      Learn More
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          WHY CHOOSE US — SPLIT SECTION
          ============================ */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container split-section">
          {/* Left — Photo */}
          <div className="split-photo reveal-left">
            <img
              src="/images/Copy of DSC03873.jpg"
              alt="Big Easy Services team at work"
            />
          </div>

          {/* Right — Content */}
          <div className="split-content reveal-right">
            <span className="section-label">Why Choose Us</span>
            <h2
              className="section-title"
              style={{ color: 'var(--navy-deep)', marginBottom: '1.25rem' }}
            >
              Why Choose Big Easy Services?
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--slate-600)',
                lineHeight: 1.75,
                maxWidth: 540,
              }}
            >
              For over 20 years, Big Easy Services Plumbing has been the trusted name in Greater
              New Orleans plumbing. We're a woman-owned, family-operated company led by President
              Paula D. Baldwin, delivering licensed expertise with the values of honesty,
              punctuality, and craftsmanship on every call — residential or commercial.
            </p>

            {/* Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
                marginTop: '2rem',
              }}
            >
              {[
                {
                  icon: <Award style={{ width: 28, height: 28, color: 'var(--gold)' }} />,
                  value: '20+',
                  label: 'Years Experience',
                },
                {
                  icon: <Zap style={{ width: 28, height: 28, color: 'var(--gold)' }} />,
                  value: '24/7',
                  label: 'Emergency Service',
                },
                {
                  icon: <Clock style={{ width: 28, height: 28, color: 'var(--gold)' }} />,
                  value: '$50',
                  label: 'On-Time Guarantee',
                },
                {
                  icon: <ShieldCheck style={{ width: 28, height: 28, color: 'var(--gold)' }} />,
                  value: 'LMP',
                  label: 'Licensed & Insured',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-dark"
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {stat.icon}
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: 'var(--white)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          PHOTO CTA
          ============================ */}
      <section className="photo-cta">
        <img
          src="/images/DSC03726.jpg"
          alt="Plumber ready for service"
          className="photo-cta-bg"
        />
        <div className="photo-cta-overlay" />
        <div className="photo-cta-content reveal">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 900,
              color: 'var(--white)',
              marginBottom: '1rem',
            }}
          >
            Need a Plumber? We're Ready.
          </h2>

          <p
            style={{
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 500,
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            Call us day or night for fast, honest plumbing service backed by our $50
            on-time guarantee.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a href="tel:5043012052" className="btn-primary">
              <Phone style={{ width: 18, height: 18 }} />
              Call (504) 301-2052
            </a>
            <Link to="/contact" className="btn-secondary">
              Contact Us
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

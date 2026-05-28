/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  MapPin,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { getServiceBySlug } from '../serviceData';
import { SALP_DATA, CITY_DISPLAY_NAMES, CITY_SLUGS } from '../seo/salpContent';
import SEOHead from '../components/SEOHead';
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../seo/schema';

const ServiceCityPage = () => {
  const { slug, city } = useParams<{ slug: string; city: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const content = slug && city ? SALP_DATA[slug]?.[city] : undefined;
  const cityName = city ? CITY_DISPLAY_NAMES[city] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, city]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [slug, city]);

  if (!service || !content || !cityName) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = service.icon;
  const otherCities = CITY_SLUGS.filter((c) => c !== city);

  const trustSignals = [
    { label: 'Licensed & Insured', icon: Shield },
    { label: '$50 On-Time Guarantee', icon: CheckCircle2 },
    { label: 'Woman-Owned', icon: CheckCircle2 },
    { label: '20+ Years Experience', icon: CheckCircle2 },
  ];

  return (
    <div>
      <SEOHead
        title={`${service.title} in ${cityName}, LA`}
        description={content.intro.substring(0, 155)}
        canonical={`https://bigeasyservicesplumbing.com/services/${slug}/${city}`}
        jsonLd={[
          generateServiceSchema(service, cityName),
          generateFAQSchema(content.faqs),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${slug}` },
            { name: cityName, url: `/services/${slug}/${city}` },
          ]),
        ]}
      />

      {/* ===== FULL PHOTO HERO ===== */}
      <section className="page-hero" style={{ paddingBlockEnd: '5rem' }}>
        <div className="page-hero-bg">
          <img src={service.image} alt={`${service.title} in ${cityName}`} />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#FACC15')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
              }
            >
              Home
            </Link>
            <ChevronRight
              size={14}
              style={{ color: 'rgba(255,255,255,0.4)' }}
            />
            <Link
              to="/services"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#FACC15')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
              }
            >
              Services
            </Link>
            <ChevronRight
              size={14}
              style={{ color: 'rgba(255,255,255,0.4)' }}
            />
            <Link
              to={`/services/${slug}`}
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = '#FACC15')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
              }
            >
              {service.title}
            </Link>
            <ChevronRight
              size={14}
              style={{ color: 'rgba(255,255,255,0.4)' }}
            />
            <span style={{ color: '#FACC15', fontWeight: 600 }}>
              {cityName}
            </span>
          </nav>

          {/* Icon badge */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: `${service.color}26`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <ServiceIcon
              style={{ width: 32, height: 32, color: service.color }}
            />
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            {service.title} in {cityName}, LA
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontStyle: 'italic',
              color: '#FACC15',
              fontSize: '1.125rem',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            {service.tagline}
          </p>

          {/* CTA */}
          <Link to="/contact" className="btn-primary">
            {service.ctaText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">Local Expertise</span>
            <h2
              className="section-title reveal"
              style={{ color: 'var(--navy-deep)' }}
            >
              {service.title} in {cityName}
            </h2>
          </div>

          <p
            className="reveal"
            style={{
              fontSize: '1.0625rem',
              color: 'var(--slate-600)',
              lineHeight: 1.8,
              maxWidth: 800,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            {content.intro}
          </p>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section
        className="section-padding"
        style={{ background: 'var(--off-white)' }}
      >
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">
              Why Big Easy Services
            </span>
            <h2
              className="section-title reveal"
              style={{ color: 'var(--navy-deep)' }}
            >
              Why Choose Us for {service.title} in {cityName}?
            </h2>
          </div>

          <p
            className="reveal"
            style={{
              fontSize: '1.0625rem',
              color: 'var(--slate-600)',
              lineHeight: 1.8,
              maxWidth: 800,
              margin: '0 auto 3rem',
              textAlign: 'center',
            }}
          >
            {content.body}
          </p>

          {/* NAP Block */}
          <div
            className="reveal"
            style={{
              background: '#fff',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem 2rem',
              maxWidth: 480,
              margin: '0 auto 2.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--navy-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={24} style={{ color: '#FACC15' }} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.0625rem',
                  color: 'var(--navy-deep)',
                  marginBottom: '0.375rem',
                }}
              >
                Big Easy Services Plumbing
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--slate-500)',
                  lineHeight: 1.65,
                  marginBottom: '0.25rem',
                }}
              >
                2451 Belle Chasse Hwy.
                <br />
                Terrytown, LA 70056
              </p>
              <a
                href="tel:5043012052"
                style={{
                  fontSize: '0.9375rem',
                  color: service.color,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                (504) 301-2052
              </a>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--slate-400)',
                  fontWeight: 500,
                }}
              >
                LMP #5923
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {trustSignals.map((signal, idx) => {
              const SignalIcon = signal.icon;
              return (
                <div
                  key={signal.label}
                  className="reveal"
                  style={{
                    background: '#fff',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: `${service.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SignalIcon
                      size={18}
                      style={{ color: service.color }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: 'var(--navy-deep)',
                    }}
                  >
                    {signal.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">Common Questions</span>
            <h2
              className="section-title reveal"
              style={{ color: 'var(--navy-deep)' }}
            >
              {service.title} FAQs for {cityName}
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {content.faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="reveal"
                style={{
                  background: '#fff',
                  border: '1px solid var(--slate-200)',
                  borderLeft: `4px solid ${service.color}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--navy-deep)',
                    marginBottom: '0.625rem',
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--slate-500)',
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED CITY LINKS ===== */}
      <section className="section-padding gradient-navy">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">Service Areas</span>
            <h2
              className="section-title reveal"
              style={{ color: '#fff' }}
            >
              {service.title} in Other Cities
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {otherCities.map((otherCity, idx) => (
              <Link
                key={otherCity}
                to={`/services/${slug}/${otherCity}`}
                className="glass card-hover reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1.5rem 1rem',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `${service.color}26`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}
                >
                  <MapPin
                    size={24}
                    style={{ color: service.color }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    color: '#fff',
                    lineHeight: 1.3,
                  }}
                >
                  {CITY_DISPLAY_NAMES[otherCity]}
                </span>
                <span
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#FACC15',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  View Details <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHOTO CTA ===== */}
      <section className="photo-cta">
        <div className="photo-cta-bg">
          <img src={service.image} alt={`${service.title} in ${cityName}`} />
        </div>
        <div className="photo-cta-overlay" />
        <div className="photo-cta-content">
          <h2
            className="reveal"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            Need {service.title} in {cityName}?
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 560,
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            Contact our licensed team today for upfront pricing, fast response
            times, and workmanship you can trust.
          </p>
          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="tel:5043012052" className="btn-primary">
              <Phone size={18} />
              (504) 301-2052
            </a>
            <Link to="/contact" className="btn-outline-gold">
              Request a Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCityPage;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../seo/schema';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Shield, Phone, ArrowRight, ChevronRight, MapPin } from 'lucide-react';
import { getServiceBySlug, SERVICE_DETAILS } from '../serviceData';
import { LA_LICENSES } from '../data';
import { CITY_DISPLAY_NAMES, CITY_SLUGS } from '../seo/salpContent';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = service.icon;
  const relatedLicenses = LA_LICENSES.filter((lic) =>
    service.relatedLicenseIds.includes(lic.id)
  );
  const otherServices = SERVICE_DETAILS.filter((s) => s.slug !== service.slug);

  return (
    <div>
      <SEOHead
        title={service.title}
        description={service.longDescription.substring(0, 155)}
        canonical={`https://bigeasyservicesplumbing.com/services/${service.slug}`}
        jsonLd={[
          generateServiceSchema(service),
          generateFAQSchema(service.faqs),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
        ]}
      />
      {/* ===== FULL PHOTO HERO ===== */}
      <section className="page-hero" style={{ paddingBlockEnd: '5rem' }}>
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url(${service.image})` }}
        />
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
            }}
          >
            <Link
              to="/"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FACC15')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              Home
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <Link
              to="/services"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FACC15')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              Services
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ color: '#FACC15', fontWeight: 600 }}>{service.title}</span>
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
            <ServiceIcon style={{ width: 32, height: 32, color: service.color }} />
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
            {service.title}
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

          {/* Long description */}
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              maxWidth: 720,
              marginBottom: '2rem',
            }}
          >
            {service.longDescription}
          </p>

          {/* CTA */}
          <Link to="/contact" className="btn-primary">
            {service.ctaText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">What We Offer</span>
            <h2 className="section-title reveal" style={{ color: 'var(--navy-deep)' }}>
              Our {service.title} Services
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {service.features.map((feature, idx) => (
              <div
                key={feature.title}
                className="reveal"
                style={{
                  background: '#fff',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  transitionDelay: `${idx * 80}ms`,
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,34,64,0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
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
                    <CheckCircle2 size={20} style={{ color: service.color }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '1.0625rem',
                        color: 'var(--navy-deep)',
                        marginBottom: '0.375rem',
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--slate-500)',
                        lineHeight: 1.65,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US — SPLIT LAYOUT ===== */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              alignItems: 'start',
            }}
            className="wcu-grid"
          >
            {/* Left column */}
            <div className="reveal-left">
              <span className="section-label">Trusted Experts</span>
              <h2
                className="section-title"
                style={{ color: 'var(--navy-deep)', marginBottom: '2rem' }}
              >
                Why Choose Us for {service.title}?
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.whyChooseUs.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--slate-200)',
                    }}
                  >
                    <CheckCircle2
                      size={20}
                      style={{ color: '#FACC15', flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--slate-700)',
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — Licenses */}
            <div className="reveal-right">
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: 'var(--navy-deep)',
                  marginBottom: '1.5rem',
                }}
              >
                Relevant Licenses &amp; Credentials
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedLicenses.map((license) => (
                  <div
                    key={license.id}
                    style={{
                      background: '#fff',
                      border: '1px solid var(--slate-200)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(11,34,64,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--navy-deep)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Shield size={20} style={{ color: '#FACC15' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '0.375rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 700,
                              fontSize: '0.9375rem',
                              color: 'var(--navy-deep)',
                            }}
                          >
                            {license.licenseName}
                          </span>
                          <span
                            style={{
                              background: 'var(--navy-deep)',
                              color: '#FACC15',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              fontFamily: 'var(--font-heading)',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {license.number}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '0.8125rem',
                            color: 'var(--slate-500)',
                            lineHeight: 1.55,
                            marginBottom: '0.25rem',
                          }}
                        >
                          {license.scope}
                        </p>
                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--slate-400)',
                            fontWeight: 500,
                          }}
                        >
                          {license.authority}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .wcu-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">Got Questions?</span>
            <h2 className="section-title reveal" style={{ color: 'var(--navy-deep)' }}>
              Frequently Asked Questions
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
            {service.faqs.map((faq, idx) => (
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

      {/* ===== RELATED SERVICES ===== */}
      <section className="section-padding gradient-navy">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">More Solutions</span>
            <h2 className="section-title reveal" style={{ color: '#fff' }}>
              Explore More Services
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {otherServices.map((other, idx) => {
              const OtherIcon = other.icon;
              return (
                <Link
                  key={other.slug}
                  to={`/services/${other.slug}`}
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
                      background: `${other.color}26`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.875rem',
                    }}
                  >
                    <OtherIcon style={{ width: 24, height: 24, color: other.color }} />
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
                    {other.title}
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
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICE BY CITY ===== */}
      <section className="section-padding gradient-navy">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label reveal">Service Areas</span>
            <h2 className="section-title reveal" style={{ color: '#fff' }}>
              {service.title} By City
            </h2>
            <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '1rem auto 0' }}>
              We proudly serve these Greater New Orleans communities with licensed {service.title.toLowerCase()} expertise.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {CITY_SLUGS.map((citySlug, idx) => (
              <Link
                key={citySlug}
                to={`/services/${service.slug}/${citySlug}`}
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
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${service.color}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                  <MapPin size={24} style={{ color: service.color }} />
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9375rem', color: '#fff', lineHeight: 1.3 }}>
                  {CITY_DISPLAY_NAMES[citySlug]}
                </span>
                <span style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#FACC15', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Details <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHOTO CTA ===== */}
      <section className="photo-cta">
        <div
          className="photo-cta-bg"
          style={{ backgroundImage: `url(${service.image})` }}
        />
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
            Ready for {service.title}?
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
            Contact our licensed team today for upfront pricing, fast response times, and
            workmanship you can trust.
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

export default ServiceDetailPage;

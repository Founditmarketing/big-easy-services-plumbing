/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { BRAND_INFO, NEW_ORLEANS_ZIPS, type ServiceAreaZip } from '../data';

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

export default function ServiceAreaPage() {
  useScrollReveal();
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<ServiceAreaZip | null>(null);
  const [checked, setChecked] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
    setResult(NEW_ORLEANS_ZIPS.find((z) => z.zip === zip.trim()) || null);
  };

  return (
    <div>
      <SEOHead
        title="Service Area — Greater New Orleans"
        description="Big Easy Services Plumbing serves Greater New Orleans — Jefferson Parish, Orleans Parish, and St. Bernard Parish. Rapid-dispatch emergency plumbing in Terrytown, Gretna, Metairie, Belle Chasse, Downtown NOLA & more. Call (504) 301-2052."
        canonical="https://bigeasyservicesplumbing.com/service-area"
        jsonLd={[generateLocalBusinessSchema()]}
      />
      {/* ======== PHOTO HERO ======== */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/DSC03752.jpg"
            alt="Big Easy Services crew and heavy equipment on a Greater New Orleans jobsite"
          />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="animate-fade-in-up">
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>
              <MapPin style={{ width: 14, height: 14 }} /> Coverage Area
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
            Serving Greater New Orleans
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
            Rapid-response emergency dispatch and scheduled service throughout Jefferson,
            Orleans, and St. Bernard parishes.
          </p>
        </div>
      </section>

      {/* ======== ZIP CHECKER ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container reveal" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>
            Check Your Coverage
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--slate-500)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Enter your ZIP code to see dispatch availability and estimated response times in your area.
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: 420, margin: '0 auto' }}>
            <input
              className="form-input"
              type="text"
              placeholder="Enter ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
              maxLength={5}
              required
              style={{ flex: 1, fontWeight: 700, letterSpacing: '0.05em', fontSize: '1.125rem', textAlign: 'center' }}
              id="zip-checker-input"
            />
            <button type="submit" className="btn-navy" style={{ whiteSpace: 'nowrap' }}>Check Area</button>
          </form>

          {checked && (
            <div style={{ marginTop: '1.25rem', textAlign: 'left' }} className="animate-scale-in">
              {result ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-heading)', fontSize: '1.125rem' }}>
                      {result.neighborhood}
                    </span>
                    <span style={{ background: '#059669', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                      ● {result.status === 'active-dispatch' ? 'Active Dispatch' : 'Standard Route'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                    Coverage confirmed! Estimated response: <strong>{result.deliveryTime}</strong>
                  </p>
                  <a href="tel:5043012052" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 700, textDecoration: 'none' }}>
                    <Phone style={{ width: 14, height: 14 }} /> Call for Immediate Dispatch →
                  </a>
                </div>
              ) : (
                <div style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                  <span style={{ fontWeight: 700, color: '#9A3412', fontSize: '1rem' }}>Scheduled Service Available</span>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginTop: '0.375rem' }}>
                    This ZIP is outside our rapid-dispatch zone but is covered on our scheduled routes. Call us to book.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ======== ACTIVE DISPATCH ZONES ======== */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
              Active Dispatch Zones
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--slate-500)' }}>
              Our coverage areas with estimated response times
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {NEW_ORLEANS_ZIPS.map((zone, i) => (
              <div
                key={zone.zip}
                className="reveal card-hover"
                style={{
                  background: 'white',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  transitionDelay: `${i * 60}ms`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--navy-deep)' }}>
                    {zone.zip}
                  </span>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: zone.status === 'active-dispatch' ? '#34D399' : '#94A3B8',
                    display: 'inline-block', boxShadow: zone.status === 'active-dispatch' ? '0 0 6px rgba(52,211,153,0.5)' : 'none'
                  }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--slate-700)', marginBottom: '0.25rem' }}>
                  {zone.neighborhood}
                </div>
                <div style={{ fontSize: '0.8125rem', color: zone.status === 'active-dispatch' ? '#059669' : 'var(--slate-400)', fontWeight: 600 }}>
                  {zone.deliveryTime}
                </div>
                <span style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: zone.status === 'active-dispatch' ? 'rgba(5,150,105,0.08)' : 'rgba(148,163,184,0.1)',
                  color: zone.status === 'active-dispatch' ? '#059669' : 'var(--slate-400)'
                }}>
                  {zone.status === 'active-dispatch' ? 'Active Dispatch' : 'Standard Route'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ABOUT + DISPATCH HQ ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'start' }} className="lg:!grid-cols-2">
            <div className="reveal-left">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--navy-deep)', marginBottom: '1rem' }}>
                About Our Service Area
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Big Easy Services Plumbing is headquartered in Terrytown, Louisiana, providing a strategic central
                position for rapid dispatch across the Greater New Orleans metro. We service residential, commercial,
                and government clients throughout Jefferson Parish, Orleans Parish, and St. Bernard Parish.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--slate-600)', lineHeight: 1.8 }}>
                Our active-dispatch zones receive average response times of 20-40 minutes for emergency calls.
                Standard-route zones are covered through scheduled service blocks with reliable appointment windows.
                No matter where you are in the GNO metro, we're ready to help.
              </p>
              <img
                src="/images/DSC03752.jpg"
                alt="Big Easy Services crew and heavy equipment on a jobsite in the Greater New Orleans area"
                style={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                  marginTop: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            <div className="reveal-right" style={{
              background: 'var(--navy-deep)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              color: 'white'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.125rem', marginBottom: '1.25rem' }}>
                Dispatch Headquarters
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin style={{ width: 18, height: 18, color: '#34D399' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Address</div>
                    <div style={{ fontWeight: 700 }}>2451 Belle Chasse Hwy.<br />Terrytown, LA 70056</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(250,204,21,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone style={{ width: 18, height: 18, color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>24/7 Dispatch</div>
                    <a href="tel:5043012052" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none' }}>(504) 301-2052</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail style={{ width: 18, height: 18, color: '#60A5FA' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Email</div>
                    <a href="mailto:info@big-ez.com" style={{ color: 'white', textDecoration: 'none' }}>info@big-ez.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              marginBottom: '1rem'
            }}
          >
            In Our Service Area? Let's Get Started.
          </h2>
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(11,34,64,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Call for immediate dispatch or schedule your service online.
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { generateLocalBusinessSchema } from '../seo/schema';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

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

export default function ContactPage() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', serviceType: 'emergency',
    address: '', details: '', promo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div>
      <SEOHead
        title="Contact Us — (504) 301-2052"
        description="Contact Big Easy Services Plumbing for 24/7 emergency plumbing, gas line fitting, drain cleaning, and more in Greater New Orleans. Call (504) 301-2052 or fill out our online service request form."
        canonical="https://bigeasyservicesplumbing.com/contact"
        jsonLd={[generateLocalBusinessSchema()]}
      />
      {/* ======== PHOTO HERO ======== */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/images/DSC03595 (1).jpg"
            alt="Big Easy Services Plumbing van in front of headquarters"
          />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="animate-fade-in-up">
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>
              <Phone style={{ width: 14, height: 14 }} /> Get in Touch
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
            Get in Touch
          </h1>
          <p
            className="animate-fade-in-up delay-300"
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto'
            }}
          >
            Fill out the form or call us directly. We respond to all inquiries within 30 minutes during business hours.
          </p>
        </div>
      </section>

      {/* ======== CONTACT CONTENT ======== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', maxWidth: 1050, margin: '0 auto' }} className="lg:!grid-cols-5">

            {/* Form */}
            <div className="reveal-left lg:col-span-3" style={{
              background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem',
              boxShadow: 'var(--shadow-lg)', border: '1px solid var(--slate-200)'
            }}>
              {submitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center', gap: '1rem' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 style={{ width: 40, height: 40, color: '#059669' }} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--navy-deep)' }}>
                    Request Received!
                  </h2>
                  <p style={{ color: 'var(--slate-500)', fontSize: '1rem', maxWidth: 360 }}>
                    A licensed technician will reach out shortly. For immediate emergencies, call{' '}
                    <a href="tel:5043012052" style={{ color: 'var(--cobalt)', fontWeight: 700, textDecoration: 'none' }}>(504) 301-2052</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.375rem', color: 'var(--navy-deep)', marginBottom: '1.5rem' }}>
                    Service Request Form
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="Your name" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required id="contact-name" />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" type="tel" placeholder="(504) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required id="contact-phone" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="you@email.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} id="contact-email" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Service Needed</label>
                    <select className="form-input" value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })} id="contact-service">
                      <option value="emergency">🚨 Emergency Repair</option>
                      <option value="gas">⚠️ Gas Line Service</option>
                      <option value="residential">🏠 Residential Plumbing</option>
                      <option value="commercial">🏢 Commercial Service</option>
                      <option value="generator">⚡ Generator Connection</option>
                      <option value="backflow">🔧 Backflow Testing</option>
                      <option value="drain">🔧 Drain Cleaning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Service Address</label>
                    <input className="form-input" placeholder="Street, city, state, ZIP" value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })} id="contact-address" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Details</label>
                    <textarea className="form-input" rows={4} placeholder="Describe the issue or service needed..."
                      value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      style={{ resize: 'vertical' }} id="contact-details" />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Promo Code <span style={{ fontWeight: 400, textTransform: 'none', color: 'var(--slate-400)' }}>(optional)</span></label>
                    <input className="form-input" placeholder="e.g. BF-GOLD-50OFF" value={formData.promo}
                      onChange={(e) => setFormData({ ...formData, promo: e.target.value })} id="contact-promo" />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                    <Send style={{ width: 18, height: 18 }} /> Request Service
                  </button>
                </form>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="reveal-right lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Contact Info */}
              <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--slate-200)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--navy-deep)', marginBottom: '1.25rem' }}>
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <a href="tel:5043012052" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(250,204,21,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone style={{ width: 18, height: 18, color: 'var(--gold-warm)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600 }}>Call Us 24/7</div>
                      <div style={{ color: 'var(--navy-deep)', fontWeight: 700, fontSize: '1rem' }}>(504) 301-2052</div>
                    </div>
                  </a>
                  <a href="mailto:info@big-ez.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail style={{ width: 18, height: 18, color: '#3B82F6' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600 }}>Email</div>
                      <div style={{ color: 'var(--navy-deep)', fontWeight: 700 }}>info@big-ez.com</div>
                    </div>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin style={{ width: 18, height: 18, color: '#059669' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600 }}>Location</div>
                      <div style={{ color: 'var(--navy-deep)', fontWeight: 700, lineHeight: 1.5 }}>2451 Belle Chasse Hwy.<br />Terrytown, LA 70056</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--slate-200)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--navy-deep)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock style={{ width: 16, height: 16, color: 'var(--cobalt)' }} /> Business Hours
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.875rem' }}>
                  {[
                    { day: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'Emergency Only' },
                    { day: '24/7 Emergency', hours: 'Always Available' }
                  ].map(({ day, hours }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderBottom: '1px solid var(--slate-200)' }}>
                      <span style={{ color: 'var(--slate-500)' }}>{day}</span>
                      <span style={{ color: hours === 'Always Available' ? 'var(--gold-warm)' : 'var(--navy-deep)', fontWeight: hours === 'Always Available' ? 700 : 600 }}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Card */}
              <div style={{
                background: 'var(--navy-deep)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', color: 'white'
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  Need Emergency Service?
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  Don't wait — call our direct emergency line for immediate dispatch.
                </p>
                <a href="tel:5043012052" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Phone style={{ width: 18, height: 18, fill: 'var(--navy-deep)' }} /> (504) 301-2052
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== PHOTO CTA ======== */}
      <section className="photo-cta">
        <div className="photo-cta-bg">
          <img
            src="/images/Untitled-design-56.png"
            alt="Big Easy Services van — Do you need a Plumber? 504-301-2052"
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
            Ready to Get Started?
          </h2>
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'rgba(11,34,64,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Licensed, insured, and committed to punctuality. Our team is standing by.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5043012052" className="btn-navy">
              <Phone style={{ width: 18, height: 18 }} /> Call Now — (504) 301-2052
            </a>
            <Link to="/our-promise" className="btn-navy" style={{ background: 'white', color: 'var(--navy-deep)' }}>
              Our Guarantees <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

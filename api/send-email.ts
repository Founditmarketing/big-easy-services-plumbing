import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, phone, email, serviceType, address, details, promo } = req.body;

    // Validate required fields
    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone number are required.' });
      return;
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Invalid email address format.' });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      res.status(500).json({ error: 'Email service is not configured. Please call (504) 301-2052 instead.' });
      return;
    }

    const resend = new Resend(apiKey);

    const serviceLabels: Record<string, string> = {
      emergency: '🚨 Emergency Repair',
      gas: '⚠️ Gas Line Service',
      residential: '🏠 Residential Plumbing',
      commercial: '🏢 Commercial Service',
      generator: '⚡ Generator Connection',
      backflow: '🔧 Backflow Testing',
      drain: '🔧 Drain Cleaning',
      other: 'Other',
    };

    const serviceLabel = serviceLabels[serviceType] || serviceType || 'Not specified';

    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 0;">
        <div style="background: #0B2240; padding: 24px 32px; text-align: center;">
          <h1 style="color: #FACC15; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">New Service Request</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Big Easy Services Plumbing — Website Contact Form</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone}" style="color: #0D5CDE; text-decoration: none; font-weight: 600;">${phone}</a></td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #0D5CDE; text-decoration: none;">${email}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${serviceLabel}</td>
            </tr>
            ${address ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; vertical-align: top;">Address</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${address}</td>
            </tr>` : ''}
            ${details ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0B2240; vertical-align: top;">Details</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155; white-space: pre-wrap;">${details}</td>
            </tr>` : ''}
            ${promo ? `<tr>
              <td style="padding: 12px 0; font-weight: 700; color: #0B2240; vertical-align: top;">Promo Code</td>
              <td style="padding: 12px 0; color: #059669; font-weight: 700;">${promo}</td>
            </tr>` : ''}
          </table>
        </div>
        <div style="background: #0B2240; padding: 16px 32px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 12px;">Sent from bigeasyservicesplumbing.com contact form</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Big Easy Services Plumbing <hello@big-ez.com>',
      to: ['Jason@founditmarketing.com'],
      replyTo: email || undefined,
      subject: `New Service Request: ${serviceLabel} — ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API Error:', error);
      res.status(500).json({ error: 'Failed to send email. Please call (504) 301-2052 instead.' });
      return;
    }

    console.log(`[Email Sent] ID: ${data?.id} | From: ${name} | Service: ${serviceLabel}`);
    res.status(200).json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error('Email Send Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please call (504) 301-2052 instead.' });
  }
}

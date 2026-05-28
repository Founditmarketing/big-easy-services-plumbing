import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";

// Load .env.local first (higher priority), then .env as fallback
dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Check Gemini availability
  app.get("/api/gemini/status", (req: Request, res: Response) => {
    const key = process.env.GEMINI_API_KEY;
    const isConfigured = !!key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "";
    res.json({ configured: isConfigured });
  });

  // API Route: AI Copywriter proxy using Gemini 3.5 Flash
  app.post("/api/generate-copy", async (req: Request, res: Response) => {
    const { audience, tone, topic, customDetails } = req.body;

    if (!audience || !tone || !topic) {
      res.status(400).json({ error: "Missing required parameters: audience, tone, topic" });
      return;
    }

    try {
      const client = getGeminiClient();

      const systemInstruction = `You are an expert UX/UI Copywriter, Conversion Rate Optimization (CRO) Specialist, and Bid Proposal Architect specializing in high-value B2B Government bidding and highly competitive local Residential & Commercial trade services.
Your client is "Big Easy Services Plumbing" (Legal Entity: Big Easy Services Of New Orleans, LLC; Established 2005; Woman-Owned & Family-Operated; President: Paula D. Baldwin).
Key Identifiers to reference appropriately: NAICS 238220 (Plumbing, Heating, and Air-Conditioning Contractors), CAGE Code: 9V6R3, UEI: EXLNLYSKJRJ4, LaPAC Vendor No: 310242016, DUNS No: 782015114.
Licensing: LA Master Plumber (LMP 5923), Licensed Natural Gas Fitter (LMNGF 10369), LA State Contractor Licenses (CL.48646 & RL.883464), NC GC (L.83218).
Address: 2451 Belle Chasse Hwy., Terrytown, LA 70056 | Tel: (504) 301-2052 | Emails: paula@big-ez.com, info@big-ez.com

Brand Philosophy (New Mission): At Big Easy Services Plumbing, we provide reliable, high-quality plumbing solutions with integrity, professionalism, and a commitment to customer satisfaction. As a woman-owned, family-driven business with over 20 years of experience, we serving our community with 24/7 emergency service, expert craftsmanship, and dedication to safety/innovation.

Your output must be professional, structurally well-organized in markdown, high-converting, and strictly tailored to the requested audience, tone, and topic. Do not output any meta-commentary, just the final production copywriting asset. Output should include headings, content copies, benefits checkpoints, or call-to-actions depending on what's requested.`;

      const promptText = `Generate a modern, high-converting copy asset for:
- Audience: ${audience.toUpperCase()}
- Tone Direction: ${tone.toUpperCase()}
- Primary Topic/Request: ${topic}
${customDetails ? `- Additional Customer Context: ${customDetails}` : ""}

Please include corresponding layout section breakdowns (e.g. Hero Hook, Secondary Trust Stack, Benefit Callouts, Strong Call to Action). Ensure it demonstrates 20 years of localized New Orleans authority, certifications (OSHA-compliant, TWIC, DBIDS, PHCC, Women in Plumbing & Piping), and has an extremely clear, low-friction next step for the reader.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      if (error?.message === "GEMINI_API_KEY_MISSING") {
        // Safe key-missing fallback trigger
        res.json({
          text: `### [FALLBACK MODE] Gemini API Key is Not Setup Yet
(Please add your \`GEMINI_API_KEY\` in AI Studio's **Settings > Secrets** panel to unlock live AI custom copywriting).

Here is a pre-optimized premium copywriting template for your review:

#### 🏛️ Government & B2B Procurement Headline
**"Delivering Mission-Critical Infrastructure with Absolute Compliance and Over 20 Years of Certified Expertise"**
*Primary Subhead:* Big Easy Services Of New Orleans, LLC dba Big Easy Services Plumbing stands ready to execute municipal, state, and federal bids under NAICS Code 238220 & 237110 with rapid deployment, TWIC-certified safety, and full state licensing.

#### ⚡ Responsive Call-to-Actions for Government Contracting Officers
- **Rapid Quote Portal:** Direct procurement contact hotline: (504) 301-2052 (Available 24/7)
- **CAGE:** 9V6R3 | **UEI:** EXLNLYSKJRJ4 | **LaPAC Vendor No:** 310242016
- **Woman-Owned Certification (President Paula D. Baldwin):** Fully certified Hispanic-Owned and Woman-Owned enterprise.

#### 🛡️ Compliance Indicators & Accreditations
- **TWIC-Certified** & **DBIDS-Accessible** for naval & military base installations.
- **OSHA-Compliant** safety programs with zero-incident histories.
- Active members of **PHCC**, **Women in Plumbing & Piping**, and **ABC Bayou New Orleans**.
`,
          fallback: true
        });
      } else {
        console.error("Gemini Generation Error:", error);
        res.status(500).json({ error: "Failed to generate copy. Ref: " + error.message });
      }
    }
  });

  // API Route: Send Email via Resend
  app.post("/api/send-email", async (req: Request, res: Response) => {
    try {
      const { name, phone, email, serviceType, address, details, promo } = req.body;

      // Validate required fields
      if (!name || !phone) {
        res.status(400).json({ error: "Name and phone number are required." });
        return;
      }

      // Validate email format if provided
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ error: "Invalid email address format." });
        return;
      }

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("RESEND_API_KEY is not configured");
        res.status(500).json({ error: "Email service is not configured. Please call (504) 301-2052 instead." });
        return;
      }

      const resend = new Resend(apiKey);

      // Service type labels
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
        from: 'Big Easy Services <hello@bigeasyservicesplumbing.com>',
        to: ['Jason@founditmarketing.com'],
        reply_to: email || undefined,
        subject: `New Service Request: ${serviceLabel} — ${name}`,
        html: emailHtml,
      });

      if (error) {
        console.error('Resend API Error:', error);
        res.status(500).json({ error: 'Failed to send email. Please call (504) 301-2052 instead.' });
        return;
      }

      console.log(`[Email Sent] ID: ${data?.id} | From: ${name} | Service: ${serviceLabel}`);
      res.json({ success: true, messageId: data?.id });
    } catch (error: any) {
      console.error('Email Send Error:', error);
      res.status(500).json({ error: 'An unexpected error occurred. Please call (504) 301-2052 instead.' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Big Easy Services] Full-stack Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();

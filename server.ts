import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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

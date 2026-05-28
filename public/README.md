# Public Media Directory

This folder is served as static assets by Vite. Files placed here are accessible at the root URL path without any processing.

## Structure

```
public/
├── images/      # Logos, hero images, team photos, project gallery
├── videos/      # Promotional videos, testimonials
└── documents/   # Capabilities statements, PDFs, downloadable assets
```

## Usage

Files in this directory are served as-is:

- `public/images/logo.png` → accessible at `/images/logo.png`
- `public/documents/capabilities.pdf` → accessible at `/documents/capabilities.pdf`

Reference in code:
```tsx
<img src="/images/logo.png" alt="Big Easy Services Logo" />
<a href="/documents/capabilities.pdf">Download Capabilities Statement</a>
```

> **Note:** Unlike files in `src/assets/`, files here are NOT processed by Vite's build pipeline (no hashing, no optimization). Use `src/assets/` for images that need build-time optimization, and `public/` for files that should keep their exact filename (e.g., favicons, PDFs, social media images).

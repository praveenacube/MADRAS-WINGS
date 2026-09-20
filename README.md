# Madras Wings Airport Services — Demo Website

A responsive HTML/CSS/JS demo site for airport recruitment and manpower services,
using the navy (#030081 / #0C005B) and gold (#F1B900 / #FFD301) brand colors.

## Files
- `index.html` — page structure and content
- `styles.css` — brand styling and responsive layout
- `script.js` — mobile menu + application form handling
- `google-apps-script.gs` — backend: saves applications to a Google Sheet (Excel) + emails you
- `logo.png` — add your logo here (see below)

## Add the logo
Save the eagle/wings logo image as `logo.png` in this same folder.
If missing, the site still works — it just hides the logo image.

## Run the demo locally
Just open `index.html` in a browser. The form works in "demo mode"
(logs to the browser console, no email/sheet yet).

## Make the form save to Excel + send email
1. Follow the setup steps at the top of `google-apps-script.gs`.
2. Copy the deployed Web App `/exec` URL.
3. Paste it into `SHEET_WEBHOOK_URL` in `script.js`.

Data lands in a Google Sheet you can download as `.xlsx`
(File → Download → Microsoft Excel), and you get an email per application.

## Hosting options (discuss)
- **GitHub Pages** — free, great for this static demo.
- **Netlify / Vercel** — free, drag-and-drop deploy, custom domain, built-in form handling as an alternative to Apps Script.
- **Hostinger / GoDaddy shared hosting** — if you want a custom domain like madraswings.in with email.

Recommended path for the demo: Netlify (fastest) or GitHub Pages (free).
For production with a branded domain + email, shared hosting or Netlify + custom domain.

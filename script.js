// Madras Wings Airport Services - demo front-end script

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mainNav.classList.remove('open'))
);

// ---- CONFIG ----
// Choose ONE backend for real submissions. Left blank = demo mode (no send).
//
// OPTION A (recommended for a static site): Google Apps Script Web App URL.
//   It writes each application to a Google Sheet AND emails you.
//   Paste the deployed /exec URL below. Setup steps are in google-apps-script.gs.
const SHEET_WEBHOOK_URL = ''; // e.g. "https://script.google.com/macros/s/XXXX/exec"

const form = document.getElementById('applyForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  note.className = 'form-note';
  note.textContent = 'Submitting…';

  const data = Object.fromEntries(new FormData(form).entries());
  data.submittedAt = new Date().toLocaleString();

  // DEMO MODE: no backend configured yet
  if (!SHEET_WEBHOOK_URL) {
    console.log('Application (demo mode):', data);
    note.classList.add('ok');
    note.textContent = '✓ Application received (demo). Configure SHEET_WEBHOOK_URL to save to Excel/Google Sheet + email.';
    form.reset();
    return;
  }

  // LIVE MODE: send to Google Apps Script -> Google Sheet + email notification
  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script accepts this; response is opaque
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    note.classList.add('ok');
    note.textContent = '✓ Thank you! Your application has been submitted.';
    form.reset();
  } catch (err) {
    console.error(err);
    note.classList.add('err');
    note.textContent = '✗ Something went wrong. Please call us at 7448846433.';
  }
});

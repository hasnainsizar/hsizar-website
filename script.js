/* EmailJS setup: create a free account at emailjs.com, add an email service and a
   template whose fields are from_name, from_email, from_Subject and message, then
   paste the public key, service id and template id below. While any value is still
   REPLACE_ME the contact form stays hidden and the email and phone cards are the
   contact path, so nothing is ever "sent" to nowhere. */
const EMAILJS_PUBLIC_KEY = "REPLACE_ME";
const EMAILJS_SERVICE_ID = "REPLACE_ME";
const EMAILJS_TEMPLATE_ID = "REPLACE_ME";

const CONTACT_EMAIL = "hasnainsizar@outlook.com";
const CONTACT_PHONE = "562-386-4852";

/* ── Typing effect ── */
const phrases = [
  "Forecasting demand in Python and SQL",
  "Dashboards built on clean star schemas",
  "ETL pipelines with data quality checks",
  "A/B tests that inform real decisions"
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typingEl.textContent = current.slice(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
  } else {
    typingEl.textContent = current.slice(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
if (typingEl) typeLoop();

/* ── Theme toggle ── */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

if (localStorage.getItem("theme") === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  if (themeIcon) themeIcon.textContent = "☾";
  if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
}

if (themeToggle && themeIcon) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "☼";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "☾";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  });
}

/* ── Header scroll ── */
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  updateActiveNav();
});

/* ── Scroll to top ── */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Active nav ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav ul li a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileNav) mobileNav.classList.remove('open');
}

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
}

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Copy to clipboard ── */
const copiedPopup = document.getElementById('copiedPopup');

function showCopied() {
  if (!copiedPopup) return;
  copiedPopup.classList.add('copiedShow');
  setTimeout(() => copiedPopup.classList.remove('copiedShow'), 2400);
}

function bindCopy(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(value).then(showCopied).catch(console.error);
  });
}

bindCopy('.copyMail', CONTACT_EMAIL);
bindCopy('.copyNumber', CONTACT_PHONE);

/* ── Contact form (EmailJS) ── */
const form = document.getElementById('contact-form');
const contactGrid = document.querySelector('.contact-grid');
const successPopup = document.querySelector('.success-popup');
const emailConfigured = [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
  .every(v => v && v !== "REPLACE_ME");

if (form && emailConfigured && window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  form.hidden = false;
  if (contactGrid) contactGrid.classList.remove('form-hidden');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        if (successPopup) {
          successPopup.classList.add('show');
          setTimeout(() => successPopup.classList.remove('show'), 2500);
        }
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        alert(error.text || 'Message could not be sent.');
      });
  });
}

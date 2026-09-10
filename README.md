# hsizar.com

Portfolio site for Hasnain Sizar, served at hsizar.com. A plain static site: one
HTML file, one stylesheet, one script, and an images folder. No build step.

hasnainsizar.com is a separate site in a separate repo. Changes here do not
affect it.

## Files

```
index.html       page content
style.css        design system, light and dark themes
script.js        typing effect, theme toggle, nav, contact form
CNAME            custom domain for GitHub Pages
website-images/  portraits, project screenshots, resume PDF
```

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a new empty repo on GitHub.
2. Push these files to its default branch.
3. In the repo, open Settings, then Pages.
4. Under Build and deployment, set Source to Deploy from a branch and pick the
   default branch at the root.
5. Under Custom domain, enter `hsizar.com` and save. `CNAME` in this repo
   already holds the same value.
6. Wait for the DNS check to pass, then tick Enforce HTTPS.

## DNS records

Add these at the registrar for hsizar.com.

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | hasnainsizar.github.io |

DNS can take a while to propagate. The Pages settings page shows when the
check has passed.

## Contact form

The form stays hidden until the three EmailJS constants at the top of
`script.js` are filled in:

```
const EMAILJS_PUBLIC_KEY = "REPLACE_ME";
const EMAILJS_SERVICE_ID = "REPLACE_ME";
const EMAILJS_TEMPLATE_ID = "REPLACE_ME";
```

Create a free account at emailjs.com, add an email service, and add a template
whose fields are `from_name`, `from_email`, `from_Subject`, and `message`. Paste
the public key, service id, and template id into those constants. Once none of
them read `REPLACE_ME`, the form appears on the page. Until then, the email and
phone cards are the contact path.

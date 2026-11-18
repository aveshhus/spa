# Pearl Royal Spa

The Pearl Royal Spa website is a responsive, animated Next.js site for the spa in Udaipur. It includes treatment guides, membership packages, guest feedback, location information, appointment enquiries and a dedicated contact page.

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Production setup

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin before building. This value is used for canonical metadata and the sitemap. `.env.example` lists optional Sanity, email and WhatsApp settings; keep real credentials in your hosting provider's environment settings and never commit `.env` files.

Build with `npm run build` and start with `npm run start`.

## GitHub Pages

Pushing to `main` runs the `Deploy spa website to GitHub Pages` workflow. The workflow prepares and exports the spa home and contact pages as a static site. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The project site URL will be `https://aveshhus.github.io/spa/` after the first successful workflow deployment.

## Contact details

- Pearl Royal Spa, Anand Nagar, near Anand Plaza, University Road, Udaipur, Rajasthan 313001
- +91 63762 91507
- +91 83024 52881

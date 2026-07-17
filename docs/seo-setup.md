# SEO Setup

## Production URL

This Vite project reads the public canonical URL from:

```bash
VITE_SITE_URL=https://rishavrajcoder.in
```

A compatibility alias is also supported:

```bash
NEXT_PUBLIC_SITE_URL=https://rishavrajcoder.in
```

The URL is normalized in `src/lib/site-config.ts`. Localhost, `0.0.0.0`, and `.local` hosts are never used as production canonicals; the fallback is `https://rishavrajcoder.in`.

## Metadata Setup

Route metadata is configured in:

- `src/lib/site-config.ts`
- `src/lib/seo.ts`
- `src/components/route-seo.tsx`

`RouteSeo` is mounted inside the Wouter router in `src/App.tsx`. It updates:

- document title
- meta description
- canonical URL
- robots metadata
- Open Graph metadata
- Twitter/X metadata
- route-specific JSON-LD

Because this is a Vite single page app, route metadata is applied on the client. The static `index.html` remains the fallback metadata shell for non-JavaScript crawlers and social scrapers that only read the initial document.

## Public Routes

The canonical public routes are:

- `/`
- `/capabilities`
- `/stack`
- `/projects`
- `/projects/hhh-jobs`
- `/projects/curebridge`
- `/projects/ai-assistant`
- `/projects/property-mart`
- `/experience`
- `/about`
- `/insights`
- `/contact`
- `/blog/building-a-scalable-job-portal`
- `/blog/ai-resume-analyzer`
- `/blog/designing-a-real-world-erp-system`

## Private And Utility Paths

The route SEO layer treats these prefixes as private utility paths:

- `/admin`
- `/api`
- `/private`
- `/auth`
- `/login`

They receive:

```text
noindex, nofollow, noarchive, nosnippet
```

Robots disallow rules reduce crawler access, but they are not a security layer. Do not place secrets, admin data, or protected API behavior in public frontend code.

## Sitemap

Sitemap location:

```text
/sitemap.xml
```

Source file:

```text
public/sitemap.xml
```

Included routes are public canonical portfolio pages, project case-study pages, and published blog posts only.

## Robots

Robots location:

```text
/robots.txt
```

Source file:

```text
public/robots.txt
```

Robots allows public portfolio crawling and reduces crawling of admin, API, auth, login, and private utility paths. Required static assets are not blocked.

## Structured Data

Homepage static JSON-LD includes:

- `Person`
- `WebSite`
- `WebPage`

Route-level JSON-LD can add:

- `BreadcrumbList`
- `ProfilePage`
- `BlogPosting`
- `SoftwareApplication` for project pages

Do not add fake reviews, fake aggregate ratings, fake awards, fake employers, or unsupported dates.

## Social Preview

The default social image is:

```text
/preview.jpg
```

The route SEO layer uses the absolute production URL for Open Graph and Twitter image tags. Project routes use their project screenshots as route images in the client-side SEO layer.

## Manifest And Icons

Manifest location:

```text
/site.webmanifest
```

Icon files:

```text
/favicon.svg
/icon.svg
```

Both public SVG icons are based on the existing portfolio favicon branding.

## Search Console Verification

Optional public verification fields:

```bash
VITE_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Set one value in the deployment environment and rebuild. `vite.config.ts` injects the `google-site-verification` meta tag into the built HTML, and the route SEO layer keeps it available after client-side navigation.

## Build And Audit Commands

Run before production deployment:

```bash
npm run typecheck
npm run build
npm audit
```

There is currently no `npm run lint` script in `package.json`.

## Deployment Steps

1. Configure the real custom domain.
2. Force HTTPS.
3. Choose www or non-www and redirect the other version.
4. Set `VITE_SITE_URL` to the final canonical URL.
5. Set `NEXT_PUBLIC_SITE_URL` only if the host or workflow expects that compatibility alias.
6. Set Search Console verification if needed.
7. Deploy the production build.
8. Ensure the host serves `index.html` for SPA routes such as `/projects/hhh-jobs` and `/blog/building-a-scalable-job-portal`.
9. Open `/robots.txt` in the browser after deployment.
10. Open `/sitemap.xml` in the browser after deployment.
11. Check page source metadata for the homepage.
12. Test social sharing previews after deployment.

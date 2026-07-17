# SEO Production Checklist

Use this checklist after the site is deployed to the real production host.

## Domain And Hosting

- [ ] Configure the real custom domain.
- [ ] Force HTTPS.
- [ ] Choose www or non-www as the canonical version.
- [ ] Redirect the non-canonical domain version to the canonical one.
- [ ] Set `VITE_SITE_URL` to the final production URL.
- [ ] Set `NEXT_PUBLIC_SITE_URL` only if a deployment workflow expects the compatibility alias.
- [ ] Deploy the production build created by `npm run build`.
- [ ] Confirm SPA fallback/rewrite serves `index.html` for public deep links.

## Public SEO Files

- [ ] Open `https://rishavrajcoder.in/robots.txt`.
- [ ] Open `https://rishavrajcoder.in/sitemap.xml`.
- [ ] Confirm the sitemap contains only public canonical URLs.
- [ ] Confirm sitemap URLs use the production hostname only.
- [ ] Confirm sitemap has no localhost, preview, admin, API, auth, login, or private URLs.
- [ ] Confirm robots points to the production sitemap URL.
- [ ] Confirm required public assets are not blocked by robots.

## Metadata And Sharing

- [ ] Check page source metadata on the homepage.
- [ ] Confirm title and description match the visible portfolio positioning.
- [ ] Confirm canonical URL uses the chosen production domain.
- [ ] Confirm Open Graph and Twitter image URLs resolve.
- [ ] Test social sharing previews for the homepage.
- [ ] Test social sharing previews for important project pages when the hosting setup supports client-rendered metadata or prerendering.
- [ ] Verify the GitHub URL opens the intended profile.
- [ ] Verify the LinkedIn URL opens the intended profile while logged in.

## Google Search Console

- [ ] Add the site to Google Search Console.
- [ ] Verify domain ownership.
- [ ] Add `VITE_GOOGLE_SITE_VERIFICATION` or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if using HTML tag verification.
- [ ] Rebuild and redeploy after adding verification metadata.
- [ ] Submit `https://rishavrajcoder.in/sitemap.xml`.
- [ ] Request indexing for the homepage.
- [ ] Request indexing for key project pages.
- [ ] Monitor indexing coverage.
- [ ] Monitor Core Web Vitals.

## Bing Webmaster Tools

- [ ] Add the site to Bing Webmaster Tools.
- [ ] Verify ownership.
- [ ] Submit the sitemap.
- [ ] Monitor crawl and indexing reports.

## Ongoing SEO Work

- [ ] Keep GitHub and LinkedIn profile information consistent with the website.
- [ ] Add public repository URLs when project repositories are ready.
- [ ] Add live project URLs when deployed and stable.
- [ ] Publish stronger project case studies with real screenshots, problem context, build decisions, and outcomes.
- [ ] Write regular technical content based on real project work.
- [ ] Gain legitimate backlinks from GitHub profiles, LinkedIn, project demos, DEV posts, portfolio directories, and collaborators.
- [ ] Avoid fake metrics, fake testimonials, fake employer claims, fake awards, or keyword stuffing.

## Final Local Validation Commands

```bash
npm run typecheck
npm run build
npm audit
```

Current note: this project does not define `npm run lint`.

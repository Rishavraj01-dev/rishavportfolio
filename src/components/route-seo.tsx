import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSeoMetadata, getStructuredData, toIsoDate } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    tag.setAttribute("data-route-seo", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    tag.setAttribute("data-route-seo", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function RouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const metadata = getSeoMetadata(location);

    document.documentElement.lang = siteConfig.language;
    document.title = metadata.title;

    upsertMeta("name", "description", metadata.description);
    upsertMeta("name", "robots", metadata.robots);
    upsertMeta("name", "googlebot", metadata.robots);
    upsertMeta("name", "bingbot", metadata.robots);
    upsertMeta("name", "application-name", siteConfig.siteName);
    upsertMeta("name", "author", siteConfig.ownerName);
    upsertMeta("name", "creator", siteConfig.ownerName);
    upsertMeta("name", "publisher", siteConfig.ownerName);
    upsertMeta("name", "theme-color", siteConfig.themeColor);

    if (siteConfig.googleSiteVerification) {
      upsertMeta("name", "google-site-verification", siteConfig.googleSiteVerification);
    } else {
      removeMeta("name", "google-site-verification");
    }

    upsertLink("canonical", metadata.canonicalUrl);

    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:type", metadata.ogType);
    upsertMeta("property", "og:url", metadata.canonicalUrl);
    upsertMeta("property", "og:site_name", siteConfig.siteName);
    upsertMeta("property", "og:locale", siteConfig.locale);
    upsertMeta("property", "og:image", metadata.imageUrl);
    upsertMeta("property", "og:image:secure_url", metadata.imageUrl);
    upsertMeta("property", "og:image:alt", metadata.imageAlt);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);
    upsertMeta("name", "twitter:image", metadata.imageUrl);
    upsertMeta("name", "twitter:image:alt", metadata.imageAlt);

    if (metadata.blog) {
      upsertMeta("property", "article:published_time", toIsoDate(metadata.blog.date));
      upsertMeta("property", "article:modified_time", toIsoDate(metadata.blog.date));
      upsertMeta("property", "article:author", siteConfig.ownerName);
    } else {
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
      removeMeta("property", "article:author");
    }

    upsertJsonLd("route-structured-data", getStructuredData(metadata));
  }, [location]);

  return null;
}

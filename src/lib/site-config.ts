const FALLBACK_SITE_URL = "https://rishavrajcoder.in";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function normalizeSiteUrl(value?: string) {
  const rawValue = value?.trim() || FALLBACK_SITE_URL;
  const candidate = /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;

  try {
    const url = new URL(candidate);
    if (LOCAL_HOSTS.has(url.hostname) || url.hostname.endsWith(".local")) {
      return FALLBACK_SITE_URL;
    }

    url.hash = "";
    url.search = "";
    return url.origin.replace(/\/+$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

const env = import.meta.env;

export const siteConfig = {
  siteName: "Rishav Raj Portfolio",
  ownerName: "Rishav Raj",
  professionalTitle: "Full Stack Developer & Creative Technologist",
  shortDescription:
    "Portfolio of Rishav Raj, a full-stack developer building React, Node.js, Python, AI, and polished product interfaces.",
  longDescription:
    "Rishav Raj builds production-ready web products across frontend interfaces, backend systems, automation workflows, and practical AI-assisted experiences.",
  siteUrl: normalizeSiteUrl(env.VITE_SITE_URL || env.NEXT_PUBLIC_SITE_URL),
  locale: "en_IN",
  language: "en-IN",
  email: "rishavraj5999@gmail.com",
  location: "New Delhi, India",
  githubUrl: "https://github.com/Rishavraj01-dev",
  linkedInUrl: "https://www.linkedin.com/in/rishav-raj-1602-/",
  previewImage: "/preview.jpg",
  favicon: "/favicon.svg",
  manifest: "/site.webmanifest",
  themeColor: "#020617",
  googleSiteVerification: (
    env.VITE_GOOGLE_SITE_VERIFICATION || env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
  ).trim(),
  mainSkills: [
    "React.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "Supabase",
    "MongoDB",
    "Python",
    "FastAPI",
    "Flask",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
  ],
  services: [
    "High-performance UI development",
    "Full-stack web application development",
    "Backend engineering",
    "System design",
    "AI and machine learning workflows",
    "Python automation",
    "Secure implementation",
  ],
  verifiedSocialUrls: [
    "https://github.com/Rishavraj01-dev",
    "https://www.linkedin.com/in/rishav-raj-1602-/",
  ],
} as const;

export function normalizeCanonicalPath(pathname: string) {
  const withoutHash = pathname.split("#")[0];
  const withoutSearch = withoutHash.split("?")[0] || "/";
  if (withoutSearch === "/") return "/";
  return `/${withoutSearch.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

export function absoluteUrl(pathname = "/") {
  const normalizedPath = normalizeCanonicalPath(pathname);
  return normalizedPath === "/"
    ? `${siteConfig.siteUrl}/`
    : `${siteConfig.siteUrl}${normalizedPath}`;
}

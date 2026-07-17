import { blogs, type BlogPost } from "@/lib/blogs";
import { getProjectBySlug, projects, type Project } from "@/lib/portfolio-content";
import { absoluteUrl, normalizeCanonicalPath, siteConfig } from "@/lib/site-config";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type SeoPage = {
  path: string;
  title: string;
  description: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export type SeoMetadata = {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: "website" | "article";
  imageUrl: string;
  imageAlt: string;
  noindex?: boolean;
  blog?: BlogPost;
  project?: Project;
};

export const publicSeoPages: SeoPage[] = [
  {
    path: "/",
    title: "Rishav Raj | Full Stack Developer & Creative Technologist",
    description: siteConfig.shortDescription,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/capabilities",
    title: "Services | Rishav Raj",
    description:
      "Explore services from Rishav Raj for portfolio websites, product interfaces, full-stack web applications, dashboards, automation, and AI workflows.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/stack",
    title: "Skills and Tech Stack | Rishav Raj",
    description:
      "See the skills and technology stack Rishav Raj uses for React interfaces, Node.js APIs, Python automation, AI workflows, databases, and deployment.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects",
    title: "Projects | Rishav Raj",
    description:
      "Selected full-stack projects by Rishav Raj, including job portal systems, healthcare coordination, AI automation, and real-estate platform workflows.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/experience",
    title: "Experience | Rishav Raj",
    description:
      "Professional experience of Rishav Raj as a full-stack developer shipping frontend, backend, job portal, ERP, and data workflow features.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/about",
    title: "About Rishav Raj | Full Stack Developer",
    description:
      "Learn about Rishav Raj's approach to building production-ready digital systems with frontend craft, backend structure, automation, and practical execution.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/insights",
    title: "Insights | Rishav Raj",
    description:
      "Read Rishav Raj's writing on product building, engineering decisions, AI systems, job portals, ERP workflows, and lessons from real projects.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Contact Rishav Raj | Full Stack Developer",
    description:
      "Contact Rishav Raj for portfolio builds, full-stack products, internal tools, automation workflows, collaborations, and freelance development work.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

const pageByPath = new Map(publicSeoPages.map((page) => [page.path, page]));

const monthNumbers: Record<string, string> = {
  JAN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAY: "05",
  JUN: "06",
  JUL: "07",
  AUG: "08",
  SEP: "09",
  OCT: "10",
  NOV: "11",
  DEC: "12",
};

export function toIsoDate(date: string) {
  const match = date.trim().toUpperCase().match(/^([A-Z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return date;
  const [, month, day, year] = match;
  const monthNumber = monthNumbers[month];
  if (!monthNumber) return date;
  return `${year}-${monthNumber}-${day.padStart(2, "0")}`;
}


const privatePathPrefixes = ["/admin", "/api", "/private", "/auth", "/login"];

function truncateDescription(text: string, maxLength = 158) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}...`;
}

function isPrivateUtilityPath(pathname: string) {
  return privatePathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function blogPath(blog: BlogPost) {
  return `/blog/${blog.slug}`;
}

function projectPath(project: Project) {
  return `/projects/${project.slug}`;
}

export function getSitemapRoutes() {
  return [
    ...publicSeoPages,
    ...projects.map((project) => ({
      path: projectPath(project),
      title: `${project.title} Case Study | ${siteConfig.ownerName}`,
      description: truncateDescription(`${project.problem} ${project.contribution}`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogs.map((blog) => ({
      path: blogPath(blog),
      title: `${blog.title} | ${siteConfig.ownerName}`,
      description: truncateDescription(blog.intro.join(" ")),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  const path = normalizeCanonicalPath(pathname);
  const imageUrl = absoluteUrl(siteConfig.previewImage);

  if (isPrivateUtilityPath(path)) {
    return {
      path,
      title: `Private Page | ${siteConfig.ownerName}`,
      description: "This private utility route is not intended for public search indexing.",
      canonicalUrl: absoluteUrl(path),
      robots: "noindex, nofollow, noarchive, nosnippet",
      ogType: "website",
      imageUrl,
      imageAlt: `${siteConfig.ownerName} portfolio preview`,
      noindex: true,
    };
  }


  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "");
    const project = getProjectBySlug(slug);
    if (project) {
      return {
        path,
        title: `${project.title} Case Study | ${siteConfig.ownerName}`,
        description: truncateDescription(`${project.problem} ${project.contribution}`),
        canonicalUrl: absoluteUrl(path),
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        ogType: "article",
        imageUrl: absoluteUrl(project.image),
        imageAlt: project.imageAlt,
        project,
      };
    }
  }

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const blog = blogs.find((item) => item.slug === slug);
    if (blog) {
      return {
        path,
        title: `${blog.title} | ${siteConfig.ownerName}`,
        description: truncateDescription(blog.intro.join(" ")),
        canonicalUrl: absoluteUrl(path),
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        ogType: "article",
        imageUrl,
        imageAlt: `${blog.title} - ${siteConfig.ownerName}`,
        blog,
      };
    }
  }

  const page = pageByPath.get(path);
  if (page) {
    return {
      path,
      title: page.title,
      description: page.description,
      canonicalUrl: absoluteUrl(path),
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      ogType: "website",
      imageUrl,
      imageAlt: `${siteConfig.ownerName} portfolio preview`,
    };
  }

  return {
    path,
    title: `Page Not Found | ${siteConfig.ownerName}`,
    description: "The requested portfolio page could not be found. Use the main navigation to return to public portfolio content.",
    canonicalUrl: absoluteUrl(path),
    robots: "noindex, follow, noarchive",
    ogType: "website",
    imageUrl,
    imageAlt: `${siteConfig.ownerName} portfolio preview`,
    noindex: true,
  };
}

export function getStructuredData(metadata: SeoMetadata) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(metadata.path !== "/"
      ? metadata.path.startsWith("/projects/")
        ? [
            { name: "Projects", path: "/projects" },
            { name: metadata.project?.title ?? metadata.title, path: metadata.path },
          ]
        : metadata.path.startsWith("/blog/")
          ? [
              { name: "Insights", path: "/insights" },
              { name: metadata.blog?.title ?? metadata.title, path: metadata.path },
            ]
          : [{ name: metadata.title.replace(` | ${siteConfig.ownerName}`, ""), path: metadata.path }]
      : []),
  ];

  const baseGraph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/#person`,
      name: siteConfig.ownerName,
      url: absoluteUrl("/"),
      image: absoluteUrl(siteConfig.previewImage),
      jobTitle: siteConfig.professionalTitle,
      description: siteConfig.longDescription,
      email: `mailto:${siteConfig.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
      knowsAbout: siteConfig.mainSkills,
      sameAs: siteConfig.verifiedSocialUrls,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: absoluteUrl("/"),
      name: siteConfig.siteName,
      description: siteConfig.shortDescription,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${metadata.canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    },
  ];

  if (metadata.project) {
    baseGraph.push({
      "@type": "SoftwareApplication",
      "@id": `${metadata.canonicalUrl}#software`,
      name: metadata.project.title,
      description: metadata.description,
      url: metadata.canonicalUrl,
      applicationCategory: metadata.project.category,
      creator: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      author: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      programmingLanguage: metadata.project.tech,
      keywords: metadata.project.tech.join(", "),
      screenshot: metadata.imageUrl,
      image: metadata.imageUrl,
      inLanguage: siteConfig.language,
    });
  } else if (metadata.blog) {
    baseGraph.push({
      "@type": "BlogPosting",
      "@id": `${metadata.canonicalUrl}#blogposting`,
      mainEntityOfPage: metadata.canonicalUrl,
      headline: metadata.blog.title,
      description: metadata.description,
      image: metadata.imageUrl,
      author: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      publisher: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      datePublished: toIsoDate(metadata.blog.date),
      dateModified: toIsoDate(metadata.blog.date),
      inLanguage: siteConfig.language,
    });
  } else {
    baseGraph.push({
      "@type": metadata.path === "/about" ? "ProfilePage" : "WebPage",
      "@id": `${metadata.canonicalUrl}#webpage`,
      url: metadata.canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      isPartOf: {
        "@id": `${siteConfig.siteUrl}/#website`,
      },
      about: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: metadata.imageUrl,
      },
      breadcrumb: {
        "@id": `${metadata.canonicalUrl}#breadcrumb`,
      },
      inLanguage: siteConfig.language,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": baseGraph,
  };
}

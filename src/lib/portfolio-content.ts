import {
  Activity,
  Cpu,
  Globe,
  Network,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

export const capabilities = [
  { icon: Zap, title: "HIGH-PERFORMANCE UI", desc: "Responsive React interfaces with clear flows, fast interactions, and careful visual polish for real users." },
  { icon: Network, title: "SYSTEMS ARCHITECTURE", desc: "Maintainable product structures for dashboards, role-based flows, complex state, and long-term feature growth." },
  { icon: Globe, title: "FULL STACK DEVELOPMENT", desc: "End-to-end web applications using frontend, backend, database, authentication, and deployment layers together." },
  { icon: Terminal, title: "BACKEND ENGINEERING", desc: "API design, server-side logic, integrations, and data workflows built for dependable product behavior." },
  { icon: Cpu, title: "AI / MACHINE LEARNING", desc: "Practical AI workflows, resume analysis ideas, model experimentation, and data-driven application features." },
  { icon: Network, title: "SYSTEM DESIGN", desc: "Clean data flow, clear boundaries, scalable structure, and product logic that stays easier to maintain." },
  { icon: Activity, title: "AUTOMATION (PYTHON)", desc: "Python automation and API workflows that reduce repetitive work and help products move faster." },
  { icon: Shield, title: "SECURE IMPLEMENTATIONS", desc: "Authentication-aware interfaces, safer data handling patterns, and secure foundations across app layers." },
] as const;

export const experience = [
  {
    year: "JAN 2026 - PRESENT",
    role: "FULL STACK DEVELOPER",
    company: "ULTIMATE ITECH",
    desc: "Working on the company's job portal and ERP system, building and maintaining full-stack features across frontend, backend, and data workflows.",
  },
] as const;

export const techStack = [
  {
    title: "FRONTEND",
    subtitle: "Interface Development",
    groups: [
      { label: "Core", items: ["React.js", "HTML", "CSS", "JavaScript"] },
      { label: "Styling", items: ["Tailwind CSS", "Responsive UI", "Animation"] },
    ],
  },
  {
    title: "BACKEND",
    subtitle: "APIs + Product Logic",
    groups: [
      { label: "Runtime", items: ["Node.js", "Express.js"] },
      { label: "Python", items: ["Core Python", "Flask", "FastAPI"] },
    ],
  },
  {
    title: "DATABASE + AI",
    subtitle: "Data + Modeling",
    groups: [
      { label: "Database", items: ["MongoDB", "Supabase"] },
      { label: "AI / ML", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch"] },
    ],
  },
  {
    title: "TOOLS + DEPLOYMENT",
    subtitle: "Workflow + Release",
    groups: [
      { label: "Version Control", items: ["Git", "GitHub"] },
      { label: "Deployment", items: ["Vercel", "Netlify"] },
    ],
  },
] as const;

export const services = [
  {
    title: "Portfolio and Product Interfaces",
    audience: "Founders, students, freelancers, and teams that need a polished public web presence or product UI.",
    problem: "Turns rough ideas and scattered content into clear, responsive interfaces that communicate value quickly.",
    technologies: ["React.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Full-Stack Web Applications",
    audience: "People building job portals, internal tools, dashboards, healthcare workflows, or listing platforms.",
    problem: "Connects frontend screens, backend APIs, authentication, and data flows into one usable product.",
    technologies: ["React.js", "Node.js", "Express.js", "Supabase", "MongoDB"],
  },
  {
    title: "Automation and AI Workflows",
    audience: "Teams or creators who want to reduce repetitive work or add practical AI-assisted features.",
    problem: "Uses Python, APIs, and AI workflow logic to speed up manual tasks and structure intelligent features.",
    technologies: ["Python", "FastAPI", "REST APIs", "AI Workflows"],
  },
] as const;

export const projects = [
  {
    num: "01",
    slug: "hhh-jobs",
    title: "HHH Jobs",
    category: "Scalable Full-Stack Job Portal",
    desc: "HHH Jobs is a full-stack job portal built to simulate real-world hiring platforms. It includes multi-role dashboards, job posting and tracking systems, and an integrated resume builder. The platform focuses on scalability, performance optimization, and secure authentication, making it suitable for real-world deployment.",
    problem: "Hiring platforms need different user roles, structured job workflows, secure access, and resume support in one system.",
    intendedUsers: "Admins, HR teams, students, job seekers, and super admin users managing hiring workflows.",
    contribution: "Built the product as a full-stack system with frontend dashboards, backend API logic, authentication, and role-based flows.",
    features: [
      "Role-based dashboards for hiring workflows",
      "Job posting and tracking system",
      "Integrated resume builder",
      "Secure authentication with JWT and OAuth concepts",
      "Scalable Supabase-backed data workflows",
    ],
    image: "/projects/hhh-jobs.png",
    imageAvif: undefined,
    imageAlt: "HHH Jobs dashboard screenshot showing a full-stack job portal interface",
    imageMode: "contain",
    imageWidth: 1584,
    imageHeight: 771,
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "JWT", "OAuth"],
  },
  {
    num: "02",
    slug: "curebridge",
    title: "CureBridge",
    category: "Healthcare Coordination Platform",
    desc: "A full-stack healthcare and medical tourism platform connecting patients with verified advisors and hospitals. Built secure case submission, role-based dashboards, real-time case tracking, appointment support, and treatment comparison based on cost, location, and availability.",
    problem: "Patients comparing treatment options need a clearer way to submit cases, review options, and coordinate with advisors and hospitals.",
    intendedUsers: "Patients, healthcare advisors, hospitals, and operations teams coordinating medical tourism cases.",
    contribution: "Built full-stack product flows for case submission, advisor and hospital matching, dashboards, tracking, and secure access.",
    features: [
      "Secure patient case submission",
      "Advisor and hospital matching workflows",
      "Role-based dashboards",
      "Real-time case tracking",
      "Treatment comparison by cost, location, and availability",
    ],
    image: "/projects/curebridge.png",
    imageAvif: "/projects/curebridge.avif",
    imageAlt: "CureBridge healthcare coordination platform screenshot with patient and hospital workflow UI",
    imageMode: "contain",
    imageWidth: 2910,
    imageHeight: 1542,
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "REST APIs", "JWT", "RLS"],
  },
  {
    num: "03",
    slug: "ai-assistant",
    title: "AI Assistant",
    category: "Python Automation Project",
    desc: "A Python-based AI assistant project built to handle intelligent task execution, prompt-driven workflows, automation routines, and API-powered interactions. Designed to improve productivity with modular logic, fast responses, and practical assistant capabilities.",
    problem: "Repeated digital tasks and prompt workflows need a structured assistant that can respond quickly and work through APIs.",
    intendedUsers: "Developers, creators, and productivity-focused users experimenting with assistant-style automation.",
    contribution: "Designed the assistant around Python logic, FastAPI endpoints, API-powered interactions, and modular automation routines.",
    features: [
      "Prompt-driven task execution",
      "Python automation routines",
      "FastAPI-powered interaction layer",
      "Modular logic for assistant capabilities",
      "API-based workflow support",
    ],
    image: "/projects/ai-assistant.png",
    imageAvif: "/projects/ai-assistant.avif",
    imageAlt: "AI Assistant project screenshot showing an automation-focused assistant interface",
    imageMode: "contain",
    imageWidth: 1456,
    imageHeight: 816,
    tech: ["Python", "FastAPI", "REST APIs", "Automation", "AI Workflows"],
  },
  {
    num: "04",
    slug: "property-mart",
    title: "Property Mart",
    category: "Full-Stack MERN Real Estate Platform",
    desc: "Property Mart is a full-stack real estate platform built to streamline property discovery, listing management, and buyer-seller interactions. It focuses on a modern browsing experience, structured listing workflows, and scalable platform architecture for real-world property operations.",
    problem: "Real-estate users need structured listing workflows, easier discovery, and a cleaner way for buyers and sellers to interact.",
    intendedUsers: "Property buyers, sellers, listing managers, and real-estate platform operators.",
    contribution: "Built the platform around listing workflows, discovery screens, buyer-seller interactions, and scalable full-stack structure.",
    features: [
      "Property discovery experience",
      "Listing management workflows",
      "Buyer and seller interaction flows",
      "Modern browsing interface",
      "Scalable full-stack platform architecture",
    ],
    image: "/projects/property-mart.png",
    imageAvif: "/projects/property-mart.avif",
    imageAlt: "Property Mart real estate platform screenshot showing property listings and browsing UI",
    imageMode: "contain",
    imageWidth: 2908,
    imageHeight: 1670,
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "JWT", "OAuth"],
  },
] as const;

export type Project = (typeof projects)[number];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

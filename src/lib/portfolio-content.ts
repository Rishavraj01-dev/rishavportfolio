import {
  Activity,
  Cpu,
  Globe,
  Network,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import aiAssistantImg from "../assets/images/ai assistent.png";
import curebridgeImg from "../assets/images/curebridge.png";
import hhhJobsImg from "../assets/images/hhh-jobs.png";
import propertyMartImg from "../assets/images/property mart.png";

export const capabilities = [
  { icon: Zap, title: "HIGH-PERFORMANCE UI", desc: "60fps interfaces, zero-latency interactions, hardware-accelerated animations. Speed is a feature, not an afterthought." },
  { icon: Network, title: "SYSTEMS ARCHITECTURE", desc: "Scalable, resilient frontend infrastructures built for complex state and massive data streams." },
  { icon: Globe, title: "FULL STACK DEVELOPMENT", desc: "End-to-end web applications with modern frontend, backend, and database layers working together seamlessly." },
  { icon: Terminal, title: "BACKEND ENGINEERING", desc: "Robust APIs, server-side logic, integrations, and scalable backend systems designed for reliability." },
  { icon: Cpu, title: "AI / MACHINE LEARNING", desc: "Applied ML workflows, data-driven features, model experimentation, and practical AI integrations." },
  { icon: Network, title: "SYSTEM DESIGN", desc: "Thoughtful architecture for maintainable systems, clean data flow, scalability, and long-term extensibility." },
  { icon: Activity, title: "AUTOMATION (PYTHON)", desc: "Python-powered automation scripts that reduce repetitive work, streamline operations, and speed up delivery." },
  { icon: Shield, title: "SECURE IMPLEMENTATIONS", desc: "Enterprise-grade security baked into every layer - from auth flows to client-side data handling." },
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
    title: "FULL STACK",
    subtitle: "MERN / Web Dev",
    groups: [
      { label: "Frontend", items: ["React.js", "Tailwind CSS", "HTML, CSS, JS"] },
      { label: "Backend", items: ["Node.js", "Express.js"] },
      { label: "Database", items: ["MongoDB", "Supabase"] },
    ],
  },
  {
    title: "PYTHON STACK",
    subtitle: "Backend + Automation",
    groups: [
      { label: "Core", items: ["Core Python"] },
      { label: "Frameworks", items: ["Flask", "FastAPI"] },
      { label: "Use Cases", items: ["API Development", "Automation Scripts"] },
    ],
  },
  {
    title: "AI / ML STACK",
    subtitle: "Data + Modeling",
    groups: [
      { label: "Libraries", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch"] },
    ],
  },
  {
    title: "TOOLS & PLATFORMS",
    subtitle: "Workflow + Deployment",
    groups: [
      { label: "Version Control", items: ["Git", "GitHub"] },
      { label: "Deployment", items: ["Vercel", "Netlify"] },
    ],
  },
] as const;

export const projects = [
  {
    num: "01",
    title: "HHH JOBS",
    category: "SCALABLE FULL-STACK JOB PORTAL",
    desc: "HHH Jobs is a full-stack job portal built to simulate real-world hiring platforms. It includes multi-role dashboards, job posting and tracking systems, and an integrated resume builder. The platform focuses on scalability, performance optimization, and secure authentication, making it suitable for real-world deployment.",
    image: hhhJobsImg,
    imageMode: "contain",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "JWT", "OAuth"],
  },
  {
    num: "02",
    title: "CUREBRIDGE",
    category: "HEALTHCARE COORDINATION PLATFORM",
    desc: "A full-stack healthcare and medical tourism platform connecting patients with verified advisors and hospitals. Built secure case submission, role-based dashboards, real-time case tracking, appointment support, and treatment comparison based on cost, location, and availability.",
    image: curebridgeImg,
    imageMode: "contain",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "REST APIs", "JWT", "RLS"],
  },
  {
    num: "03",
    title: "AI ASSISTANT",
    category: "PYTHON AUTOMATION PROJECT",
    desc: "A Python-based AI assistant project built to handle intelligent task execution, prompt-driven workflows, automation routines, and API-powered interactions. Designed to improve productivity with modular logic, fast responses, and practical assistant capabilities.",
    image: aiAssistantImg,
    imageMode: "contain",
    tech: ["Python", "FastAPI", "REST APIs", "Automation", "AI Workflows"],
  },
  {
    num: "04",
    title: "PROPERTY MART",
    category: "FULL-STACK MERN REAL ESTATE PLATFORM",
    desc: "Property Mart is a full-stack real estate platform built to streamline property discovery, listing management, and buyer-seller interactions. It focuses on a modern browsing experience, structured listing workflows, and scalable platform architecture for real-world property operations.",
    image: propertyMartImg,
    imageMode: "contain",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "JWT", "OAuth"],
  },
] as const;

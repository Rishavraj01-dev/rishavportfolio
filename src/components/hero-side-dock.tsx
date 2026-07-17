import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, BookOpen, BriefcaseBusiness, Clock, Cpu, ExternalLink, FileText, Layers3, Mail, Maximize2, Minus, UserRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RiLinkedinFill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { blogs } from "@/lib/blogs";
import ProjectPicture from "@/components/project-picture";
import { capabilities, experience, projects, techStack } from "@/lib/portfolio-content";

type DockAppId = "about" | "capabilities" | "stack" | "projects" | "experience" | "insights" | "contact";

type DockItem = {
  label: string;
  icon?: LucideIcon;
  brand?: "github" | "linkedin";
  className: string;
  iconClassName?: string;
} & (
  | { type: "app"; id: DockAppId }
  | { type: "link"; href: string }
);

const dockItems: DockItem[] = [
  { type: "app", id: "about", label: "About", icon: UserRound, className: "from-sky-300 via-blue-500 to-indigo-700" },
  { type: "app", id: "capabilities", label: "Capabilities", icon: Cpu, className: "from-rose-300 via-pink-500 to-fuchsia-800" },
  { type: "app", id: "stack", label: "Stack", icon: Layers3, className: "from-emerald-300 via-teal-500 to-cyan-700" },
  { type: "app", id: "projects", label: "Projects", icon: BriefcaseBusiness, className: "from-cyan-300 via-blue-500 to-blue-900" },
  { type: "app", id: "experience", label: "Experience", icon: FileText, className: "from-amber-200 via-orange-400 to-rose-600" },
  { type: "app", id: "insights", label: "Insights", icon: BookOpen, className: "from-violet-300 via-purple-500 to-fuchsia-800" },
  { type: "app", id: "contact", label: "Contact", icon: Mail, className: "from-slate-100 via-slate-300 to-slate-600", iconClassName: "text-slate-950" },
  { type: "link", label: "GitHub", href: "https://github.com/Rishavraj01-dev", brand: "github", className: "from-white via-slate-100 to-slate-300" },
  { type: "link", label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-raj-1602-/", brand: "linkedin", className: "from-sky-400 via-blue-600 to-blue-900" },
];

const appCopy: Record<DockAppId, { eyebrow: string; title: string[]; subtitle: string }> = {
  about: {
    eyebrow: "05 / About",
    title: ["INSIDE THE", "SYSTEM"],
    subtitle: "Product thinking, engineering discipline, and practical execution in one workflow.",
  },
  capabilities: {
    eyebrow: "01 / Capabilities",
    title: ["OPERATIONAL", "PARAMETERS"],
    subtitle: "The things I can turn into production-ready product experiences.",
  },
  stack: {
    eyebrow: "02 / Tech Stack",
    title: ["CORE", "PROTOCOLS"],
    subtitle: "A carefully curated stack optimized for performance, scalability, and developer experience.",
  },
  projects: {
    eyebrow: "03 / Projects",
    title: ["FEATURED", "ARCHIVES"],
    subtitle: "Selected systems from full-stack products, healthcare platforms, AI utilities, and real estate workflows.",
  },
  experience: {
    eyebrow: "04 / Experience",
    title: ["OPERATIONAL", "HISTORY"],
    subtitle: "Professional work and the kind of ownership I bring into teams.",
  },
  insights: {
    eyebrow: "06 / Writing",
    title: ["LATEST", "INSIGHTS"],
    subtitle: "Notes on product thinking, systems, AI, and the engineering lessons behind the work.",
  },
  contact: {
    eyebrow: "07 / Contact",
    title: ["LET\'S", "BUILD."],
    subtitle: "Ready to architect something extraordinary? Secure channels open for visionary collaborations and high-impact projects.",
  },
};

function IconGlyph({ item }: { item: DockItem }) {
  const Icon = item.icon;

  return (
    <span className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1rem] bg-gradient-to-br ${item.className} shadow-[inset_0_1px_1px_rgba(255,255,255,0.72),inset_0_-14px_24px_rgba(0,0,0,0.22),0_10px_22px_rgba(0,0,0,0.34)] transition duration-200 sm:h-12 sm:w-12`}>
      <span className="absolute inset-[1px] rounded-[0.92rem] bg-gradient-to-b from-white/42 via-transparent to-black/18" />
      <span className="absolute left-2 top-2 h-3 w-5 rounded-full bg-white/22 blur-[1px]" />
      {Icon ? <Icon className={`relative h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.28)] sm:h-6.5 sm:w-6.5 ${item.iconClassName ?? ""}`} strokeWidth={2.35} /> : null}
      {item.brand === "github" ? <SiGithub className="relative h-6 w-6 text-slate-950 drop-shadow-[0_2px_3px_rgba(255,255,255,0.28)] sm:h-7 sm:w-7" /> : null}
      {item.brand === "linkedin" ? <RiLinkedinFill className="relative h-7 w-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" /> : null}
    </span>
  );
}

function DockIcon({ item, active, onOpen }: { item: DockItem; active: boolean; onOpen: (id: DockAppId, trigger: HTMLButtonElement) => void }) {
  const className = "group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-200 hover:translate-x-1.5 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70 sm:h-13 sm:w-13";
  const tooltip = (
    <span className="pointer-events-none absolute left-[calc(100%+0.65rem)] top-1/2 z-20 -translate-y-1/2 translate-x-1 scale-95 whitespace-nowrap rounded-lg border border-white/20 bg-slate-950/82 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-150 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
      {item.label}
      <span className="absolute right-full top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1 rotate-45 border-b border-l border-white/20 bg-slate-950/82" />
    </span>
  );

  if (item.type === "link") {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className} aria-label={item.label}>
        <IconGlyph item={item} />
        {tooltip}
      </a>
    );
  }

  return (
    <button type="button" onClick={(event) => onOpen(item.id, event.currentTarget)} className={className} aria-label={`Open ${item.label}`} aria-haspopup="dialog" aria-expanded={active} aria-controls={active ? "portfolio-dock-window" : undefined}>
      {active ? <span className="absolute -left-2 h-6 w-1 rounded-r-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.78)]" /> : null}
      <IconGlyph item={item} />
      {tooltip}
    </button>
  );
}

function WindowHeader({ active, onClose }: { active: DockAppId; onClose: () => void }) {
  const activeItem = dockItems.find((item) => item.type === "app" && item.id === active);
  const copy = appCopy[active];

  return (
    <div className="flex h-12 items-center justify-between gap-3 border-b border-white/10 bg-white/8 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onClose} className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57] text-red-950/0 transition hover:text-red-950 focus:outline-none focus:ring-2 focus:ring-white/70" aria-label="Close window">
          <X className="h-2.5 w-2.5" />
        </button>
        <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-white/78">
        {activeItem ? <span className="scale-75"><IconGlyph item={activeItem} /></span> : null}
        <span id="portfolio-dock-window-title" className="truncate">{copy.title.join(" ")}</span>
      </div>
      <div className="flex w-14 justify-end gap-2 text-white/45">
        <Minus className="h-4 w-4" />
        <Maximize2 className="h-4 w-4" />
      </div>
    </div>
  );
}

function SectionHeader({ active, centered = false }: { active: DockAppId; centered?: boolean }) {
  const copy = appCopy[active];

  return (
    <div className={`relative z-10 mb-12 ${centered ? "text-center" : ""}`}>
      <span className={`mb-5 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-primary ${centered ? "justify-center" : ""}`}>
        <span className="h-[1px] w-10 bg-primary" />
        {copy.eyebrow}
        {centered ? <span className="h-[1px] w-10 bg-primary" /> : null}
      </span>
      <h2 className="text-3xl font-display font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">
        {copy.title.map((line) => (
          <span key={line} className={active === "contact" && line === "BUILD." ? "block bg-gradient-to-r from-primary via-[#a78bfa] to-secondary bg-clip-text text-transparent" : "block"}>{line}</span>
        ))}
      </h2>
      <p className={`mt-6 max-w-xl text-sm font-light leading-relaxed text-muted-foreground ${centered ? "mx-auto" : ""}`}>{copy.subtitle}</p>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[320px] w-[320px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-secondary/6 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(hsl(190 100% 50% / 1) 1px, transparent 1px), linear-gradient(to right, hsl(190 100% 50% / 1) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>
      <SectionHeader active="about" />
      <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_360px] xl:items-start">
        <div className="max-w-3xl">
          <p className="max-w-xl text-xs font-mono uppercase tracking-[0.18em] text-white/45 sm:text-sm sm:tracking-[0.22em]">
            Product thinking, engineering discipline, and practical execution in one workflow.
          </p>
          <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
            <p>I build digital products that balance visual polish with engineering discipline, so the experience feels sharp for users and stays maintainable for teams.</p>
            <p>My work spans frontend interfaces, backend systems, and automation workflows, with a focus on performance, clean architecture, and practical execution.</p>
            <p>I enjoy building products that solve real operational problems, from healthcare coordination and job platforms to AI-driven tools and internal systems.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "BUILD MODE", value: "FULL STACK" },
              { label: "SPECIALTY", value: "UI + SYSTEMS" },
              { label: "DELIVERY", value: "SHIP FAST" },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">{item.label}</p>
                <p className="mt-3 font-display text-xl font-bold tracking-wide text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Snapshot</p>
          <div className="space-y-5 text-sm text-muted-foreground">
            {[
              ["Focus", "Full-stack web apps, automation systems, and AI-assisted workflows."],
              ["Approach", "Fast interfaces, secure foundations, scalable structure, and purposeful design."],
              ["Stack", "React.js, Tailwind CSS, Node.js, Express.js, Supabase, Python, FastAPI."],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-white/8 pb-5 last:border-b-0 last:pb-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">{label}</p>
                <p className="leading-7">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["React.js", "Node.js", "Python", "FastAPI"].map((item) => (
              <span key={item} className="border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-primary/90">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilitiesContent() {
  return (
    <div className="px-4 py-10 sm:px-6 md:px-10">
      <SectionHeader active="capabilities" />
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((cap) => (
          <div key={cap.title} className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-primary/40 sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-700 group-hover:translate-x-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <cap.icon className="mb-8 h-9 w-9 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
            <h3 className="mb-4 text-base font-display font-bold tracking-wider transition-colors duration-300 group-hover:text-primary">{cap.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
            <div className="mt-8 h-[1px] w-10 bg-white/10 transition-all duration-700 group-hover:w-full group-hover:bg-primary/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StackContent() {
  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px]" />
      <SectionHeader active="stack" />
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {techStack.map((stack) => (
          <div key={stack.title} className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-primary/30 hover:bg-white/[0.04] sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-primary">{stack.subtitle}</p>
              <h3 className="text-2xl font-display font-bold tracking-tight md:text-3xl">{stack.title}</h3>
            </div>
            <div className="space-y-6">
              {stack.groups.map((group) => (
                <div key={`${stack.title}-${group.label}`} className="border-l border-primary/20 pl-4">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-white/45">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => <span key={`${group.label}-${item}`} className="border border-white/10 bg-background/40 px-3 py-1.5 text-xs font-mono tracking-wide text-white/75 transition-colors group-hover:border-primary/20 group-hover:text-white">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="px-4 py-10 sm:px-6 md:px-10">
      <SectionHeader active="projects" />
      <div className="space-y-16 sm:space-y-20">
        {projects.map((project, index) => (
          <div key={project.title} className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 sm:gap-12 lg:gap-16`}>
            <div className="group relative w-full cursor-pointer lg:w-[58%]">
              <div className="absolute -inset-4 z-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative z-10 aspect-[16/10] overflow-hidden border border-white/10 bg-black">
                <ProjectPicture
                  project={project}
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`h-full w-full ${project.imageMode === "contain" ? "object-contain bg-black p-4" : "object-cover"} opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-0 m-4 border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
            <div className="w-full space-y-5 sm:space-y-7 lg:w-[42%]">
              <div className="inline-block border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[10px] font-mono tracking-[0.25em] text-secondary">{project.category}</div>
              <h3 className="text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">{project.title}</h3>
              <p className="text-base font-light leading-relaxed text-muted-foreground">{project.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((tech) => <span key={tech} className="border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/50 transition-colors hover:border-primary/40 hover:text-primary">{tech}</span>)}
              </div>
              <div className="pt-4">
                <a href={`/projects/${project.slug}`} className="group inline-flex h-12 items-center gap-3 border border-white/12 px-8 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black">
                  <span>View case study</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <SectionHeader active="experience" />
      <div className="relative max-w-3xl space-y-0">
        <div className="absolute bottom-0 left-0 top-0 hidden w-[1px] bg-gradient-to-b from-primary/40 via-white/5 to-transparent md:block" />
        {experience.map((item) => (
          <div key={`${item.year}-${item.role}`} className="group relative flex flex-col gap-6 pb-16 md:flex-row md:gap-16">
            <div className="absolute left-0 top-2 z-10 hidden h-3 w-3 -translate-x-[5px] rounded-full border-2 border-primary bg-background transition-colors duration-300 group-hover:bg-primary md:flex" />
            <div className="shrink-0 md:w-1/3 md:pl-10">
              <span className="mb-2 block font-mono text-[11px] tracking-widest text-primary">{item.year}</span>
            </div>
            <div className="w-full border-b border-white/[0.06] pb-16 group-last:border-0 group-last:pb-0 md:pl-0">
              <h3 className="mb-1 flex flex-wrap items-center gap-2 text-xl font-display font-bold">
                {item.role}
                <span className="text-base font-light text-muted-foreground">@ {item.company}</span>
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsContent() {
  return (
    <div className="px-4 py-10 sm:px-6 md:px-10">
      <SectionHeader active="insights" />
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.slice(0, 6).map((blog) => (
          <div key={blog.slug} className="group relative overflow-hidden border border-white/8 bg-white/[0.015] transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/30">
            <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="block p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-widest text-primary">{blog.date}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-muted-foreground"><Clock className="h-3 w-3" /> {blog.readTime}</span>
              </div>
              <h3 className="mb-5 text-xl font-display font-bold leading-snug transition-colors duration-300 group-hover:text-primary">{blog.title}</h3>
              <p className="mb-10 text-sm leading-7 text-muted-foreground">{blog.intro[0]}</p>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/30 transition-colors duration-300 group-hover:text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Read Full Blog
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[180px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <SectionHeader active="contact" centered />
        <a href="mailto:rishavraj5999@gmail.com" className="group relative mb-12 inline-flex h-14 w-full max-w-sm items-center justify-center gap-3 overflow-hidden bg-white px-6 text-center font-display text-sm font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-primary sm:mb-16 sm:h-16 sm:w-auto sm:px-12 sm:text-base sm:tracking-widest">
          <Mail className="h-5 w-5" />
          <span>START A PROJECT</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
        </a>
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {[
            { icon: SiGithub, label: "GitHub", href: "https://github.com/Rishavraj01-dev" },
            { icon: RiLinkedinFill, label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-raj-1602-/" },
            { icon: Mail, label: "Email", href: "mailto:rishavraj5999@gmail.com" },
          ].map((social) => (
            <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined} className="flex h-12 w-12 items-center justify-center border border-white/10 text-muted-foreground transition-all hover:scale-110 hover:border-primary/40 hover:text-primary sm:h-14 sm:w-14" aria-label={social.label}>
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppContent({ active }: { active: DockAppId }) {
  if (active === "about") return <AboutContent />;
  if (active === "capabilities") return <CapabilitiesContent />;
  if (active === "stack") return <StackContent />;
  if (active === "projects") return <ProjectsContent />;
  if (active === "experience") return <ExperienceContent />;
  if (active === "insights") return <InsightsContent />;
  return <ContactContent />;
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function AppWindow({ active, onClose }: { active: DockAppId; onClose: () => void }) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    windowRef.current?.focus({ preventScroll: true });
  }, [active]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(windowRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    if (!focusable.length) {
      event.preventDefault();
      windowRef.current?.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id="portfolio-dock-window"
      ref={windowRef}
      tabIndex={-1}
      className="fixed bottom-4 left-[86px] right-3 top-[104px] z-[220] sm:left-[96px] sm:right-5 lg:left-[108px] lg:right-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-dock-window-title"
      onKeyDown={handleKeyDown}
    >
      <section className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/14 bg-background/96 text-white shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute left-4 top-16 z-10 h-12 w-12 border-l-2 border-t-2 border-primary/40 md:h-16 md:w-16" />
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 h-12 w-12 border-b-2 border-r-2 border-primary/20 md:h-16 md:w-16" />
        <WindowHeader active={active} onClose={onClose} />
        <div className="min-h-0 flex-1 overflow-auto">
          <AppContent active={active} />
        </div>
      </section>
    </div>
  );
}

export default function HeroSideDock() {
  const [active, setActive] = useState<DockAppId | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openApp = (id: DockAppId, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setActive(id);
  };

  const closeApp = () => {
    setActive(null);
    window.requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (!active) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [active]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-[88px] z-[230] flex w-[74px] flex-col overflow-visible border-r border-white/10 bg-black/72 px-2 py-3 shadow-[14px_0_38px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:w-[82px] lg:px-2.5" aria-label="Portfolio quick links dock">
        <div className="mb-4 flex h-4 items-center gap-1 px-1" aria-hidden="true">
          <span className="h-1.5 w-8 rounded-full bg-white/85 shadow-[0_0_10px_rgba(255,255,255,0.22)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        </div>

        <div className="flex flex-col items-center gap-2.5 overflow-visible">
          {dockItems.map((item) => (
            <DockIcon key={item.label} item={item} active={item.type === "app" && active === item.id} onOpen={openApp} />
          ))}
        </div>

        <div className="mt-auto px-2 pb-1 pt-4" aria-hidden="true">
          <div className="h-px w-full bg-white/18" />
        </div>
      </nav>

      {active ? <AppWindow active={active} onClose={closeApp} /> : null}
    </>
  );
}

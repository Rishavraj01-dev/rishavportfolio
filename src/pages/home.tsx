import { motion, useScroll, useTransform, useSpring, animate, useReducedMotion } from "framer-motion";
import { Terminal, Cpu, Globe, Mail, ArrowRight, ExternalLink, Zap, Network, Shield, Activity, BookOpen, Clock, MapPin, ChevronUp, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { RiLinkedinFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import ProjectPicture from "@/components/project-picture";
import heroImgAvif from "../assets/images/hero-lively-v2.avif";
import heroImg from "../assets/images/hero-lively-v2.png";
import { blogs } from "@/lib/blogs";
import { capabilities, experience, projects, techStack } from "@/lib/portfolio-content";
import { siteConfig } from "@/lib/site-config";

const TYPED_WORDS = ["Full Stack Developer", "React + Node.js Builder", "Python Automation", "AI Workflow Developer"];

function useTyped(words: string[], speed = 80, pause = 1800, disabled = false) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (disabled) {
      setDisplay(words[0] ?? "");
      return;
    }

    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause, disabled]);

  return display;
}

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        animate(0, to, {
          duration,
          ease: "easeOut",
          onUpdate(v) { el.textContent = Math.round(v).toString(); }
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, shouldReduceMotion]);

  if (shouldReduceMotion) return <span>{to}</span>;

  return <span ref={ref}>0</span>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -60]);
  const shouldReduceMotion = useReducedMotion();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const typed = useTyped(TYPED_WORDS, 80, 1800, Boolean(shouldReduceMotion));

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      const { clientX, clientY } = event;
      frame = window.requestAnimationFrame(() => {
        setMouse({ x: clientX, y: clientY });
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    let visible = window.scrollY > 500;
    setShowScrollTop(visible);

    const onScroll = () => {
      const nextVisible = window.scrollY > 500;
      if (nextVisible !== visible) {
        visible = nextVisible;
        setShowScrollTop(nextVisible);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#insights") {
      requestAnimationFrame(() => {
        const insightsSection = document.getElementById("insights");
        insightsSection?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">

      {/* === CURSOR GLOW === */}
      {!shouldReduceMotion ? (
        <motion.div
          className="fixed pointer-events-none z-50 hidden h-[600px] w-[600px] rounded-full mix-blend-screen md:block"
          style={{
            x: mouse.x - 300,
            y: mouse.y - 300,
            background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      ) : null}

      {/* === AMBIENT ORBS === */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(190 100% 50% / 1) 1px, transparent 1px), linear-gradient(to right, hsl(190 100% 50% / 1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* === SCROLL PROGRESS === */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary z-[60] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      <motion.button
        type="button"
        onClick={handleScrollToTop}
        initial={false}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 16,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-22 right-4 z-[70] flex h-13 w-13 items-center justify-center border border-primary/30 bg-background/80 text-primary shadow-lg backdrop-blur-xl transition-colors hover:border-primary hover:bg-primary/10 hover:text-white md:bottom-24 md:right-8"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>

      <SiteNav />

      <main id="main-content" className="relative z-10">

        {/* ===================== HERO ===================== */}
        <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden pt-28 pb-12 sm:min-h-[84vh] sm:pt-24 sm:pb-14">

          {/* BG hero image — behind everything */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source srcSet={heroImgAvif} type="image/avif" />
              <img src={heroImg} alt="Abstract dark portfolio background with angular light streaks" width={1568} height={1003} fetchPriority="high" decoding="async" className="w-full h-full object-cover opacity-[0.28] mix-blend-screen" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          </div>

          {/* Decorative corner lines */}
          <div className="absolute left-4 top-28 z-10 hidden h-12 w-12 border-l-2 border-t-2 border-primary/40 md:block md:h-16 md:w-16 md:left-8 md:top-24" />
          <div className="absolute right-4 top-28 z-10 hidden h-12 w-12 border-r-2 border-t-2 border-primary/40 md:block md:h-16 md:w-16 md:right-8 md:top-24" />
          <div className="absolute bottom-12 left-4 z-10 hidden h-12 w-12 border-b-2 border-l-2 border-primary/20 md:block md:h-16 md:w-16 md:left-8" />
          <div className="absolute bottom-12 right-4 z-10 hidden h-12 w-12 border-b-2 border-r-2 border-primary/20 md:block md:h-16 md:w-16 md:right-8" />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 md:px-12"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 border border-primary/25 bg-primary/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-primary backdrop-blur-md sm:mb-8 sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for new projects
              <span className="w-[1px] h-3 bg-primary/40" />
              <MapPin className="w-3 h-3" /> New Delhi
            </motion.div>

            {/* Main name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="mb-5 text-[clamp(2.8rem,14vw,8rem)] font-display font-bold leading-[0.9] tracking-[-0.04em] sm:leading-[0.88]">
                <span className="block text-white/90">RISHAV</span>
                <span className="block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#a78bfa] to-secondary">RAJ</span>
                  {/* glow clone */}
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary blur-2xl opacity-50 select-none">RAJ</span>
                </span>
              </h1>
            </motion.div>

            {/* Typewriter subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-5 flex items-center justify-center gap-2 sm:gap-3"
            >
              <span className="hidden h-[1px] w-8 bg-primary/60 sm:block" />
              <span className="min-h-[1.75rem] text-base font-mono tracking-[0.15em] text-primary sm:min-h-[2rem] sm:text-lg sm:tracking-widest md:text-2xl">
                {typed}<span className="animate-pulse ml-0.5">|</span>
              </span>
              <span className="hidden h-[1px] w-8 bg-primary/60 sm:block" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:mb-10 md:text-[1.15rem]"
            >
              I am Rishav Raj, a full-stack developer building React, Tailwind CSS, Node.js, Express, Supabase, Python, FastAPI, and AI-assisted workflows for portfolios, dashboards, internal tools, and product platforms.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/60 sm:mb-10"
              aria-label="Primary portfolio services and technologies"
            >
              {["Full-stack web apps", "React interfaces", "Node.js APIs", "Python automation", "AI workflows"].map((item) => (
                <li key={item} className="border border-white/10 bg-white/[0.025] px-3 py-1.5">{item}</li>
              ))}
            </motion.ul>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:mb-14 sm:gap-4"
            >
              <a
                href="/projects"
                className="group relative flex h-12 w-full max-w-xs items-center justify-center gap-3 overflow-hidden bg-primary px-6 text-center font-display text-xs font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-white active:bg-white sm:h-14 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest"
              >
                <span className="relative z-10">VIEW PROJECTS</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
              </a>
              <a
                href="/contact"
                className="flex h-12 w-full max-w-xs items-center justify-center gap-3 border border-white/15 px-6 text-center font-mono text-xs tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-primary active:border-primary/50 active:text-primary sm:h-14 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest"
              >
                CONTACT RISHAV
              </a>
              <a
                href="/about"
                className="flex h-12 w-full max-w-xs items-center justify-center gap-3 border border-white/15 px-6 text-center font-mono text-xs tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-primary active:border-primary/50 active:text-primary sm:h-14 sm:w-auto sm:px-10 sm:text-sm sm:tracking-widest"
              >
                ABOUT RISHAV
              </a>
              <div className="flex items-center gap-2 sm:gap-3">
                {[
                  { icon: SiGithub, label: "GitHub", href: "https://github.com/Rishavraj01-dev" },
                  { icon: RiLinkedinFill, label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-raj-1602-/" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    data-testid={`link-${s.label.toLowerCase()}`}
                    className="flex h-12 w-12 items-center justify-center border border-white/10 text-muted-foreground backdrop-blur-sm transition-all hover:scale-110 hover:border-primary/50 hover:text-primary active:scale-110 active:border-primary/50 active:text-primary sm:h-14 sm:w-14"
                    aria-label={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="mx-auto grid max-w-[44rem] grid-cols-1 divide-y divide-white/8 border border-white/8 bg-white/[0.02] backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              {[
                { label: "Years Experience", value: 2, suffix: "+" },
                { label: "Projects Shipped", value: 15, suffix: "+" },
                { label: "Clients Worldwide", value: 5, suffix: "+" },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-4 text-center sm:py-5">
                  <div className="mb-1 text-2xl font-display font-bold text-primary sm:text-3xl">
                    <CountUp to={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground sm:tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </section>

        {/* ===================== CAPABILITIES ===================== */}
        <section id="capabilities" className="relative border-t border-white/[0.06] px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-5">
              <span className="w-10 h-[1px] bg-primary" />
              01 / Capabilities
            </span>
            <h2 className="text-3xl font-display font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">OPERATIONAL<br />PARAMETERS</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.article
                key={cap.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-primary/40 active:border-primary/40 sm:p-8"
              >
                <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-700 group-hover:translate-x-full group-active:translate-x-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
                <cap.icon className="mb-8 h-9 w-9 text-primary/60 transition-colors duration-300 group-hover:text-primary group-active:text-primary" />
                <h3 className="text-base font-display font-bold tracking-wider mb-4 transition-colors duration-300 group-hover:text-primary group-active:text-primary">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                <div className="mt-8 h-[1px] w-10 bg-white/10 transition-all duration-700 group-hover:w-full group-hover:bg-primary/40 group-active:w-full group-active:bg-primary/40" />
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================== TECH STACK ===================== */}
        <section id="stack" className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-5">
              <span className="w-10 h-[1px] bg-primary" />
              02 / Tech Stack
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-6xl">CORE<br />PROTOCOLS</h2>
              <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                A carefully curated stack optimized for performance, scalability, and developer experience.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {techStack.map((stack, i) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-primary/30 hover:bg-white/[0.04] active:border-primary/30 active:bg-white/[0.04] sm:p-8"
              >
                <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-1000 group-hover:translate-x-full group-active:translate-x-full" />
                <div className="mb-8">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-primary uppercase mb-3">{stack.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">{stack.title}</h3>
                </div>

                <div className="space-y-6">
                  {stack.groups.map((group) => (
                    <div key={`${stack.title}-${group.label}`} className="border-l border-primary/20 pl-4">
                      <p className="text-xs font-mono tracking-[0.2em] text-white/45 uppercase mb-3">{group.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={`${group.label}-${item}`}
                            className="px-3 py-1.5 text-xs font-mono tracking-wide border border-white/10 bg-background/40 text-white/75 transition-colors group-hover:border-primary/20 group-hover:text-white group-active:border-primary/20 group-active:text-white"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================== PROJECTS ===================== */}
        <section id="projects" className="border-t border-white/[0.06] px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 sm:mb-20 md:mb-24"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-5">
              <span className="w-10 h-[1px] bg-primary" />
              03 / Projects
            </span>
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-6xl">FEATURED<br />ARCHIVES</h2>
          </motion.div>

          <div className="space-y-20 sm:space-y-28 md:space-y-36">
            {projects.map((project, i) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 sm:gap-12 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-[58%] relative group cursor-pointer">
                  <div className="absolute -inset-4 z-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 group-active:opacity-100" />
                  <div className="relative z-10 aspect-[16/10] border border-white/10 overflow-hidden bg-black">
                    <ProjectPicture
                      project={project}
                      loading="lazy"
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      className={`w-full h-full ${
                        project.imageMode === "contain" ? "object-contain bg-black p-4" : "object-cover"
                      } opacity-60 transition-[opacity,transform] duration-700 group-hover:scale-[1.05] group-hover:opacity-100 group-active:scale-[1.02] group-active:opacity-100`}
                    />
                    <div className="pointer-events-none absolute inset-0 m-4 border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full space-y-5 sm:space-y-7 lg:w-[42%]">
                  <div className="inline-block text-[10px] font-mono tracking-[0.25em] text-secondary px-3 py-1.5 border border-secondary/20 bg-secondary/5">{project.category}</div>
                  <h3 className="text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">{project.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-light">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-white/10 text-white/50 transition-colors hover:border-primary/40 hover:text-primary active:border-primary/40 active:text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <a href={`/projects/${project.slug}`} data-testid={`link-project-${i}`} className="group inline-flex h-12 items-center gap-3 border border-white/12 px-8 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black active:bg-white active:text-black">
                      <span>View case study</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================== EXPERIENCE ===================== */}
        <section id="experience" className="relative overflow-hidden border-t border-white/[0.06] px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-5">
              <span className="w-10 h-[1px] bg-primary" />
              04 / Experience
            </span>
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-6xl">OPERATIONAL<br />HISTORY</h2>
          </motion.div>

          <div className="max-w-3xl space-y-0 relative">
            {/* vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-white/5 to-transparent hidden md:block" />

            {experience.map((item, i) => (
              <motion.article
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-16 pb-16 group"
              >
                {/* dot on timeline */}
                <div className="z-10 absolute left-0 top-2 hidden h-3 w-3 -translate-x-[5px] rounded-full border-2 border-primary bg-background transition-colors duration-300 group-hover:bg-primary group-active:bg-primary md:flex" />

                <div className="md:pl-10 md:w-1/3 shrink-0">
                  <span className="font-mono text-[11px] text-primary tracking-widest block mb-2">{item.year}</span>
                </div>

                <div className="md:pl-0 border-b border-white/[0.06] pb-16 w-full group-last:border-0 group-last:pb-0">
                  <h3 className="text-xl font-display font-bold mb-1 flex flex-wrap items-center gap-2">
                    {item.role}
                    <span className="text-muted-foreground font-light text-base">@ {item.company}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="relative overflow-hidden border-t border-white/[0.06] px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-[320px] w-[320px] rounded-full bg-primary/6 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-secondary/6 blur-[120px]" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(hsl(190 100% 50% / 1) 1px, transparent 1px), linear-gradient(to right, hsl(190 100% 50% / 1) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="mb-5 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-primary">
              <span className="h-[1px] w-10 bg-primary" />
              05 / About
            </span>
            <div className="grid gap-8 sm:gap-10 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-start">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-6xl">INSIDE THE<br />SYSTEM</h2>
                <p className="mt-6 max-w-xl text-xs font-mono uppercase tracking-[0.18em] text-white/45 sm:text-sm sm:tracking-[0.22em]">
                  Product thinking, engineering discipline, and practical execution in one workflow.
                </p>
                <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
                  <p>
                    I am a full-stack developer focused on React interfaces, Node.js and Express APIs, Supabase-backed workflows, Python automation, and practical AI-assisted features.
                  </p>
                  <p>
                    My approach is to clarify the user flow first, then connect the interface, backend logic, authentication, and data model so the product remains usable and maintainable.
                  </p>
                  <p>
                    Current work and project focus includes job portals, ERP workflows, healthcare coordination, real-estate listing systems, portfolios, internal tools, and AI workflow utilities.
                  </p>
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
                    <span key={item} className="border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-primary/90">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-3 border border-white/12 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:border-primary/40 active:bg-primary/5 active:text-primary"
                  >
                    Open Full About Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================== INSIGHTS ===================== */}
        <section id="insights" className="border-t border-white/[0.06] px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <span className="flex items-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-5">
              <span className="w-10 h-[1px] bg-primary" />
              06 / Writing
            </span>
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl md:text-6xl">LATEST<br />INSIGHTS</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {blogs.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                whileTap={{ y: -3 }}
                className="group relative overflow-hidden border border-white/8 bg-white/[0.015] transition-all duration-400 hover:border-primary/30"
              >
                <Link
                  href={`/blog/${a.slug}?from=home-insights`}
                  data-testid={`link-article-${i}`}
                  className="block p-6 sm:p-8"
                >
                  <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-primary">{a.date}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-muted-foreground">
                      <Clock className="w-3 h-3" /> {a.readTime}
                    </span>
                  </div>
                  <h3 className="mb-5 text-xl font-display font-bold leading-snug transition-colors duration-300 group-hover:text-primary group-active:text-primary">
                    {a.title}
                  </h3>
                  <p className="mb-10 text-sm leading-7 text-muted-foreground">
                    {a.intro[0]}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/30 transition-colors duration-300 group-hover:text-primary group-active:text-primary">
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Full Blog
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================== PHILOSOPHY / QUOTE ===================== */}
        <section className="relative overflow-hidden border-y border-white/[0.06] px-4 py-24 sm:px-6 md:px-16 md:py-32 lg:px-24 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.04]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(190 100% 50% / 1) 39px, hsl(190 100% 50% / 1) 40px)" }} />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <Star className="w-8 h-8 text-primary/60 mx-auto mb-10" />
            <blockquote className="mb-8 text-2xl font-display font-bold leading-[1.25] tracking-tight sm:mb-10 sm:text-3xl md:text-4xl lg:text-5xl">
              "Design without engineering is{" "}
              <span className="text-muted-foreground">decoration.</span>
              {" "}Engineering without design is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">machinery.</span>"
            </blockquote>
            <p className="mx-auto max-w-2xl text-base font-light text-muted-foreground sm:text-lg">
              I build interfaces that respect the user's intelligence and time. No dark patterns. No bloated code. Pure, precise execution of vision.
            </p>
          </motion.div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-16 md:py-32 lg:px-24 lg:py-40">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <span className="flex items-center justify-center gap-3 text-[11px] font-mono text-primary tracking-[0.25em] uppercase mb-8">
              <span className="w-10 h-[1px] bg-primary" />
              07 / Contact
              <span className="w-10 h-[1px] bg-primary" />
            </span>
            <h2 className="mb-8 text-[clamp(2.8rem,14vw,8rem)] font-display font-bold tracking-[-0.04em]">
              LET'S<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#a78bfa] to-secondary">BUILD.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:mb-14 sm:text-xl">
              Contact me for portfolio builds, full-stack products, dashboards, internal tools, automation workflows, or collaboration on practical web applications. Share the goal, users, timeline, and current stage of the project.
            </p>

            <a
              href="mailto:rishavraj5999@gmail.com"
              data-testid="link-contact-email"
                className="group relative mb-12 inline-flex h-14 w-full max-w-sm items-center justify-center gap-3 overflow-hidden bg-white px-6 text-center font-display text-sm font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-primary active:bg-primary sm:mb-16 sm:h-16 sm:w-auto sm:px-12 sm:text-base sm:tracking-widest"
            >
              <Mail className="w-5 h-5" />
              <span>START A PROJECT</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 group-active:translate-x-2" />
            </a>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {[
                { icon: SiGithub, label: "GitHub", href: "https://github.com/Rishavraj01-dev" },
                { icon: Network, label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-raj-1602-/" },
                { icon: Globe, label: "Website", href: siteConfig.siteUrl },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  data-testid={`link-social-${s.label.toLowerCase()}`}
                  className="flex h-12 w-12 items-center justify-center border border-white/10 text-muted-foreground transition-all hover:scale-110 hover:border-primary/40 hover:text-primary active:scale-110 active:border-primary/40 active:text-primary"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="border-t border-white/[0.06] px-4 py-8 sm:px-6 md:px-16">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-[10px] font-mono tracking-[0.18em] text-muted-foreground sm:text-[11px] sm:tracking-widest md:flex-row md:text-left">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              RISHAV.RAJ — CREATIVE TECHNOLOGIST
            </div>
            <nav aria-label="Footer portfolio links" className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:gap-4">
              <a href="/projects" className="transition-colors hover:text-primary">Projects</a>
              <a href="/about" className="transition-colors hover:text-primary">About</a>
              <a href="/stack" className="transition-colors hover:text-primary">Skills</a>
              <a href="/capabilities" className="transition-colors hover:text-primary">Services</a>
              <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
            </nav>
            <span>© 2026 ALL SYSTEMS OPERATIONAL</span>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
              SYSTEM ONLINE / v2.4.0
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}



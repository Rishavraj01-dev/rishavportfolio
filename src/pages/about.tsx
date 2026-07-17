import { motion } from "framer-motion";
import { ArrowRight, Terminal, User, Layers, Rocket } from "lucide-react";
import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import rishavImg from "../assets/images/rishav.jpeg";

const principles = [
  {
    icon: User,
    title: "Human-Centered Interfaces",
    desc: "I focus on experiences that feel fast, clear, and respectful. Every screen should reduce friction and help people move with confidence.",
  },
  {
    icon: Layers,
    title: "Clean Full-Stack Systems",
    desc: "From frontend architecture to backend workflows, I care about maintainable systems that can scale without turning into a mess later.",
  },
  {
    icon: Rocket,
    title: "Practical Shipping Mindset",
    desc: "I like building things that go live, get used, and solve real problems. Speed matters, but so do reliability and polish.",
  },
];

const focusAreas = [
  ["Specialization", "Full-stack web apps, React interfaces, backend APIs, Python automation, and AI-assisted workflows."],
  ["Main stack", "React.js, Tailwind CSS, Node.js, Express.js, Supabase, MongoDB, Python, Flask, and FastAPI."],
  ["Current focus", "Job portals, ERP workflows, healthcare coordination, real-estate platforms, portfolios, internal tools, and practical automation."],
  ["Opportunities", "Portfolio builds, product interfaces, dashboards, full-stack systems, collaborations, and freelance development work."],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <SiteNav />

      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 md:px-12 md:pb-20 md:pt-36 lg:px-20 xl:px-24">
        <article className="w-full">
          <header className="mb-12 border border-white/10 bg-white/[0.03] p-5 sm:p-8 md:mb-16 md:p-12 xl:p-16">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:mb-6 sm:gap-3 sm:text-[11px] sm:tracking-[0.25em]">
              <Terminal className="h-4 w-4" />
              About / Rishav Raj
            </div>
            <div className="grid items-start gap-8 sm:gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div>
                <h1 className="mb-4 text-3xl font-display font-bold tracking-[-0.04em] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                  Rishav Raj builds full-stack web products
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    with clear interfaces and practical systems.
                  </span>
                </h1>
                <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:space-y-5 sm:text-[15px] sm:leading-7 md:text-base md:leading-8">
                  <p>
                    I am a full-stack developer working across frontend, backend, databases, automation, and AI-assisted workflows. My work combines React and Tailwind interfaces with Node.js, Express, Supabase, MongoDB, Python, Flask, and FastAPI.
                  </p>
                  <p>
                    My problem-solving approach starts with the user flow: who needs the feature, what they are trying to do, what data moves through the system, and where the interface or backend can remove friction.
                  </p>
                  <p>
                    Current project focus includes job portals, ERP workflows, healthcare coordination platforms, AI utilities, real-estate listing systems, portfolios, dashboards, and internal tools.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/projects" className="inline-flex items-center gap-3 border border-white/12 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white/80 transition-colors hover:border-primary/40 hover:text-primary">
                    View project case studies
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/stack" className="inline-flex items-center gap-3 border border-white/12 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white/80 transition-colors hover:border-primary/40 hover:text-primary">
                    Review technical skills
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <figure className="self-start xl:pt-2">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 z-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative z-10 overflow-hidden border border-white/10 bg-background/50">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={rishavImg}
                      alt="Portrait of Rishav Raj, full-stack developer"
                      width={415}
                      height={621}
                      decoding="async"
                      className="h-[320px] w-full object-contain object-center bg-black/20 p-3 opacity-75 transition-opacity duration-500 group-hover:opacity-100 sm:h-[420px] sm:p-4"
                    />
                    <div className="pointer-events-none absolute inset-0 m-4 border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </figure>
            </div>
          </header>

          <section className="mb-12 grid gap-4 sm:mb-16 sm:gap-6 lg:grid-cols-2" aria-labelledby="about-focus-heading">
            <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-2">
              <h2 id="about-focus-heading" className="mb-5 text-2xl font-display font-bold tracking-tight sm:text-3xl">Profile Snapshot</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {focusAreas.map(([label, value]) => (
                  <div key={label} className="border-l border-primary/30 pl-4">
                    <h3 className="mb-2 text-sm font-display font-bold tracking-wider text-white">{label}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:gap-6 xl:grid-cols-3" aria-label="Working principles">
            {principles.map((item) => (
              <article key={item.title} className="border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-primary/30 sm:p-8">
                <item.icon className="mb-5 h-7 w-7 text-primary sm:mb-6 sm:h-8 sm:w-8" />
                <h2 className="mb-3 text-xl font-display font-bold sm:mb-4 sm:text-2xl">{item.title}</h2>
                <p className="text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </section>

          <section className="mt-12 border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-6 sm:mt-16 sm:p-8 md:p-10 xl:p-12">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.25em]">Let&apos;s Build</p>
            <h2 className="mb-4 text-2xl font-display font-bold tracking-tight">Looking for practical full-stack help?</h2>
            <p className="mb-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mb-8 sm:text-lg sm:leading-8">
              If you want a portfolio, product, internal tool, dashboard, automation workflow, or full-stack platform that feels intentional and production-ready, share the goal and current stage of the work.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-3.5 text-center font-display text-xs font-bold tracking-[0.2em] text-black transition-colors hover:bg-primary sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              CONTACT RISHAV
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

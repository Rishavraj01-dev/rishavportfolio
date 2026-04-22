import { motion } from "framer-motion";
import { ArrowRight, Terminal, User, Layers, Rocket } from "lucide-react";
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <SiteNav />

      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 md:px-12 md:pb-20 md:pt-36 lg:px-20 xl:px-24">
        <div className="w-full">
          <div className="mb-12 border border-white/10 bg-white/[0.03] p-5 sm:p-8 md:mb-16 md:p-12 xl:p-16">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:mb-6 sm:gap-3 sm:text-[11px] sm:tracking-[0.25em]">
              <Terminal className="h-4 w-4" />
              About / Rishav Raj
            </div>
            <div className="grid items-start gap-8 sm:gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div>
                <h1 className="mb-4 text-3xl font-display font-bold tracking-[-0.04em] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                  Building digital systems
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    with clarity and intent.
                  </span>
                </h1>
                <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:space-y-5 sm:text-[15px] sm:leading-7 md:text-base md:leading-8">
                  <p>
                    I work across frontend, backend, and automation with a strong bias toward performance, clean architecture, and real-world usefulness.
                  </p>
                  <p>
                    My focus is on turning ambitious ideas into production-ready products that feel polished on the surface and dependable underneath.
                  </p>
                  <p>
                    Whether it is a healthcare platform, job portal, ERP workflow, or AI-powered utility, I like building systems that are easy to use, easy to maintain, and ready to grow.
                  </p>
                </div>
              </div>
              <div className="self-start xl:pt-2">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 z-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative z-10 overflow-hidden border border-white/10 bg-background/50">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    src={rishavImg}
                    alt="Rishav Raj"
                    className="h-[320px] w-full object-contain object-center bg-black/20 p-3 opacity-75 transition-opacity duration-500 group-hover:opacity-100 sm:h-[420px] sm:p-4"
                  />
                    <div className="pointer-events-none absolute inset-0 m-4 border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 xl:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-primary/30 sm:p-8">
                <item.icon className="mb-5 h-7 w-7 text-primary sm:mb-6 sm:h-8 sm:w-8" />
                <h2 className="mb-3 text-xl font-display font-bold sm:mb-4 sm:text-2xl">{item.title}</h2>
                <p className="text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-6 sm:mt-16 sm:p-8 md:p-10 xl:p-12">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.25em]">Let&apos;s Build</p>
            <p className="mb-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mb-8 sm:text-lg sm:leading-8">
              If you want a portfolio, product, internal tool, or full-stack platform that feels intentional and production-ready, we can build it together.
            </p>
            <a
              href="mailto:rishavraj5999@gmail.com"
              className="inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-3.5 text-center font-display text-xs font-bold tracking-[0.2em] text-black transition-colors hover:bg-primary sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              CONTACT RISHAV
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

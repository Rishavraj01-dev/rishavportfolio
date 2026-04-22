import { ExternalLink } from "lucide-react";
import SectionLayout from "@/components/section-layout";
import { projects } from "@/lib/portfolio-content";

export default function ProjectsPage() {
  return (
    <SectionLayout
      eyebrow="03 / Projects"
      title={<>Projects built around real workflows, real users, and real product constraints.</>}
      description="These selected projects cover hiring, healthcare, automation, and real-estate use cases. Each one reflects a balance of product thinking, interface clarity, and full-stack execution designed for actual usage, not just demo value."
      sideLabel="What Connects Them"
      sideTitle="Different domains, one consistent build mindset."
      sidePoints={[
        "User flows shaped around practical business needs",
        "Architecture planned for scale, roles, and real data handling",
        "Interfaces designed to feel clear, fast, and dependable",
      ]}
    >
      <section className="space-y-16 sm:space-y-20">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`flex flex-col items-center gap-8 border border-white/8 bg-white/[0.02] p-5 sm:p-8 lg:gap-12 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            <div className="w-full lg:w-[56%]">
              <div className="aspect-[16/10] overflow-hidden border border-white/10 bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`h-full w-full ${project.imageMode === "contain" ? "object-contain bg-black p-4" : "object-cover"} opacity-90`}
                />
              </div>
            </div>
            <div className="w-full lg:w-[44%]">
              <div className="mb-4 inline-block border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[10px] font-mono tracking-[0.25em] text-secondary">
                {project.category}
              </div>
              <h2 className="mb-4 text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-4xl">
                {project.num} / {project.title}
              </h2>
              <p className="mb-5 text-base font-light leading-relaxed text-muted-foreground">{project.desc}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
              <a href="#" className="inline-flex h-12 items-center gap-3 border border-white/12 px-8 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black">
                <span>ACCESS SYSTEM</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

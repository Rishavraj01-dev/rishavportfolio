import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import SectionLayout from "@/components/section-layout";
import ProjectPicture from "@/components/project-picture";
import { projects } from "@/lib/portfolio-content";

export default function ProjectsPage() {
  return (
    <SectionLayout
      eyebrow="03 / Projects"
      title={<>Full-stack projects for hiring, healthcare, automation, and real-estate workflows.</>}
      description="These selected projects show how I approach real product problems: define the users, structure the data flow, build the interface, and connect the backend pieces needed for a usable system."
      sideLabel="Project Focus"
      sideTitle="Each project connects product thinking with full-stack implementation."
      sidePoints={[
        "Clear user flows shaped around practical business needs",
        "Frontend, backend, data, and authentication decisions kept visible",
        "Case-study pages explain the problem, users, contribution, features, and stack",
      ]}
    >
      <section className="space-y-16 sm:space-y-20" aria-label="Selected portfolio projects">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={`flex flex-col items-center gap-8 border border-white/8 bg-white/[0.02] p-5 sm:p-8 lg:gap-12 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            <figure className="w-full lg:w-[56%]">
              <div className="aspect-[16/10] overflow-hidden border border-white/10 bg-black">
                <ProjectPicture
                  project={project}
                  loading="lazy"
                  sizes="(min-width: 768px) 44vw, 100vw"
                  className={`h-full w-full ${project.imageMode === "contain" ? "object-contain bg-black p-4" : "object-cover"} opacity-70 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100`}
                />
              </div>
            </figure>
            <div className="w-full lg:w-[44%]">
              <p className="mb-4 inline-block border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-secondary">
                {project.category}
              </p>
              <h2 className="mb-4 text-2xl font-display font-bold tracking-tight sm:text-3xl md:text-4xl">
                {project.num} / {project.title}
              </h2>
              <p className="mb-4 text-base font-light leading-relaxed text-muted-foreground">{project.problem}</p>
              <p className="mb-5 text-sm leading-7 text-muted-foreground">{project.contribution}</p>
              <div className="mb-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="inline-flex h-12 items-center gap-3 border border-white/12 px-8 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black">
                <span>View {project.title} case study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

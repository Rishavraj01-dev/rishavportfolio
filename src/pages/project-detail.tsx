import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteNav from "@/components/site-nav";
import ProjectPicture from "@/components/project-picture";
import NotFound from "@/pages/not-found";
import { getProjectBySlug, projects } from "@/lib/portfolio-content";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return <NotFound />;
  }

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <SiteNav />

      <main id="main-content" className="relative z-10 px-4 pb-16 pt-28 sm:px-6 md:px-12 md:pb-20 md:pt-36 lg:px-20 xl:px-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </nav>

        <article className="border border-white/10 bg-white/[0.03] p-5 sm:p-8 md:p-12 xl:p-16">
          <header className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] xl:items-start">
            <div>
              <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-primary sm:text-[11px]">
                {project.num} / {project.category}
              </p>
              <h1 className="mb-5 text-3xl font-display font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {project.desc}
              </p>
            </div>
            <aside className="border border-white/10 bg-background/40 p-5 sm:p-6" aria-label={`${project.title} technologies`}>
              <h2 className="mb-4 text-lg font-display font-bold tracking-tight text-white">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
            </aside>
          </header>

          <figure className="my-10 overflow-hidden border border-white/10 bg-black">
            <ProjectPicture
              project={project}
              loading="eager"
              sizes="(min-width: 1280px) 70vw, (min-width: 768px) 86vw, 100vw"
              className={`h-full max-h-[560px] w-full ${project.imageMode === "contain" ? "object-contain bg-black p-4" : "object-cover"}`}
            />
          </figure>

          <section aria-labelledby="project-context" className="grid gap-4 md:grid-cols-3">
            {[
              ["Problem Solved", project.problem],
              ["Intended Users", project.intendedUsers],
              ["Main Contribution", project.contribution],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-white/[0.02] p-5">
                <h2 id={label === "Problem Solved" ? "project-context" : undefined} className="mb-3 text-base font-display font-bold tracking-wider text-white">
                  {label}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">{value}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="project-features" className="mt-10 border-t border-white/[0.08] pt-10">
            <h2 id="project-features" className="mb-6 text-2xl font-display font-bold tracking-tight sm:text-3xl">
              Important Features
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="border-l border-primary/30 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="project-links" className="mt-10 border-t border-white/[0.08] pt-10">
            <h2 id="project-links" className="mb-4 text-xl font-display font-bold tracking-tight">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex h-12 items-center gap-3 border border-white/12 px-6 font-mono text-[11px] uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-primary/40 hover:text-primary">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex h-12 items-center gap-3 bg-white px-6 font-mono text-[11px] uppercase tracking-widest text-black transition-all duration-300 hover:bg-primary">
                Discuss a similar build
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </article>

        <aside className="mt-12 border border-white/10 bg-white/[0.02] p-6 sm:p-8" aria-labelledby="related-projects">
          <h2 id="related-projects" className="mb-5 text-xl font-display font-bold tracking-tight">Related Projects</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`} className="border border-white/10 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.category}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

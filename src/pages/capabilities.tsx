import SectionLayout from "@/components/section-layout";
import { capabilities, services } from "@/lib/portfolio-content";

export default function CapabilitiesPage() {
  return (
    <SectionLayout
      eyebrow="01 / Services"
      title={<>Services and capabilities for practical full-stack product work.</>}
      description="I help with polished portfolio websites, product interfaces, full-stack web applications, internal tools, dashboards, Python automation, and practical AI-assisted workflows."
      sideLabel="Service Fit"
      sideTitle="Best for work that needs clear UI plus dependable implementation."
      sidePoints={[
        "Portfolio and product interfaces for public-facing clarity",
        "Full-stack applications with frontend, backend, data, and auth flows",
        "Automation and AI workflow support for repetitive or structured tasks",
      ]}
    >
      <section className="mb-12 grid gap-4 sm:gap-6 lg:grid-cols-3" aria-labelledby="services-heading">
        <div className="lg:col-span-3">
          <h2 id="services-heading" className="mb-4 text-2xl font-display font-bold tracking-tight sm:text-3xl">What I Can Help Build</h2>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            These services are based on the real project work shown across this portfolio: interfaces, full-stack systems, dashboards, APIs, automation, and AI-assisted product workflows.
          </p>
        </div>
        {services.map((service) => (
          <article key={service.title} className="border border-white/8 bg-white/[0.02] p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-display font-bold tracking-tight">{service.title}</h3>
            <p className="mb-4 text-sm leading-7 text-muted-foreground">{service.audience}</p>
            <p className="mb-5 text-sm leading-7 text-muted-foreground">{service.problem}</p>
            <div className="flex flex-wrap gap-2" aria-label={`${service.title} technologies`}>
              {service.technologies.map((tech) => (
                <span key={tech} className="border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/60">{tech}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="technical-capabilities-heading">
        <h2 id="technical-capabilities-heading" className="mb-6 text-2xl font-display font-bold tracking-tight sm:text-3xl">Technical Capabilities</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((cap) => (
          <article key={cap.title} className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-primary/40 sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-700 group-hover:translate-x-full" />
            <cap.icon className="mb-8 h-9 w-9 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
            <h3 className="mb-4 text-base font-display font-bold tracking-wider transition-colors duration-300 group-hover:text-primary">
              {cap.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
          </article>
        ))}
        </div>
      </section>
    </SectionLayout>
  );
}

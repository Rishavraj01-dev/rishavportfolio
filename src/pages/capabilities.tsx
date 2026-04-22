import SectionLayout from "@/components/section-layout";
import { capabilities } from "@/lib/portfolio-content";

export default function CapabilitiesPage() {
  return (
    <SectionLayout
      eyebrow="01 / Capabilities"
      title={<>Capabilities that turn ideas into fast, useful, production-ready products.</>}
      description="This page brings together the core strengths behind my work: polished interfaces, scalable architecture, backend logic, AI-assisted problem-solving, and automation that helps teams move faster without losing quality."
      sideLabel="Core Focus"
      sideTitle="Execution across interface, system, and delivery."
      sidePoints={[
        "Frontend craft with strong visual and interaction detail",
        "Full-stack thinking built around maintainability and scale",
        "Automation and AI used where they create practical value",
      ]}
    >
      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((cap) => (
          <article key={cap.title} className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-primary/40 sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-700 group-hover:translate-x-full" />
            <cap.icon className="mb-8 h-9 w-9 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
            <h2 className="mb-4 text-base font-display font-bold tracking-wider transition-colors duration-300 group-hover:text-primary">
              {cap.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

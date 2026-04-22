import SectionLayout from "@/components/section-layout";
import { experience } from "@/lib/portfolio-content";

export default function ExperiencePage() {
  return (
    <SectionLayout
      eyebrow="04 / Experience"
      title={<>Experience centered on shipping features, handling workflows, and building useful systems.</>}
      description="This page highlights work that has gone beyond practice projects into product execution. The focus is on full-stack contribution, delivery ownership, and solving operational problems through software."
      sideLabel="Work Lens"
      sideTitle="Hands-on execution across product and engineering."
      sidePoints={[
        "Full-stack work tied to active business workflows",
        "Feature delivery across frontend, backend, and data flow",
        "Experience grounded in implementation, not theory alone",
      ]}
    >
      <section className="relative max-w-4xl space-y-0">
        <div className="absolute bottom-0 left-0 top-0 hidden w-[1px] bg-gradient-to-b from-primary/40 via-white/5 to-transparent md:block" />
        {experience.map((item) => (
          <article key={`${item.company}-${item.role}`} className="relative flex flex-col gap-6 border-b border-white/[0.06] pb-16 md:flex-row md:gap-16">
            <div className="absolute left-0 top-2 hidden h-3 w-3 -translate-x-[5px] rounded-full border-2 border-primary bg-background md:flex" />
            <div className="shrink-0 md:w-1/3 md:pl-10">
              <span className="mb-2 block font-mono text-[11px] tracking-widest text-primary">{item.year}</span>
            </div>
            <div className="w-full">
              <h2 className="mb-1 flex flex-wrap items-center gap-2 text-xl font-display font-bold">
                {item.role}
                <span className="text-base font-light text-muted-foreground">@ {item.company}</span>
              </h2>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

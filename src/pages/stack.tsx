import SectionLayout from "@/components/section-layout";
import { techStack } from "@/lib/portfolio-content";

export default function StackPage() {
  return (
    <SectionLayout
      eyebrow="02 / Tech Stack"
      title={<>A practical stack chosen for shipping clean, scalable web products.</>}
      description="The tools here support real execution across frontend, backend, automation, and deployment. Every layer is selected to keep development fast, architecture maintainable, and production behavior reliable."
      sideLabel="Stack Logic"
      sideTitle="Tools that support build speed and long-term stability."
      sidePoints={[
        "React and Tailwind for fast interface delivery",
        "Node, Express, and FastAPI for flexible backend workflows",
        "Databases and deployment tools picked for real project needs",
      ]}
    >
      <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {techStack.map((stack) => (
          <article key={stack.title} className="group relative overflow-hidden border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-primary/30 hover:bg-white/[0.04] sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-primary">{stack.subtitle}</p>
              <h2 className="text-2xl font-display font-bold tracking-tight md:text-3xl">{stack.title}</h2>
            </div>
            <div className="space-y-6">
              {stack.groups.map((group) => (
                <div key={`${stack.title}-${group.label}`} className="border-l border-primary/20 pl-4">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-white/45">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={`${group.label}-${item}`} className="border border-white/10 bg-background/40 px-3 py-1.5 text-xs font-mono tracking-wide text-white/75 transition-colors group-hover:border-primary/20 group-hover:text-white">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

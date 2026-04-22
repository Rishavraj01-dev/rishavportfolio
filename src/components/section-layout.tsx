import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/components/site-nav";

type SectionLayoutProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  sideLabel?: string;
  sideTitle?: string;
  sidePoints?: string[];
  children: ReactNode;
};

export default function SectionLayout({
  eyebrow,
  title,
  description,
  sideLabel,
  sideTitle,
  sidePoints,
  children,
}: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <SiteNav />

      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 md:px-12 md:pb-20 md:pt-36 lg:px-20 xl:px-24">
        <section className="mb-12 border border-white/10 bg-white/[0.03] p-6 sm:mb-14 sm:p-8 md:mb-16 md:p-12 xl:p-16">
          <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:mb-6 sm:text-[11px] sm:tracking-[0.25em]">
            {eyebrow}
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
            <div>
              <h1 className="mb-4 text-3xl font-display font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-7 md:text-base md:leading-8">
                {description}
              </p>
            </div>
            <div className="flex items-end justify-start lg:justify-end">
              <div className="w-full border border-white/10 bg-background/40 p-5 sm:p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary">
                  {sideLabel ?? "Page Focus"}
                </p>
                <h2 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">
                  {sideTitle ?? "Built to show the work behind the interface."}
                </h2>
                <div className="mt-5 space-y-3">
                  {(sidePoints ?? [
                    "Clear positioning for the page",
                    "Better context before the main content",
                    "More purposeful copy from the first screen",
                  ]).map((point) => (
                    <div key={point} className="border-l border-primary/30 pl-3 text-sm leading-6 text-muted-foreground">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {children}

        <section className="mt-12 border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-6 sm:mt-16 sm:p-8 md:p-10 xl:p-12">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.25em]">Next Move</p>
          <p className="mb-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mb-8 sm:text-lg sm:leading-8">
            If you want this area turned into a deeper case study, polished product page, or client-ready showcase, we can build it next.
          </p>
          <a
            href="mailto:rishavraj5999@gmail.com"
            className="inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-3.5 text-center font-display text-xs font-bold tracking-[0.2em] text-black transition-colors hover:bg-primary sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-widest"
          >
            CONTACT RISHAV
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>
    </div>
  );
}

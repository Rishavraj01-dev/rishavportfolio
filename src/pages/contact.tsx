import { Globe, Mail, Network } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionLayout from "@/components/section-layout";

export default function ContactPage() {
  return (
    <SectionLayout
      eyebrow="07 / Contact"
      title={<>Secure channels open for new products, collaborations, and freelance builds.</>}
      description="If you want to build a portfolio, product, internal tool, or full-stack system with production-ready polish, this is the best place to start the conversation."
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-display font-bold tracking-tight sm:text-3xl">Start a project</h2>
          <p className="mb-8 max-w-xl text-base leading-7 text-muted-foreground">
            Share what you are building, what stage you are in, and where you need help. I can support product direction, UI engineering, full-stack delivery, and practical automation.
          </p>
          <a
            href="mailto:rishavraj5999@gmail.com"
            data-testid="link-contact-email-page"
            className="inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-center font-display text-sm font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-primary sm:w-auto"
          >
            <Mail className="h-5 w-5" />
            START A PROJECT
          </a>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-display font-bold tracking-tight sm:text-2xl">Other channels</h2>
          <div className="space-y-3">
            {[
              { icon: SiGithub, label: "GitHub", href: "#" },
              { icon: Network, label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-raj-1602-/" },
              { icon: Globe, label: "Website", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 border border-white/10 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}

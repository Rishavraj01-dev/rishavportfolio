import { Globe, Mail, Network } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionLayout from "@/components/section-layout";
import { siteConfig } from "@/lib/site-config";

const contactDetails = [
  "What you want to build or improve",
  "Who the users are and what problem they face",
  "Current stage: idea, design, MVP, existing product, or production system",
  "Preferred timeline and the type of help needed",
];

export default function ContactPage() {
  const mailtoHref = `mailto:${siteConfig.email}?subject=Project%20Inquiry%20for%20Rishav%20Raj`;

  return (
    <SectionLayout
      eyebrow="07 / Contact"
      title={<>Contact Rishav Raj for full-stack products, portfolios, tools, and automation workflows.</>}
      description="Reach out for portfolio builds, full-stack web applications, dashboards, internal tools, Python automation, AI-assisted workflows, collaborations, or freelance development work."
      sideLabel="Best Fit"
      sideTitle="Useful context makes the first reply sharper."
      sidePoints={[
        "Product or portfolio idea with a clear goal",
        "Existing workflow that needs a better interface or backend",
        "Automation or AI-assisted feature that should solve a practical problem",
      ]}
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]" aria-label="Contact options">
        <article className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-display font-bold tracking-tight sm:text-3xl">Start a project conversation</h2>
          <p className="mb-6 max-w-xl text-base leading-7 text-muted-foreground">
            Founders, students, freelancers, and teams can contact me when they need a polished public website, full-stack product, internal tool, dashboard, or automation workflow with practical implementation support.
          </p>
          <div className="mb-8 border border-white/10 bg-background/35 p-5" aria-labelledby="contact-brief-heading">
            <h3 id="contact-brief-heading" className="mb-4 text-base font-display font-bold tracking-wider text-white">Include this in your message</h3>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {contactDetails.map((detail) => (
                <li key={detail} className="border-l border-primary/30 pl-3">{detail}</li>
              ))}
            </ul>
          </div>
          <a
            href={mailtoHref}
            data-testid="link-contact-email-page"
            aria-label="Email Rishav Raj about a project"
            className="inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-center font-display text-sm font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-primary sm:w-auto"
          >
            <Mail className="h-5 w-5" />
            EMAIL RISHAV
          </a>
          <p className="mt-4 text-xs leading-6 text-muted-foreground" role="status" aria-live="polite">
            This opens your email app. No contact form data is stored by this website.
          </p>
        </article>
        <aside className="border border-white/10 bg-white/[0.02] p-6 sm:p-8" aria-label="Other contact channels">
          <h2 className="mb-6 text-xl font-display font-bold tracking-tight sm:text-2xl">Other public channels</h2>
          <div className="space-y-3">
            {[
              { icon: SiGithub, label: "GitHub profile", href: siteConfig.githubUrl },
              { icon: Network, label: "LinkedIn profile", href: siteConfig.linkedInUrl },
              { icon: Globe, label: "Portfolio website", href: siteConfig.siteUrl },
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
        </aside>
      </section>
    </SectionLayout>
  );
}

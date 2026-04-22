import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Link } from "wouter";
import SectionLayout from "@/components/section-layout";
import { blogs } from "@/lib/blogs";

export default function InsightsPage() {
  return (
    <SectionLayout
      eyebrow="06 / Writing"
      title={<>Writing on product building, engineering decisions, and lessons from real systems.</>}
      description="This page collects my thoughts on building software that is not only functional, but maintainable, scalable, and useful in the real world. The writing comes from hands-on project work, not abstract theory."
      sideLabel="Writing Focus"
      sideTitle="Ideas shaped by building, debugging, and shipping."
      sidePoints={[
        "Breakdowns of real projects and product decisions",
        "Practical lessons from architecture and implementation work",
        "A clearer view into how I think while building systems",
      ]}
    >
      <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog, index) => (
          <article key={blog.slug} className="group relative overflow-hidden border border-white/8 bg-white/[0.015] transition-all duration-400 hover:border-primary/30">
            <Link href={`/blog/${blog.slug}`} data-testid={`link-article-page-${index}`} className="block p-6 sm:p-8">
              <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-widest text-primary">{blog.date}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-muted-foreground">
                  <Clock className="h-3 w-3" /> {blog.readTime}
                </span>
              </div>
              <h2 className="mb-5 text-xl font-display font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                {blog.title}
              </h2>
              <p className="mb-10 text-sm leading-7 text-muted-foreground">{blog.intro[0]}</p>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/30 transition-colors duration-300 group-hover:text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Read Full Blog
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}

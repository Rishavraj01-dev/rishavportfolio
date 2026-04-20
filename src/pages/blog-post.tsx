import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { Link, useParams } from "wouter";
import { getBlogBySlug } from "@/lib/blogs";
import NotFound from "@/pages/not-found";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-white/[0.06] px-4 py-8 sm:px-6 sm:py-10 md:px-16 lg:px-24">
        <Link
          href="/#insights"
          className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-white sm:gap-3 sm:text-xs sm:tracking-[0.2em]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Writing
        </Link>
      </section>

      <article className="px-4 py-10 sm:px-6 sm:py-14 md:px-16 md:py-16 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground sm:mb-8 sm:gap-4 sm:text-[11px] sm:tracking-[0.22em]">
            <span className="inline-flex items-center gap-2 text-primary">
              <BookOpen className="w-4 h-4" />
              Article
            </span>
            <span>{blog.date}</span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-display font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-6xl">
            {blog.title}
          </h1>

          <div className="mb-10 space-y-4 text-base leading-7 text-muted-foreground sm:mb-14 sm:space-y-5 sm:text-lg sm:leading-8">
            {blog.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-10 sm:space-y-14">
            {blog.sections.map((section) => (
              <section key={section.heading} className="border-t border-white/[0.06] pt-8 sm:pt-10">
                <h2 className="mb-4 text-xl font-display font-bold sm:mb-5 sm:text-2xl md:text-3xl">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12 border-t border-white/[0.06] pt-8 sm:mt-16 sm:pt-10">
            <h2 className="mb-4 text-xl font-display font-bold sm:mb-5 sm:text-2xl md:text-3xl">
              {blog.conclusionTitle}
            </h2>
            <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg">
              {blog.conclusion.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}

import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Switch, Route, Router as WouterRouter } from "wouter";
import RouteSeo from "@/components/route-seo";
import Home from "@/pages/home";

const AiAssistant = lazy(() => import("@/components/ai-assistant"));
const HeroSideDock = lazy(() => import("@/components/hero-side-dock"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AboutPage = lazy(() => import("@/pages/about"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const CapabilitiesPage = lazy(() => import("@/pages/capabilities"));
const StackPage = lazy(() => import("@/pages/stack"));
const ProjectsPage = lazy(() => import("@/pages/projects"));
const ProjectDetailPage = lazy(() => import("@/pages/project-detail"));
const ExperiencePage = lazy(() => import("@/pages/experience"));
const InsightsPage = lazy(() => import("@/pages/insights"));
const ContactPage = lazy(() => import("@/pages/contact"));

function RouteFallback() {
  return (
    <div className="min-h-screen overflow-hidden bg-background" aria-label="Loading page">
      <div className="fixed bottom-0 left-0 top-[73px] w-[74px] md:top-[88px] border-r border-white/10 bg-black/72 px-2 py-3 lg:w-[82px]" aria-hidden="true">
        <div className="mb-5 flex items-center gap-1 px-1">
          <span className="h-1.5 w-8 animate-pulse rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="mx-auto h-11 w-11 animate-pulse rounded-2xl bg-white/10 sm:h-12 sm:w-12" />
          ))}
        </div>
      </div>
      <div className="relative min-h-screen px-4 py-7 sm:px-6 md:px-12">
        <div className="flex h-14 items-center justify-between border-b border-white/6">
          <div className="h-5 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="h-10 w-10 animate-pulse border border-primary/30 bg-primary/5" />
        </div>
        <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
          <div className="w-full max-w-5xl space-y-5">
            <div className="h-4 w-56 animate-pulse rounded-full bg-primary/15" />
            <div className="h-20 w-full animate-pulse rounded bg-white/8 sm:h-28" />
            <div className="h-16 w-2/3 animate-pulse rounded bg-white/8" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />
            <div className="flex flex-wrap gap-3 pt-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-11 w-36 animate-pulse border border-white/10 bg-white/5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/capabilities" component={CapabilitiesPage} />
      <Route path="/stack" component={StackPage} />
      <Route path="/projects/:slug" component={ProjectDetailPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/insights" component={InsightsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen pl-[74px] lg:pl-[82px]">
        <a
          href="#main-content"
          className="sr-only fixed left-3 top-3 z-[500] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <RouteSeo />
          <Suspense fallback={<RouteFallback />}>
            <Router />
          </Suspense>
        </WouterRouter>
      </div>
      <Suspense fallback={null}>
        <HeroSideDock />
        <AiAssistant />
      </Suspense>
    </MotionConfig>
  );
}

export default App;

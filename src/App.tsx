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
  return <div className="min-h-screen bg-background" aria-hidden="true" />;
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

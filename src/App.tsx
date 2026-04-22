import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AiAssistant from "@/components/ai-assistant";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import BlogPostPage from "@/pages/blog-post";
import CapabilitiesPage from "@/pages/capabilities";
import StackPage from "@/pages/stack";
import ProjectsPage from "@/pages/projects";
import ExperiencePage from "@/pages/experience";
import InsightsPage from "@/pages/insights";
import ContactPage from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/capabilities" component={CapabilitiesPage} />
      <Route path="/stack" component={StackPage} />
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <AiAssistant />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen w-full flex items-center justify-center bg-background px-4 text-foreground">
      <Card className="w-full max-w-md border-white/10 bg-white/[0.03] text-foreground">
        <CardContent className="pt-6">
          <div className="mb-4 flex gap-3">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The page you are looking for does not exist. Use the public portfolio navigation below to get back to the work.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="border border-white/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              Home
            </Link>
            <Link href="/projects" className="border border-white/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              Projects
            </Link>
            <Link href="/contact" className="border border-white/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              Contact
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

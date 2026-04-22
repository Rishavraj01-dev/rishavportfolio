import { Menu, Terminal, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const desktopItems = [
  { label: "HOME", href: "/" },
  { label: "CAPABILITIES", href: "/capabilities" },
  { label: "STACK", href: "/stack" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ABOUT", href: "/about" },
  { label: "INSIGHTS", href: "/insights" },
] as const;

const mobileItems = [...desktopItems, { label: "CONTACT", href: "/contact" }] as const;

function NavItem({
  href,
  label,
  active,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const className = mobile
    ? cn(
        "border px-3 py-2.5 transition-colors",
        active
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-white/10 hover:border-primary/40 hover:text-primary active:border-primary/40 active:text-primary"
      )
    : cn(
        "relative py-2 transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-primary"
      );

  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} className={className}>
      //{label}
      {!mobile ? (
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[1px] w-full bg-primary transition-transform origin-left",
            active ? "scale-x-100" : "scale-x-0"
          )}
        />
      ) : null}
    </Link>
  );
}

export default function SiteNav() {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-background/50 px-4 py-4 backdrop-blur-xl md:px-12 md:py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="relative flex items-center gap-2 font-display text-base font-bold tracking-tighter sm:text-xl">
          <Terminal className="h-5 w-5 text-primary" />
          <span>RISHAV<span className="text-primary">.</span>RAJ</span>
        </Link>

        <div className="hidden items-center gap-8 text-xs font-mono tracking-widest text-muted-foreground lg:flex">
          {desktopItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} active={location === item.href} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center border border-white/10 text-primary transition-colors hover:border-primary/40 hover:bg-primary/10 lg:hidden"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <a
          href="mailto:rishavraj5999@gmail.com"
          className="group relative hidden overflow-hidden rounded-none border border-primary/30 px-4 py-2 text-[10px] font-mono font-bold tracking-[0.18em] text-primary transition-all hover:bg-primary/10 sm:px-6 sm:py-2.5 sm:text-xs lg:inline-block"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            INITIATE
          </span>
          <div className="absolute inset-0 translate-y-full bg-primary/20 transition-transform duration-300 ease-out group-hover:translate-y-0 group-active:translate-y-0" />
        </a>
      </div>

      {mobileNavOpen ? (
        <div className="mt-4 border border-white/10 bg-background/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-1 gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            {mobileItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={location === item.href}
                mobile
                onClick={() => setMobileNavOpen(false)}
              />
            ))}
            <a
              href="mailto:rishavraj5999@gmail.com"
              onClick={() => setMobileNavOpen(false)}
              className="mt-1 inline-flex items-center justify-center border border-primary/35 bg-primary px-3 py-3 text-center text-[11px] font-bold tracking-[0.2em] text-black transition-all hover:bg-white active:bg-white"
            >
              INITIATE
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

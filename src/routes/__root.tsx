import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white shadow-soft"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Internet Girls — Helping more women get ahead with AI" },
      {
        name: "description",
        content:
          "A community where women in Southeast Asia learn AI together through free workshops, practical resources, and IRL meetups.",
      },
      { name: "author", content: "Internet Girls" },
      { property: "og:title", content: "Internet Girls — Helping more women get ahead with AI" },
      {
        property: "og:description",
        content:
          "Learn AI together through free workshops, practical resources, and IRL meetups across Southeast Asia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}

function SiteNav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex w-[min(1200px,calc(100%-2rem))] items-center justify-between rounded-full glass px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <svg
            className="h-7 w-7"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="starGradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="50%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
            </defs>
            <path
              d="M14 2.5L17.09 9.76L24.5 10.67L19.25 16.09L20.76 23.5L14 19.91L7.24 23.5L8.75 16.09L3.5 10.67L10.91 9.76L14 2.5Z"
              fill="url(#starGradient)"
            />
          </svg>
          <span>Internet Girls</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            to="/"
            hash="waitlist"
            onClick={() => {
              // Force scroll when clicked again
              const target = document.getElementById("waitlist");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
              // Dispatch event to trigger cute input highlight & tooltip
              window.dispatchEvent(new CustomEvent("focusWaitlist"));
            }}
            className="rounded-full px-3 sm:px-4 py-2 font-medium text-foreground/80 hover:text-foreground text-xs sm:text-sm"
          >
            Join the Waitlist
          </Link>
          <Link
            to="/partners"
            className="rounded-full bg-brand-gradient px-4 py-2 font-medium text-white shadow-soft transition-transform hover:scale-[1.03]"
          >
            Partners
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Marquee() {
  const text =
    "💜 Making AI easy & fun to learn ✨ Workshops 💻 Meetups ☕ Community 👩‍💻";
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-white/60 py-3.5">
      <div className="animate-marquee flex whitespace-nowrap gap-4" style={{ animationDuration: "10s" }}>
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-wide text-muted-foreground"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="">
      <Marquee />
      <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">Internet Girls</span>
        </div>
        <div className="flex items-center gap-6">
          <ExternalLink href="https://www.facebook.com/share/g/1HGRrNBHmp/">
            Facebook Group
          </ExternalLink>
          <ExternalLink href="https://instagram.com/internetgirls.ai">Instagram</ExternalLink>
          <ExternalLink href="https://www.linkedin.com/company/internet-girls/">
            LinkedIn
          </ExternalLink>
        </div>
      </div>
      <p className="pb-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Internet Girls. All rights reserved.
      </p>
    </footer>
  );
}

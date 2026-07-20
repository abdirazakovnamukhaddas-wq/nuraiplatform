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
import { I18nProvider } from "../lib/i18n";
import { DemoProvider, useDemo } from "../lib/demo-context";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { DemoModal } from "../components/DemoModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold tracking-tight text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
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
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
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
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "NUR.AI — Assistive AI Camera Intelligence for Human-Led Care";
const SITE_DESCRIPTION =
  "NUR.AI integrates with existing cameras to help teachers, rehabilitation specialists and caregivers notice situations earlier and respond faster. Human-in-the-Loop by design.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "NUR.AI" },
      { name: "theme-color", content: "#0b1836" },
      { name: "color-scheme", content: "light dark" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NUR.AI" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "en" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { title: "NUR.AI" },
      { property: "og:title", content: "NUR.AI" },
      { name: "twitter:title", content: "NUR.AI" },
      { name: "description", content: "NUR.AI is an AI Camera Intelligence Platform that assists professionals in identifying potential situations and responding faster." },
      { property: "og:description", content: "NUR.AI is an AI Camera Intelligence Platform that assists professionals in identifying potential situations and responding faster." },
      { name: "twitter:description", content: "NUR.AI is an AI Camera Intelligence Platform that assists professionals in identifying potential situations and responding faster." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/kM6ps8ijE9RdgiIMxgvoAJwZMFv1/social-images/social-1784534033465-file_00000000c58881f49bc2e0eaa3775ea6.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/kM6ps8ijE9RdgiIMxgvoAJwZMFv1/social-images/social-1784534033465-file_00000000c58881f49bc2e0eaa3775ea6.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NUR.AI",
          description: SITE_DESCRIPTION,
          slogan: "AI assists. Humans decide.",
        }),
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
      <I18nProvider>
        <DemoProvider>
          <AppShell />
        </DemoProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

function AppShell() {
  const { open, setOpen, openDemo } = useDemo();
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar onRequestDemo={openDemo} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DemoModal open={open} onOpenChange={setOpen} />
    </div>
  );
}

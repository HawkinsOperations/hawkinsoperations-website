"use client";

import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import { primaryNavigation, externalLinks } from "@data/navigation";

function normalize(href: string): string {
  return href.replace(/\/$/, "") || "/";
}

export default function Header() {
  const raw = usePathname() ?? "/";
  const path = normalize(raw);
  const isCurrent = (href: string) => {
    const n = normalize(href);
    if (n === "/") return path === "/";
    return path === n || path.startsWith(n + "/");
  };

  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--moon-border)] bg-[rgba(0,2,5,0.86)] backdrop-blur-md">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--electric-blue-soft)] to-transparent"></div>
      <div className="container flex min-h-[68px] items-center justify-between gap-5">
        <a href="/" className="group flex items-center gap-3" aria-label="HawkinsOperations home">
          <BrandMark size="sm" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[var(--silver-bright)]">HawkinsOperations</span>
            <span className="mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--muted)]">
              Detection Engineering SOC
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <a
              key={item.href}
              className="nav-link"
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden md:inline-flex cta cta-quiet"
            href={externalLinks.githubOrg}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the HawkinsOperations GitHub organization"
          >
            GitHub Org
          </a>
        </div>
      </div>

      <nav className="md:hidden border-t border-[var(--moon-border)]" aria-label="Primary navigation mobile">
        <div className="container flex items-center gap-5 overflow-x-auto py-3">
          {primaryNavigation.map((item) => (
            <a
              key={item.href}
              className="nav-link shrink-0"
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

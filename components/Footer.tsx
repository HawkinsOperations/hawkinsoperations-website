import BrandMark from "./BrandMark";
import { externalLinks, primaryNavigation, reviewerLinks } from "@data/navigation";

export default function Footer() {
  return (
    <footer className="site-footer hairline mt-12">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3.5">
            <BrandMark size="md" />
            <div className="flex flex-col leading-tight">
              <span className="text-[0.95rem] font-semibold text-[var(--silver-bright)]">HawkinsOperations</span>
              <span className="mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--silver)]">
                Detection Engineering SOC
              </span>
            </div>
          </div>
          <p className="site-footer__lede mt-5 max-w-md text-[0.88rem] leading-7">
            Public reviewer surface for governed detection engineering. Website rendering is not proof.
          </p>
          <p className="mono mt-5 text-[0.64rem] uppercase tracking-[0.2em] text-[var(--silver)]">
            Build loud · Verify hard · Claim tight · Ship receipts
          </p>
        </div>

        <div>
          <p className="site-footer__heading mono">Primary</p>
          <ul className="site-footer__list mt-4">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="site-footer__heading mono">Reviewer support</p>
          <ul className="site-footer__list mt-4">
            {reviewerLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="site-footer__heading mono">Repositories</p>
          <ul className="site-footer__list mt-4">
            <li>
              <a href={externalLinks.githubOrg} target="_blank" rel="noopener noreferrer">
                GitHub organization ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.detections} target="_blank" rel="noopener noreferrer">
                Detections ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.validation} target="_blank" rel="noopener noreferrer">
                Validation ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.proof} target="_blank" rel="noopener noreferrer">
                Proof ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.platform} target="_blank" rel="noopener noreferrer">
                Platform ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.aevumguard} target="_blank" rel="noopener noreferrer">
                AevumGuard ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.rayleeGithub} target="_blank" rel="noopener noreferrer">
                Raylee Hawkins ↗
              </a>
            </li>
            <li>
              <a href={externalLinks.website} target="_blank" rel="noopener noreferrer">
                Website repo ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-5 text-[0.72rem] text-[var(--silver)]">
          <span>© Raylee Hawkins · HawkinsOperations Detection Engineering SOC</span>
          <span className="mono uppercase tracking-[0.18em]">Public reviewer surface</span>
        </div>
      </div>
    </footer>
  );
}

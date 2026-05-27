import { externalLinks } from "@data/navigation";

type DoorIcon = "proof" | "artifacts" | "detections" | "ai" | "about" | "source";

type Door = {
  href: string;
  title: string;
  description: string;
  icon: DoorIcon;
  external?: boolean;
};

const doors: Door[] = [
  {
    href: "/proof/",
    title: "Proof",
    description:
      "Claim authority, Governance Saves, Proof Pack 001, runtime boundaries, validation ceilings, and blocked claims.",
    icon: "proof",
  },
  {
    href: "/artifacts/",
    title: "Artifacts",
    description:
      "Reviewer receipts, proof packages, evidence cards, release artifacts, and does-prove / does-not-prove boundaries.",
    icon: "artifacts",
  },
  {
    href: "/detections/",
    title: "Detections",
    description:
      "Detection engineering portfolio with validation status, ATT&CK mapping, proof ceilings, and runtime boundaries.",
    icon: "detections",
  },
  {
    href: "/ai-security/",
    title: "AI Security",
    description:
      "SOCaaS-style implementation model for AI-assisted triage, deterministic verification, and human authority.",
    icon: "ai",
  },
  {
    href: "/about/",
    title: "About",
    description:
      "Mission, operating thesis, current HawkinsOperations boundary, and archive / legacy context.",
    icon: "about",
  },
  {
    href: externalLinks.githubOrg,
    title: "Inspect Source",
    description:
      "Open the HawkinsOperations GitHub organization. Repos carry the evidence; the website routes reviewers.",
    icon: "source",
    external: true,
  },
];

function Glyph({ icon }: { icon: DoorIcon }) {
  switch (icon) {
    case "proof":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "artifacts":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7l8-3 8 3v10l-8 3-8-3V7z" />
          <path d="M4 7l8 3 8-3M12 10v10" />
        </svg>
      );
    case "detections":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 4h12v6a6 6 0 01-12 0V4z" />
          <path d="M9 20h6M12 16v4" />
          <circle cx="9" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "about":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "source":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 19c-4 1-4-2-6-2M15 22v-4a3 3 0 00-3-3 3 3 0 003-3V8a3.5 3.5 0 00-1-2.5 4.5 4.5 0 00-1-4 4.5 4.5 0 00-4 1 11 11 0 00-6 0 4.5 4.5 0 00-4-1 4.5 4.5 0 00-1 4A3.5 3.5 0 003 8v4a3 3 0 003 3 3 3 0 00-3 3v4" />
        </svg>
      );
  }
}

export default function SixDoorCockpit() {
  return (
    <div className="sdc">
      {doors.map((door) => (
        <a
          key={door.href}
          className="sdc__door"
          href={door.href}
          target={door.external ? "_blank" : undefined}
          rel={door.external ? "noopener noreferrer" : undefined}
        >
          <span className="sdc__door-frame" aria-hidden="true" />
          <span className="sdc__door-glow" aria-hidden="true" />
          <span className="sdc__door-icon" aria-hidden="true">
            <Glyph icon={door.icon} />
          </span>
          <span className="sdc__door-meta">
            <span className="sdc__door-eyebrow">{door.external ? "External" : "Public door"}</span>
            <h3 className="sdc__door-title">{door.title}</h3>
            <p className="sdc__door-desc">{door.description}</p>
          </span>
          <span className="sdc__door-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ))}
    </div>
  );
}

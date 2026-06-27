import { externalLinks } from "@data/navigation";

type DoorIcon = "hoxline" | "proof" | "claim" | "detections" | "automation" | "architecture" | "about" | "source";

type Door = {
  href: string;
  title: string;
  description: string;
  icon: DoorIcon;
  external?: boolean;
};

const doors: Door[] = [
  {
    href: "/hoxline/",
    title: "Hoxline",
    description:
      "Flagship ProofOps control plane with Gauntlet v0 loop execution, reviewer outputs, and gated runtime/signal states.",
    icon: "hoxline",
  },
  {
    href: "/proof/",
    title: "Proof",
    description:
      "Claim authority, Governance Saves, Proof Pack 001, runtime boundaries, validation ceilings, and blocked claims.",
    icon: "proof",
  },
  {
    href: "/claim-firewall/",
    title: "Claim Firewall",
    description:
      "Internal Hoxline claim gate for blocked wording, safer phrasing, and human-review boundaries.",
    icon: "claim",
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
    title: "AI Automation",
    description:
      "The AI-assisted security automation surface: how generated work becomes gated, reviewer-ready output.",
    icon: "automation",
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
    case "hoxline":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
          <path d="M17.5 6.5l-3 3M6.5 17.5l3-3M6.5 6.5l3 3M17.5 17.5l-3-3" />
        </svg>
      );
    case "proof":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "claim":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l8 4v6c0 4.7-3.2 7.2-8 8-4.8-.8-8-3.3-8-8V7l8-4z" />
          <path d="M8.5 12h7M8.5 15h4.5" />
          <path d="M16 9l-5 5-2.5-2.5" />
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
    case "automation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="5" cy="6" r="2.4" />
          <circle cx="19" cy="6" r="2.4" />
          <circle cx="12" cy="18" r="2.4" />
          <path d="M7.4 6h9.2M6 8.2l4.6 7.6M18 8.2l-4.6 7.6" />
        </svg>
      );
    case "architecture":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="9" y="14" width="6" height="6" rx="1.5" />
          <path d="M10 7h4M7 10v2.5L9 16M17 10v2.5L15 16" />
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
          <div className="sdc__door-meta">
            <span className="sdc__door-eyebrow">{door.external ? "External" : "Public door"}</span>
            <h3 className="sdc__door-title">{door.title}</h3>
            <p className="sdc__door-desc">{door.description}</p>
          </div>
          <span className="sdc__door-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ))}
    </div>
  );
}

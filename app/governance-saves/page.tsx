import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance Saves | HawkinsOperations",
  description:
    "Interactive explorer for the public-facing HawkinsOperations Governance Saves subset: documented controls, bounded outcomes, and reviewer routes.",
  alternates: {
    canonical: "/governance-saves/",
  },
};

export { default } from "../proof/governance-saves/page";

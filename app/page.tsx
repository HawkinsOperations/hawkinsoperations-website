import type { Metadata } from "next";
import HomePresentationMode from "@components/command-center/HomePresentationMode";

export const metadata: Metadata = {
  title: "Reviewer Guide | HawkinsOperations",
  description:
    "A presentation-ready Reviewer Guide to the HawkinsOperations system, its AI labor boundary, deterministic controls, evidence path, human authority, and inspectable reviewer routes.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePresentationMode />;
}

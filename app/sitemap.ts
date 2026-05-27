import type { MetadataRoute } from "next";
import { siteUrl } from "@config/site";
import { fieldNotes } from "@data/fieldNotes";
import { recentGovernedArtifacts } from "@data/recentGovernedArtifacts";

const staticRoutes = [
  "/",
  "/pipeline/",
  "/socaas-ai-security-operations/",
  "/proof/",
  "/proof/ho-det-001/",
  "/proof/proof-pack-001/",
  "/proof/governance-saves/",
  "/proof/runtime-proof-factory/",
  "/validation/",
  "/platform/contracts/",
  "/artifacts/",
  "/about/",
  "/start/",
  "/controls/",
  "/architecture/",
  "/architecture/truth-surfaces/",
  "/architecture/repo-authority-map/",
  "/legacy/",
  "/proof-loop/",
  "/repos/",
  "/field-notes/",
  "/changelog/",
];

const route = (path: string): MetadataRoute.Sitemap[number] => ({
  url: `${siteUrl}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const artifactRoutes = recentGovernedArtifacts.map((artifact) =>
    route(`/artifacts/${artifact.slug}/`),
  );

  const fieldNoteRoutes = fieldNotes.map((note) => route(`/field-notes/${note.slug}/`));

  return [...staticRoutes.map(route), ...artifactRoutes, ...fieldNoteRoutes];
}

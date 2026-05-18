import type { MetadataRoute } from "next";
import { siteUrl } from "@config/site";
import { fieldNotes } from "@data/fieldNotes";
import { recentGovernedArtifacts } from "@data/recentGovernedArtifacts";

const staticRoutes = [
  "/",
  "/pipeline/",
  "/proof/",
  "/proof/ho-det-001/",
  "/artifacts/",
  "/about/",
  "/start/",
  "/controls/",
  "/architecture/",
  "/architecture/truth-surfaces/",
  "/legacy/",
  "/proof-loop/",
  "/repos/",
  "/field-notes/",
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

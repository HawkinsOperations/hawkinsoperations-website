/**
 * Repository authority map.
 *
 * Re-exported from src/data/repos.ts during the framework migration.
 * The website node is non-authoritative by design — it renders, it does not
 * author proof.
 */
import { repos as dataRepos, type RepoRecord } from "@data/repos";

export const repoAuthority = dataRepos;
export type { RepoRecord };

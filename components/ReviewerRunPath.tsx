import { publicStatus } from "@data/generated/public-status.generated";

type ReviewerRunPathProps = {
  variant?: "home" | "hoxline";
};

export default function ReviewerRunPath({ variant = "home" }: ReviewerRunPathProps) {
  const actions = publicStatus.reviewer_actions;
  const title = variant === "hoxline" ? "Run the Hoxline review path" : "Reviewer can verify";
  const eyebrow = variant === "hoxline" ? "Clone-runnable path" : "Inspect / download / clone / run";
  const flowSteps =
    variant === "hoxline"
      ? ["HO-DET-001", "Gauntlet", "Artifacts", "Verifier", "Claim gate"]
      : ["Snapshot", "Sources", "Download", "Clone", "Run"];

  return (
    <section className={`reviewer-run-path reviewer-run-path--${variant}`} aria-label={title}>
      <div className="reviewer-run-path__lead">
        <p className="cockpit-eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>
          Generated status prevents stale website numbers from becoming accidental authority. The
          source routes and commands make the review path inspectable instead of presentation-only.
        </p>
      </div>

      <div className="reviewer-run-path__rings" aria-label="Reviewer action modes">
        <span>Inspect</span>
        <span>Download</span>
        <span>Clone</span>
        <span>Run</span>
      </div>

      <div className="reviewer-run-path__flow" aria-label="Reviewer flow visualization">
        <div className="reviewer-run-path__flow-track" aria-hidden="true">
          <span className="reviewer-run-path__packet reviewer-run-path__packet--one" />
          <span className="reviewer-run-path__packet reviewer-run-path__packet--two" />
          <span className="reviewer-run-path__packet reviewer-run-path__packet--three" />
        </div>
        <ol>
          {flowSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>

      <div className="reviewer-run-path__links" aria-label="Online reviewer links">
        {actions.inspect_online.map((action) => (
          <a key={action.href} href={action.href}>
            <strong>{action.label}</strong>
            <span>{action.detail}</span>
          </a>
        ))}
      </div>

      <details className="reviewer-run-path__drawer">
        <summary>
          <span>Download, clone, and run commands</span>
          <strong>Reviewer-runnable</strong>
        </summary>
        <div className="reviewer-run-path__command-grid">
          <article>
            <span>Download</span>
            <a href={actions.download_json.href}>{actions.download_json.label}</a>
            <p>{actions.download_json.detail}</p>
          </article>
          <article>
            <span>Clone</span>
            <code>{actions.clone_repo.command}</code>
            <p>Working directory after clone: {actions.clone_repo.working_directory}</p>
          </article>
          {actions.run_commands.map((command) => (
            <article key={command.command}>
              <span>{command.label}</span>
              <code>{command.command}</code>
              <p>
                Repo: {command.repo}. Working directory: {command.working_directory}.
              </p>
            </article>
          ))}
        </div>
        <p className="reviewer-run-path__boundary">
          These commands are review paths in their owning repositories. Website rendering displays
          the route; it does not convert command output into proof authority.
        </p>
      </details>
    </section>
  );
}

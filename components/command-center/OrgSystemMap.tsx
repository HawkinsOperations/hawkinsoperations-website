import { systemRouteSteps, systemSurfaces } from "@data/systemShowcase";

export default function OrgSystemMap() {
  return (
    <div className="org-system-map" aria-label="HawkinsOperations system route map">
      <div className="org-system-map__rail">
        {systemRouteSteps.map((step, index) => (
          <div key={step.id} className={`org-system-map__step org-system-map__step--${step.tone}`}>
            <span className="org-system-map__index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <small>{step.short}</small>
            <p>{step.status}</p>
          </div>
        ))}
      </div>
      <div className="org-system-map__surfaces">
        {systemSurfaces.map((surface) => (
          <a
            key={surface.id}
            className={`org-system-map__surface org-system-map__surface--${surface.tone}`}
            href={surface.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{surface.role}</span>
            <strong>{surface.label}</strong>
            <p>{surface.owns}</p>
          </a>
        ))}
      </div>
    </div>
  );
}


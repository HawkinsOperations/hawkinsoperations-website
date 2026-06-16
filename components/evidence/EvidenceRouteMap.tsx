import { evidenceRoute } from "@data/proofAuthorityMap";

export default function EvidenceRouteMap() {
  return (
    <ol className="evidence-route-map" aria-label="Evidence route">
      {evidenceRoute.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}


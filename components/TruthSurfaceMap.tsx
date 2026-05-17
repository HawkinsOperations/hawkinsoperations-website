import TruthSurfaceCard from "./TruthSurfaceCard";
import { truthSurfaces } from "@config/truth-surfaces";

export default function TruthSurfaceMap() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {truthSurfaces.map((surface) => (
        <TruthSurfaceCard key={surface.slug} surface={surface} />
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import FieldNoteCard from "@components/FieldNoteCard";
import PageHero from "@components/PageHero";
import { fieldNotes } from "@data/fieldNotes";

export const metadata: Metadata = {
  title: "Field Notes | HawkinsOperations",
  description:
    "Technical field notes explaining HawkinsOperations proof boundaries, truth surfaces, and claim controls.",
  alternates: {
    canonical: "/field-notes/",
  },
};

export default function FieldNotesIndexPage() {
  return (
    <>
      <PageHero
        title="Field notes"
        subtitle="A technical archive for proof-boundary decisions."
        description="Short notes on source truth, runtime truth, controlled validation, blocked claims, and governance authority."
        badges={[{ label: "TECHNICAL_ARCHIVE" }, { label: "CONTENT_FIRST" }]}
      />
      <section className="container section">
        <div className="surface rounded-lg px-6 md:px-10">
          {fieldNotes.map((note) => (
            <FieldNoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </>
  );
}

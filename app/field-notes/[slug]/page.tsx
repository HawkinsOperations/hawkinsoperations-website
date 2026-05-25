import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import { fieldNotes } from "@data/fieldNotes";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const note = fieldNotes.find((n) => n.slug === params.slug);
  if (!note) {
    return { title: "Field Note | HawkinsOperations" };
  }
  return {
    title: `${note.title} | HawkinsOperations Field Notes`,
    description: note.summary,
    alternates: {
      canonical: `/field-notes/${note.slug}/`,
    },
  };
}

export default function FieldNotePage({ params }: PageProps) {
  const note = fieldNotes.find((n) => n.slug === params.slug);
  if (!note) {
    notFound();
  }

  return (
    <article className="container py-16">
      <p className="mono text-xs uppercase text-blue-100">{note.status}</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-slate-50">{note.title}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">{note.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="mono border border-slate-700 px-2.5 py-1 text-[0.68rem] uppercase text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-10">
        <BoundaryNotice title="Proof boundary" text={note.proofBoundary} />
      </div>
      <div className="prose-codex mt-10 max-w-3xl">
        {note.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-slate-50">Related links</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {note.relatedLinks.map((link) => (
            <LinkCard
              key={link.href}
              href={link.href}
              title={link.label}
              description="Continue through the public proof codex."
            />
          ))}
        </div>
      </section>
    </article>
  );
}

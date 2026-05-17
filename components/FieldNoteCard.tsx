import type { FieldNote } from "@data/fieldNotes";

export default function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <a className="group block border-t border-slate-700/50 py-6" href={`/field-notes/${note.slug}/`}>
      <div className="grid gap-4 md:grid-cols-[160px_1fr]">
        <div>
          <p className="mono text-xs uppercase text-slate-500">{note.date}</p>
          <p className="mono mt-2 text-[0.68rem] uppercase text-blue-100">{note.status}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-50 group-hover:text-blue-100">{note.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{note.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span key={tag} className="mono text-[0.68rem] uppercase text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

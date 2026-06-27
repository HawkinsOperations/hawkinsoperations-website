export interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}

export default function LinkCard({ href, title, description, external = false }: LinkCardProps) {
  const eyebrow = external ? "Open source" : "Open route";
  const action = external ? "Inspect source" : "Inspect route";

  return (
    <a
      className="card group block p-5"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${action}: ${title}`}
    >
      <span className="mono text-xs uppercase text-blue-100">{eyebrow}</span>
      <h3 className="mt-4 text-xl font-semibold text-slate-50">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 group-hover:text-blue-100">
        {action}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </a>
  );
}

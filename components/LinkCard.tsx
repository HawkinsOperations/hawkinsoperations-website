export interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}

export default function LinkCard({ href, title, description, external = false }: LinkCardProps) {
  return (
    <a
      className="card group block p-5"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="mono text-xs uppercase text-blue-100">Open route</span>
      <h3 className="mt-4 text-xl font-semibold text-slate-50">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <span className="mt-5 inline-flex text-sm text-slate-300 group-hover:text-blue-100">
        Inspect path
      </span>
    </a>
  );
}

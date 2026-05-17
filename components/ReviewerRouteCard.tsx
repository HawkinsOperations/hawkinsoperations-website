export interface ReviewerRouteCardProps {
  duration: string;
  title: string;
  purpose?: string;
  items: string[];
  links?: { label: string; href: string; external?: boolean }[];
}

export default function ReviewerRouteCard({
  duration,
  title,
  purpose,
  items,
  links = [],
}: ReviewerRouteCardProps) {
  return (
    <article className="reviewer-route-card card p-5">
      <p className="mono text-xs uppercase text-blue-100">{duration}</p>
      <h3 className="mt-4 text-xl font-semibold text-slate-50">{title}</h3>
      {purpose && <p className="mt-3 text-sm leading-6 text-slate-400">{purpose}</p>}
      <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
      {links.length > 0 && (
        <div className="reviewer-route-card__links" aria-label={`${title} links`}>
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
              {link.external ? " ↗" : ""}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

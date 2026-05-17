import StatusChip from "./StatusChip";

export interface ReceiptCardProps {
  title: string;
  surface: string;
  statusBadge: string;
  publicSafe: boolean;
  claim: string;
  boundary: string;
  nextGate?: string;
  href: string;
  hrefLabel: string;
}

export default function ReceiptCard({
  title,
  surface,
  statusBadge,
  publicSafe,
  claim,
  boundary,
  nextGate,
  href,
  hrefLabel,
}: ReceiptCardProps) {
  const external = href.startsWith("http");
  return (
    <article className="receipt-card">
      <div className="receipt-card__chips">
        <StatusChip label={surface.toUpperCase()} tone="quiet" />
        {!publicSafe && <StatusChip label="NOT_PUBLIC_SAFE" tone="block" />}
      </div>

      <h3 className="receipt-card__title">{title}</h3>

      <p className="receipt-card__status mono" title={statusBadge}>
        {statusBadge}
      </p>

      <div className="receipt-card__body">
        <div className="receipt-card__row">
          <span className="receipt-card__label">Allowed claim</span>
          <p className="receipt-card__text">{claim}</p>
        </div>
        <div className="receipt-card__row">
          <span className="receipt-card__label receipt-card__label--block">Boundary</span>
          <p className="receipt-card__text receipt-card__text--block">{boundary}</p>
        </div>
        {nextGate && (
          <div className="receipt-card__row receipt-card__row--gate">
            <span className="receipt-card__label receipt-card__label--gate">Next gate</span>
            <p className="receipt-card__text receipt-card__text--gate">{nextGate}</p>
          </div>
        )}
      </div>

      <a
        className="receipt-card__link"
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {hrefLabel}
      </a>
    </article>
  );
}

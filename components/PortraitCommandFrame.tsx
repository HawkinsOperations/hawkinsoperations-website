export interface PortraitCommandFrameProps {
  size?: "hero" | "compact";
  showCaption?: boolean;
  showBoundary?: boolean;
  showArc?: boolean;
}

export default function PortraitCommandFrame({
  size = "hero",
  showCaption = true,
  showBoundary = true,
  showArc = true,
}: PortraitCommandFrameProps) {
  const wrapperWidth = size === "hero" ? "max-w-[420px]" : "max-w-[260px]";
  const altText = "Raylee Hawkins, detection engineering and SOC automation profile portrait";
  return (
    <figure className={`relative mx-auto w-full ${wrapperWidth}`} data-portrait>
      <div className="portrait-glow" aria-hidden="true"></div>

      {showArc && (
        <svg className="portrait-arc-quiet" viewBox="0 0 360 360" aria-hidden="true">
          <defs>
            <linearGradient id="arcGradQuiet" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(143, 216, 255, 0.0)" />
              <stop offset="55%" stopColor="rgba(143, 216, 255, 0.45)" />
              <stop offset="100%" stopColor="rgba(201, 211, 223, 0.0)" />
            </linearGradient>
          </defs>
          <circle
            cx="180"
            cy="180"
            r="174"
            fill="none"
            stroke="url(#arcGradQuiet)"
            strokeWidth="0.7"
            strokeDasharray="160 600"
            strokeLinecap="round"
            transform="rotate(-26 180 180)"
          />
          <circle
            cx="180"
            cy="180"
            r="158"
            fill="none"
            stroke="rgba(201, 211, 223, 0.12)"
            strokeWidth="0.4"
            strokeDasharray="2 8"
          />
        </svg>
      )}

      <div className="portrait-frame-editorial">
        <div className="portrait-frame-editorial__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/raylee-hawkins-portrait.jpg"
            alt={altText}
            loading="eager"
            sizes="(max-width: 768px) 80vw, 420px"
          />
        </div>
      </div>

      {showCaption && (
        <figcaption className="mt-5 flex flex-col items-start gap-1 px-1">
          <span className="text-base font-semibold text-[var(--silver-bright)] tracking-tight">Raylee Hawkins</span>
          <span className="text-sm text-[var(--muted)]">Detection Engineering · SOC Automation</span>
          {showBoundary && (
            <span className="mono mt-2 text-[0.6rem] tracking-[0.22em] uppercase text-[var(--silver)]/70">
              Public reviewer surface
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

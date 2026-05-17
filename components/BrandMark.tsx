export interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export default function BrandMark({ size = "md", label = "HawkinsOperations" }: BrandMarkProps) {
  return (
    <span className={`brand-mark brand-mark--${size}`} aria-label={label} role="img">
      <picture>
        <source srcSet="/brand/hawkinsoperations-mark-runtime-1024.avif" type="image/avif" />
        <source srcSet="/brand/hawkinsoperations-mark-runtime-1024.webp" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hawkinsoperations-mark-source.png"
          alt=""
          width={512}
          height={512}
          loading="eager"
          decoding="async"
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </picture>
    </span>
  );
}

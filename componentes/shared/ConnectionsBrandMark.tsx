import "./ConnectionsBrandMark.css";

type BrandVariant = "light" | "dark";
type BrandContext = "nav" | "drawer" | "footer" | "hero";

type ConnectionsBrandMarkProps = {
  src: string;
  variant?: BrandVariant;
  context?: BrandContext;
  className?: string;
};

export function ConnectionsBrandMark({ src, variant = "dark", context = "nav", className }: ConnectionsBrandMarkProps) {
  const classes = ["connections-brand", `connections-brand--${variant}`, `connections-brand--${context}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      <span className="connections-brand__icon-wrap" aria-hidden="true">
        <img className="connections-brand__icon" src={src} alt="" />
      </span>
      <span className="connections-brand__wordmark">CONNECTIONS</span>
    </span>
  );
}

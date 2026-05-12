type SectionHeaderProps = {
  tag?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
};

export function SectionHeader({ tag, title, subtitle, dark = false, center = true }: SectionHeaderProps) {
  return (
    <div className={center ? "section-header fade-in" : "section-header section-header--left fade-in"}>
      {tag && (
        <p className="section-kicker" style={{ color: dark ? "rgba(255,255,255,0.66)" : undefined }}>
          {tag}
        </p>
      )}
      <h2 className="section-title" style={{ color: dark ? "var(--primary-foreground)" : undefined }}>
        {title}
      </h2>
      {subtitle && (
        <p className="section-copy" style={{ color: dark ? "rgba(255,255,255,0.82)" : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

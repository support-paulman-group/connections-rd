import type { ReactNode } from "react";

type WeatherMetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function WeatherMetricCard({ icon, label, value }: WeatherMetricCardProps) {
  return (
    <article className="connections-weather__metric">
      <div className="connections-weather__metric-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{label}</h3>
      <strong>{value}</strong>
    </article>
  );
}

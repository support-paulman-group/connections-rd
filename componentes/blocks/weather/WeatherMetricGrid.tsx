import { Droplets, Sun, Thermometer, Wind } from "lucide-react";
import { WeatherMetricCard } from "./WeatherMetricCard";

type WeatherMetric = {
  key: "temperature" | "humidity" | "wind" | "uv";
  label: string;
  value: string;
};

const icons = {
  temperature: <Thermometer size={32} strokeWidth={1.5} />,
  humidity: <Droplets size={32} strokeWidth={1.5} />,
  wind: <Wind size={32} strokeWidth={1.5} />,
  uv: <Sun size={32} strokeWidth={1.5} />,
};

export function WeatherMetricGrid({ metrics }: { metrics: WeatherMetric[] }) {
  return (
    <div className="connections-weather__metrics">
      {metrics.map((metric) => (
        <WeatherMetricCard icon={icons[metric.key]} key={metric.key} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
}

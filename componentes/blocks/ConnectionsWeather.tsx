import { useEffect, useState } from "react";
import type { ConnectionsWeatherBlock } from "@herramientas/content/types";
import {
  formatWeatherHumidity,
  formatWeatherTemperature,
  formatWeatherUvIndex,
  formatWeatherWindSpeed,
  type WeatherApiResponse,
  type WeatherConditionKey,
  type WeatherUnit,
} from "@herramientas/weather/model";
import { WeatherHeader } from "./weather/WeatherHeader";
import { WeatherMetricGrid } from "./weather/WeatherMetricGrid";
import "./weather/ConnectionsWeather.css";

type Props = ConnectionsWeatherBlock["props"];

export function ConnectionsWeather(props: Props) {
  const [payload, setPayload] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<WeatherUnit>("C");

  useEffect(() => {
    let cancelled = false;

    async function loadWeather(showLoading = false) {
      if (showLoading) setLoading(true);

      try {
        const response = await fetch(`/api/weather?ts=${Date.now()}`, { cache: "no-store", headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("weather endpoint failed");
        const json = (await response.json()) as WeatherApiResponse;
        if (!cancelled) setPayload(json);
      } catch {
        if (!cancelled) setPayload(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadWeather(true);
    const timer = window.setInterval(() => void loadWeather(false), 10 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const analysis = payload?.analysis ?? null;
  const weather = payload?.weather ?? null;
  const conditionKey: WeatherConditionKey = loading ? "unknown" : analysis?.conditionKey ?? weather?.conditionKey ?? "unknown";
  const metrics = [
    {
      key: "temperature" as const,
      label: props.temperatureLabel,
      value: loading ? "—" : formatWeatherTemperature(weather?.temp_exterior_f ?? null, unit),
    },
    {
      key: "humidity" as const,
      label: props.humidityLabel,
      value: loading ? "—" : formatWeatherHumidity(weather?.humedad_exterior ?? null),
    },
    {
      key: "wind" as const,
      label: props.windLabel,
      value: loading ? "—" : formatWeatherWindSpeed(weather?.velocidad_viento_mph ?? weather?.rafaga_viento_mph ?? null),
    },
    {
      key: "uv" as const,
      label: props.uvLabel,
      value: loading ? "—" : formatWeatherUvIndex(weather?.indice_uv ?? null),
    },
  ];

  return (
    <section className="connections-weather" id="weather">
      <div className="connections-weather__inner fade-in">
        <WeatherHeader props={props} conditionKey={conditionKey} loading={loading} unit={unit} onToggleUnit={() => setUnit((current) => (current === "C" ? "F" : "C"))} />
        <WeatherMetricGrid metrics={metrics} />
      </div>
    </section>
  );
}

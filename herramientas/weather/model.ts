import type { WeatherLogRow } from "@herramientas/convex/api";

export type WeatherUnit = "C" | "F";
export type WeatherConditionKey = "rainy" | "windy" | "humid" | "mostly_sunny" | "partly_cloudy" | "clear" | "unknown";
export type WeatherSource = "last-hour" | "latest-available" | "unavailable";

export type WeatherReading = WeatherLogRow & {
  conditionKey: WeatherConditionKey;
  recentCount: number;
  source: WeatherSource;
};

export type WeatherAnalysis = {
  conditionKey: WeatherConditionKey;
  conditionLabel: string;
  headline: string;
  narrative: string;
  sourceLabel: string;
  updatedAt: string | null;
};

export type WeatherApiResponse = {
  weather: WeatherReading | null;
  analysis: WeatherAnalysis | null;
  source: "convex-weather-logs";
  error?: string;
};

const conditionLabels: Record<WeatherConditionKey, string> = {
  rainy: "Rainy",
  windy: "Windy",
  humid: "Humid",
  mostly_sunny: "Mostly Sunny",
  partly_cloudy: "Partly Cloudy",
  clear: "Clear",
  unknown: "No Data",
};

const conditionNarratives: Record<WeatherConditionKey, string> = {
  rainy: "Recent readings show rainfall around Cabarete, so outdoor plans should stay flexible.",
  windy: "The latest hour shows stronger coastal wind, a useful signal for surf and breezy outdoor plans.",
  humid: "The air is carrying a heavier tropical feel, with humidity leading the current conditions.",
  mostly_sunny: "The last hour points to bright tropical light and strong beach-day conditions.",
  partly_cloudy: "The weather is mixed but comfortable, with good light and typical coastal breeze.",
  clear: "Recent readings suggest calm, clear conditions around the project.",
  unknown: "Live station readings are temporarily unavailable, but the weather module is connected to Connections RD logs.",
};

export function buildWeatherApiResponse(rows: WeatherLogRow[], now = Date.now()): WeatherApiResponse {
  const sortedRows = [...rows]
    .filter(Boolean)
    .filter(hasWeatherValues)
    .sort((a, b) => b._creationTime - a._creationTime);
  const latest = sortedRows[0] ?? null;

  if (!latest) return buildEmptyWeatherResponse();

  const oneHourAgo = now - 60 * 60 * 1000;
  const lastHourRows = sortedRows.filter((row) => row._creationTime >= oneHourAgo);
  const analysisRows = lastHourRows.length > 0 ? lastHourRows : [latest];
  const source: WeatherSource = lastHourRows.length > 0 ? "last-hour" : "latest-available";
  const conditionKey = deriveWeatherCondition(analysisRows, latest);
  const weather: WeatherReading = {
    ...latest,
    conditionKey,
    recentCount: analysisRows.length,
    source,
  };

  return {
    weather,
    analysis: buildWeatherAnalysis(weather),
    source: "convex-weather-logs",
  };
}

export function buildEmptyWeatherResponse(error?: string): WeatherApiResponse {
  return {
    weather: null,
    analysis: {
      conditionKey: "unknown",
      conditionLabel: conditionLabels.unknown,
      headline: "Live weather unavailable",
      narrative: conditionNarratives.unknown,
      sourceLabel: "No station readings available",
      updatedAt: null,
    },
    source: "convex-weather-logs",
    error,
  };
}

export function buildWeatherAnalysis(weather: WeatherReading): WeatherAnalysis {
  const sourceLabel = weather.source === "last-hour" ? `Last hour analysis · ${weather.recentCount} readings` : "Latest available reading";

  return {
    conditionKey: weather.conditionKey,
    conditionLabel: conditionLabels[weather.conditionKey],
    headline: buildWeatherHeadline(weather),
    narrative: conditionNarratives[weather.conditionKey],
    sourceLabel,
    updatedAt: new Date(weather._creationTime).toISOString(),
  };
}

export function deriveWeatherCondition(recentRows: WeatherLogRow[], latest: WeatherLogRow | null): WeatherConditionKey {
  if (!latest) return "unknown";

  const rain = maxNumber([
    ...recentRows.map((row) => row.lluvia_diaria_pulg ?? 0),
    ...recentRows.map((row) => row.intensidad_lluvia_pulg_hr ?? row.intensidad_lluvia_in_hr ?? 0),
  ]);
  const uv = averageNumber(recentRows.map((row) => row.indice_uv)) ?? latest.indice_uv ?? 0;
  const humidity = averageNumber(recentRows.map((row) => row.humedad_exterior)) ?? latest.humedad_exterior ?? 0;
  const wind = maxNumber(recentRows.flatMap((row) => [row.velocidad_viento_mph ?? null, row.rafaga_viento_mph ?? null])) ?? latest.velocidad_viento_mph ?? latest.rafaga_viento_mph ?? 0;
  const solar = averageNumber(recentRows.map((row) => row.radiacion_solar)) ?? latest.radiacion_solar ?? 0;

  if ((rain ?? 0) > 0.01) return "rainy";
  if (wind >= 20) return "windy";
  if (humidity >= 88) return "humid";
  if (uv >= 8 && humidity < 70 && wind < 18) return "mostly_sunny";
  if (uv >= 5 || solar >= 350) return "partly_cloudy";
  if (uv <= 3 && humidity < 75 && wind < 12) return "clear";
  return latest.temp_exterior_f != null ? "partly_cloudy" : "unknown";
}

export function buildWeatherHeadline(weather: WeatherReading, unit: WeatherUnit = "F") {
  return `${formatWeatherTemperature(weather.temp_exterior_f ?? null, unit)} · ${formatWeatherHumidity(weather.humedad_exterior ?? null)} · ${formatWeatherWindSpeed(
    weather.velocidad_viento_mph ?? weather.rafaga_viento_mph ?? null,
  )}`;
}

export function formatWeatherTemperature(tempF: number | null, unit: WeatherUnit) {
  if (tempF == null || Number.isNaN(tempF)) return "—";
  return unit === "C" ? `${Math.round(fahrenheitToCelsius(tempF))}°C` : `${Math.round(tempF)}°F`;
}

export function formatWeatherHumidity(humidity: number | null) {
  if (humidity == null || Number.isNaN(humidity)) return "—";
  return `${Math.round(humidity)}%`;
}

export function formatWeatherWindSpeed(windMph: number | null) {
  if (windMph == null || Number.isNaN(windMph)) return "—";
  return `${Math.round(windMph * 1.60934)} km/h`;
}

export function formatWeatherUvIndex(uvIndex: number | null) {
  if (uvIndex == null || Number.isNaN(uvIndex)) return "—";
  return `${Math.round(uvIndex)}`;
}

function fahrenheitToCelsius(tempF: number) {
  return ((tempF - 32) * 5) / 9;
}

function averageNumber(values: Array<number | null | undefined>) {
  const numbers = values.filter((value): value is number => typeof value === "number" && !Number.isNaN(value));
  if (!numbers.length) return null;
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

function maxNumber(values: Array<number | null | undefined>) {
  const numbers = values.filter((value): value is number => typeof value === "number" && !Number.isNaN(value));
  return numbers.length ? Math.max(...numbers) : null;
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function hasWeatherValues(row: WeatherLogRow) {
  return [
    row.temp_exterior_f,
    row.humedad_exterior,
    row.lluvia_diaria_pulg,
    row.intensidad_lluvia_pulg_hr,
    row.intensidad_lluvia_in_hr,
    row.velocidad_viento_mph,
    row.rafaga_viento_mph,
    row.radiacion_solar,
    row.indice_uv,
  ].some((value) => typeof value === "number" && !Number.isNaN(value));
}

import type { FloorPlan } from "@herramientas/content/types";

export const AREA_UNIT_STORAGE_KEY = "connections-area-unit";

export type AreaUnitSystem = "imperial" | "metric";

const EUROPEAN_REGIONS = new Set([
  "AD",
  "AL",
  "AT",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "SE",
  "SI",
  "SK",
  "SM",
  "UA",
  "VA",
]);

const SQ_FT_TO_SQ_M = 0.092903;

export function isAreaUnitSystem(value: string | null): value is AreaUnitSystem {
  return value === "imperial" || value === "metric";
}

function resolveLocaleRegion(locale: string) {
  try {
    const localeInfo = new Intl.Locale(locale);
    return localeInfo.region?.toUpperCase();
  } catch {
    const region = locale.split("-")[1];
    return region?.toUpperCase();
  }
}

export function inferAreaUnit(locale?: string, timeZone?: string): AreaUnitSystem {
  const browserLocale = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
  const browserTimeZone =
    timeZone ?? (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined);
  const region = resolveLocaleRegion(browserLocale);

  if (region === "US") return "imperial";
  if (region && EUROPEAN_REGIONS.has(region)) return "metric";
  if (browserTimeZone?.startsWith("Europe/")) return "metric";

  return "imperial";
}

export function readStoredAreaUnit(storage?: Storage) {
  const resolvedStorage = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
  if (!resolvedStorage) return null;
  const stored = resolvedStorage.getItem(AREA_UNIT_STORAGE_KEY);
  return isAreaUnitSystem(stored) ? stored : null;
}

export function formatArea(plan: FloorPlan, unitSystem: AreaUnitSystem) {
  const areaSqFt = plan.areaSqFt;
  const approximateSuffix = plan.areaIsApproximate ? "+" : "";

  if (!areaSqFt) return plan.sqft;

  if (unitSystem === "metric") {
    return `${Math.round(areaSqFt * SQ_FT_TO_SQ_M).toLocaleString()}${approximateSuffix} sq m`;
  }

  return `${areaSqFt.toLocaleString()}${approximateSuffix} sq ft`;
}

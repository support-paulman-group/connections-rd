export type CaptureLeadArgs = {
  dominio_origen: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  turnstile_token?: string;
};

export type WeatherLogRow = {
  _id: string;
  _creationTime: number;
  raw_payload?: string;
  temp_exterior_f?: number | null;
  humedad_exterior?: number | null;
  lluvia_diaria_pulg?: number | null;
  intensidad_lluvia_pulg_hr?: number | null;
  intensidad_lluvia_in_hr?: number | null;
  velocidad_viento_mph?: number | null;
  rafaga_viento_mph?: number | null;
  radiacion_solar?: number | null;
  indice_uv?: number | null;
  id_estacion?: string | null;
  modelo?: string | null;
};

export const api = {
  leads: {
    captureLead: "leads:captureLead",
  },
  clima: {
    getCurrentWeather: "clima:getCurrentWeather",
    getRecentWeatherHistory: "clima:getRecentWeatherHistory",
  },
} as const;

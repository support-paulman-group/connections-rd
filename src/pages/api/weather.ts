import type { APIRoute } from "astro";
import { api, type WeatherLogRow } from "../../../herramientas/convex/api";
import { convex } from "../../../herramientas/convex/client";
import { buildEmptyWeatherResponse, buildWeatherApiResponse } from "../../../herramientas/weather/model";

export const GET: APIRoute = async () => {
  try {
    const rows = (await convex.query(api.clima.getRecentWeatherHistory as any, { limit: 120 })) as WeatherLogRow[];

    return Response.json(buildWeatherApiResponse(rows), {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=900",
      },
    });
  } catch {
    return Response.json(buildEmptyWeatherResponse("Connections weather unavailable"), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
};

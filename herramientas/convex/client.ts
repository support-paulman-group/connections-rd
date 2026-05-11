import { ConvexHttpClient } from "convex/browser";

const DEFAULT_CONVEX_URL = "https://decisive-kudu-169.convex.cloud";

const convexUrl =
  import.meta.env.PUBLIC_CONVEX_URL ||
  import.meta.env.VITE_CONVEX_URL ||
  import.meta.env.CONVEX_URL ||
  DEFAULT_CONVEX_URL;

export const convex = new ConvexHttpClient(convexUrl);

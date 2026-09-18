import { z } from "zod";

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "preview", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY: z.string().optional().default(""),

  // Server-only
  AUTH_SECRET: z.string().optional().default("chart-plus-dev-secret-key-min-32-chars-long"),
  DATABASE_URL: z.string().optional().default(""),
  GOOGLE_MAPS_SERVER_API_KEY: z.string().optional().default(""),
  NOAA_NWS_USER_AGENT: z
    .string()
    .default("(CHART-Plus-OEH-App, contact@chartplus.org)"),
  CRON_SECRET: z.string().optional().default("dev-cron-secret"),
  PUBLIC_DATA_REFRESH_ENABLED: z
    .string()
    .transform((val) => val === "true")
    .default("true"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY,
  AUTH_SECRET: process.env.AUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_MAPS_SERVER_API_KEY: process.env.GOOGLE_MAPS_SERVER_API_KEY,
  NOAA_NWS_USER_AGENT: process.env.NOAA_NWS_USER_AGENT,
  CRON_SECRET: process.env.CRON_SECRET,
  PUBLIC_DATA_REFRESH_ENABLED: process.env.PUBLIC_DATA_REFRESH_ENABLED,
});

import type { MetadataRoute } from "next";
import { publicClient } from "@/lib/supabase";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitness-manuals.vercel.app";

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

const CATEGORIES = [
  "treadmill","elliptical","exercise-bike","rowing-machine",
  "home-gym","weight-bench","strength-machine","stepper","cross-trainer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = publicClient();

  const { data: brandRows } = await db.from("brands").select("id").in("slug", FITNESS_BRANDS);
  const brandIds = (brandRows ?? []).map((b) => b.id);
  const { data: machines } = await db.from("machines").select("slug, updated_at").in("brand_id", brandIds);

  const machineUrls: MetadataRoute.Sitemap = (machines ?? []).map((m) => ({
    url: `${BASE}/machines/${m.slug}`,
    lastModified: m.updated_at ? new Date(m.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const brandUrls: MetadataRoute.Sitemap = FITNESS_BRANDS.map((slug) => ({
    url: `${BASE}/brands/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((slug) => ({
    url: `${BASE}/category/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/brands`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.4 },
    ...brandUrls,
    ...categoryUrls,
    ...machineUrls,
  ];
}

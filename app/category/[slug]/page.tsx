import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicClient } from "@/lib/supabase";
import { CATEGORY_LABELS, CATEGORY_ICONS, EquipmentCategory } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

const ALL_CATEGORIES: EquipmentCategory[] = [
  "treadmill","elliptical","exercise-bike","rowing-machine",
  "home-gym","weight-bench","strength-machine","stepper","cross-trainer","other",
];

export async function generateStaticParams() {
  return ALL_CATEGORIES.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as EquipmentCategory];
  if (!label) return {};
  return {
    title: `${label} Manuals — Free PDF Downloads`,
    description: `Free PDF instruction manuals for ${label.toLowerCase()}s. NordicTrack, Weider, ProForm, Bowflex, Schwinn and more.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as EquipmentCategory];
  if (!label) notFound();

  const db = publicClient();
  const { data: brandRows } = await db.from("brands").select("id, name, slug").in("slug", FITNESS_BRANDS);
  const brandIds = (brandRows ?? []).map((b) => b.id);
  const brandMap = Object.fromEntries((brandRows ?? []).map((b) => [b.id, b]));

  const { data: machines } = await db
    .from("machines")
    .select("slug, model_name, brand_id, discontinued, manual_url")
    .in("brand_id", brandIds)
    .eq("category", slug)
    .order("model_name");

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: label, path: `/category/${slug}` },
      ])} />

      <div className="bg-slate-900 text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {" / "}
            <span className="text-slate-300">{label}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{CATEGORY_ICONS[slug as EquipmentCategory]}</span>
            <h1 className="text-3xl font-bold">{label} Manuals</h1>
          </div>
          <p className="text-slate-300 mt-2 text-sm">{(machines ?? []).length} manuals available</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid gap-2">
        {(machines ?? []).length === 0 ? (
          <p className="text-slate-500 text-sm">No manuals yet for this category.</p>
        ) : (
          (machines ?? []).map((m) => {
            const brand = brandMap[m!.brand_id];
            return (
              <Link key={m!.slug} href={`/machines/${m!.slug}`}
                className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3 hover:border-green-400 hover:bg-green-50 transition group">
                <div>
                  <span className="font-semibold text-slate-800 group-hover:text-green-700">
                    {brand?.name} {m!.model_name}
                  </span>
                  {m!.discontinued && (
                    <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Discontinued</span>
                  )}
                </div>
                <span className="text-green-500 text-sm shrink-0">{m!.manual_url ? "View PDF →" : "Info →"}</span>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}

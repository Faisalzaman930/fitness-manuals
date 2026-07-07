import Link from "next/link";
import { publicClient } from "@/lib/supabase";
import JsonLd from "@/components/JsonLd";
import { websiteSchema } from "@/lib/seo";
import { CATEGORY_LABELS, CATEGORY_ICONS, EquipmentCategory } from "@/lib/types";

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

const FEATURED_CATEGORIES: EquipmentCategory[] = [
  "treadmill","elliptical","exercise-bike","home-gym","rowing-machine","strength-machine",
];

export default async function HomePage() {
  const db = publicClient();
  const { data: brands } = await db
    .from("brands")
    .select("slug, name, country")
    .in("slug", FITNESS_BRANDS)
    .order("name");

  const { count: machineCount } = await db
    .from("machines")
    .select("*", { count: "exact", head: true })
    .in("brand_id",
      (await db.from("brands").select("id").in("slug", FITNESS_BRANDS)).data?.map((b) => b.id) ?? []
    );

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={websiteSchema()} />

      {/* Hero */}
      <div className="bg-slate-900 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Fitness Machine Manuals</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Free instruction, assembly, and service manuals for treadmills, ellipticals, home gyms, exercise bikes, and more.
            {machineCount ? ` ${machineCount.toLocaleString()} manuals across ${(brands ?? []).length} brands.` : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link key={cat} href={`/category/${cat}`}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Browse by Brand</h2>
        <p className="text-slate-500 text-sm mb-6">Select your equipment brand to find your model&apos;s manual.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(brands ?? []).map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`}
              className="border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:bg-green-50 transition group text-center">
              <p className="font-bold text-slate-800 group-hover:text-green-700 text-sm">{b.name}</p>
              {b.country && <p className="text-xs text-slate-400 mt-0.5">{b.country}</p>}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/brands" className="text-sm text-green-600 hover:underline">View all brands →</Link>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-slate-50 px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Browse by Equipment Type</h2>
          <p className="text-slate-500 text-sm mb-6">Find manuals for your type of fitness equipment.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link key={cat} href={`/category/${cat}`}
                className="border border-slate-200 bg-white rounded-xl p-5 hover:border-green-400 hover:bg-green-50 transition group">
                <div className="text-3xl mb-2">{CATEGORY_ICONS[cat]}</div>
                <h3 className="font-bold text-slate-800 group-hover:text-green-700">{CATEGORY_LABELS[cat]}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why us */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why Use FitnessMachineManuals?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: "Lost your manual?", body: "Bought used equipment, moved house, or the paper copy is long gone — we have it." },
            { title: "Always free", body: "No signup, no paywall. Find your model and download or open the PDF directly." },
            { title: "30+ brands covered", body: "NordicTrack, Weider, ProForm, Bowflex, LifeFitness, Precor, Schwinn and more." },
          ].map((item) => (
            <div key={item.title} className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

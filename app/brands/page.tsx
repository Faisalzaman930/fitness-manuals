import type { Metadata } from "next";
import Link from "next/link";
import { publicClient } from "@/lib/supabase";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Fitness Equipment Brands — Manual Index",
  description: "Browse fitness machine manuals by brand. NordicTrack, Weider, ProForm, Bowflex, LifeFitness, Precor, Schwinn, Body-Solid and more.",
  alternates: { canonical: "/brands" },
};

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

export default async function BrandsPage() {
  const { data: brands } = await publicClient()
    .from("brands")
    .select("slug, name, country, description")
    .in("slug", FITNESS_BRANDS)
    .order("name");

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "All Brands", path: "/brands" },
      ])} />

      <div className="bg-slate-900 text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {" / "}
            <span className="text-slate-300">All Brands</span>
          </nav>
          <h1 className="text-3xl font-bold">All Fitness Equipment Brands</h1>
          <p className="text-slate-300 mt-2 text-sm">{(brands ?? []).length} brands — select yours to find your model</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {(brands ?? []).map((b) => (
          <Link key={b.slug} href={`/brands/${b.slug}`}
            className="border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:bg-green-50 transition group text-center">
            <p className="font-bold text-slate-800 group-hover:text-green-700 text-sm">{b.name}</p>
            {b.country && <p className="text-xs text-slate-400 mt-0.5">{b.country}</p>}
          </Link>
        ))}
      </div>
    </main>
  );
}

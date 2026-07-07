import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicClient } from "@/lib/supabase";
import { CATEGORY_LABELS, EquipmentCategory } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

export async function generateStaticParams() {
  return FITNESS_BRANDS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: brand } = await publicClient().from("brands").select("name, description").eq("slug", slug).single();
  if (!brand) return {};
  return {
    title: `${brand.name} Fitness Equipment Manuals — Free PDF Downloads`,
    description: `Download free PDF manuals for ${brand.name} fitness equipment. Treadmills, ellipticals, home gyms, exercise bikes and more.`,
    alternates: { canonical: `/brands/${slug}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  if (!FITNESS_BRANDS.includes(slug)) notFound();

  const db = publicClient();
  const { data: brand } = await db.from("brands").select("*").eq("slug", slug).single();
  if (!brand) notFound();

  const { data: machines } = await db
    .from("machines")
    .select("slug, model_name, category, discontinued, manual_url")
    .eq("brand_id", brand.id)
    .order("model_name");

  const byCategory = (machines ?? []).reduce<Record<string, typeof machines>>((acc, m) => {
    const cat = m!.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(m);
    return acc;
  }, {});

  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Brands", path: "/brands" },
      { name: `${brand.name} Manuals`, path: `/brands/${slug}` },
    ]),
    organizationSchema({
      name: brand.name,
      url: brand.website ?? `https://fitness-manuals.vercel.app/brands/${slug}`,
      description: brand.description ?? `${brand.name} fitness equipment manufacturer`,
      country: brand.country ?? "USA",
    }),
  ];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={schemas} />

      <div className="bg-slate-900 text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {" / "}
            <Link href="/brands" className="hover:text-white transition">Brands</Link>
            {" / "}
            <span className="text-slate-300">{brand.name}</span>
          </nav>
          <h1 className="text-3xl font-bold">{brand.name} Fitness Equipment Manuals</h1>
          <p className="text-slate-300 mt-2 text-sm">{(machines ?? []).length} manuals available</p>
          {brand.description && (
            <p className="text-slate-300 mt-3 text-sm max-w-2xl leading-relaxed">{brand.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {Object.entries(byCategory).map(([cat, items]) => (
          <section key={cat}>
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              {CATEGORY_LABELS[cat as EquipmentCategory] ?? cat}
              <span className="ml-2 text-sm font-normal text-slate-400">({items?.length})</span>
            </h2>
            <div className="grid gap-2">
              {(items ?? []).map((m) => (
                <Link key={m!.slug} href={`/machines/${m!.slug}`}
                  className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3 hover:border-green-400 hover:bg-green-50 transition group">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-800 group-hover:text-green-700">
                      {brand.name} {m!.model_name}
                    </span>
                    {m!.discontinued && (
                      <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Discontinued</span>
                    )}
                  </div>
                  <span className="text-green-500 text-sm shrink-0">
                    {m!.manual_url ? "View PDF →" : "Info →"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

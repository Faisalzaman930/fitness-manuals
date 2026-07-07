import Link from "next/link";
import { notFound } from "next/navigation";
import { publicClient } from "@/lib/supabase";
import { CATEGORY_LABELS, EquipmentCategory } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import PdfViewer from "@/components/PdfViewer";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";

const FITNESS_BRANDS = [
  "nordictrack","weider","proform","bowflex","lifefitness","precor",
  "schwinn","body-solid","marcy","sole-fitness","horizon-fitness","cybex",
  "nautilus","gold-gym","reebok-fitness","kettler","matrix-fitness",
];

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const db = publicClient();
  const { data: brandRows } = await db.from("brands").select("id").in("slug", FITNESS_BRANDS);
  const brandIds = (brandRows ?? []).map((b) => b.id);
  const { data } = await db.from("machines").select("slug").in("brand_id", brandIds);
  return (data ?? []).map((m) => ({ slug: m.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: m } = await publicClient()
    .from("machines").select("model_name, description, category, brand:brands(name, slug)").eq("slug", slug).single();
  if (!m) return {};
  const brand = Array.isArray(m.brand) ? m.brand[0] : m.brand;
  const catLabel = CATEGORY_LABELS[m.category as EquipmentCategory] ?? "Fitness Equipment";
  return {
    title: `${brand?.name ?? ""} ${m.model_name} Manual PDF — Free Download`,
    description: `Download the free ${brand?.name ?? ""} ${m.model_name} ${catLabel.toLowerCase()} instruction manual (PDF). View in browser or save to your device.`,
    alternates: { canonical: `/machines/${slug}` },
    openGraph: {
      title: `${brand?.name ?? ""} ${m.model_name} Manual PDF`,
      description: m.description ?? `Free PDF manual for the ${brand?.name ?? ""} ${m.model_name}.`,
      type: "article",
    },
  };
}

export default async function MachinePage({ params }: Props) {
  const { slug } = await params;
  const db = publicClient();
  const { data: m } = await db.from("machines").select("*, brand:brands(*)").eq("slug", slug).single();
  if (!m) notFound();

  const brand = Array.isArray(m.brand) ? m.brand[0] : m.brand;
  if (!FITNESS_BRANDS.includes(brand?.slug ?? "")) notFound();

  const { data: related } = await db
    .from("machines").select("slug, model_name")
    .eq("brand_id", m.brand_id).neq("slug", slug).limit(5);

  const catLabel = CATEGORY_LABELS[m.category as EquipmentCategory] ?? "Fitness Equipment";

  const faqItems = [
    {
      q: `Where can I download the ${brand?.name} ${m.model_name} manual?`,
      a: `You can view and download the free PDF instruction manual for the ${brand?.name} ${m.model_name} directly on this page.`,
    },
    m.discontinued && {
      q: `Is the ${brand?.name} ${m.model_name} discontinued?`,
      a: `Yes, the ${brand?.name} ${m.model_name} has been discontinued. However, its instruction manual is still available as a free PDF download on this page.`,
    },
    {
      q: `What type of equipment is the ${brand?.name} ${m.model_name}?`,
      a: `The ${brand?.name} ${m.model_name} is a ${catLabel.toLowerCase()}.`,
    },
  ].filter(Boolean) as { q: string; a: string }[];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${brand?.name} Manuals`, path: `/brands/${brand?.slug}` },
      { name: m.model_name, path: `/machines/${slug}` },
    ]),
    productSchema({
      name: `${brand?.name ?? ""} ${m.model_name}`,
      description: m.description ?? `${brand?.name ?? ""} ${m.model_name} ${catLabel.toLowerCase()}`,
      brand: brand?.name ?? "",
      url: `/machines/${slug}`,
    }),
    faqSchema(faqItems),
  ];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={schemas} />

      <div className="bg-slate-900 text-white px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {" / "}
            <Link href={`/brands/${brand?.slug}`} className="hover:text-white transition">{brand?.name}</Link>
            {" / "}
            <span className="text-slate-300">{m.model_name}</span>
          </nav>
          <h1 className="text-3xl font-bold">{brand?.name} {m.model_name} Manual</h1>
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">{catLabel}</span>
            {m.discontinued && <span className="bg-red-900 text-red-200 px-2 py-1 rounded">Discontinued</span>}
          </div>
          {m.description && (
            <p className="text-slate-300 mt-4 max-w-2xl text-sm leading-relaxed">{m.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {brand?.name} {m.model_name} Instruction Manual (PDF)
          </h2>
          {m.manual_url ? (
            <PdfViewer url={m.manual_url} title={`${brand?.name ?? ""} ${m.model_name} Manual`} />
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Manual PDF not yet available for this model. Check back soon.
            </div>
          )}
        </section>

        {faqItems.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 mb-1">{item.q}</h3>
                  <p className="text-slate-600 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(related ?? []).length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">More {brand?.name} Manuals</h2>
            <div className="grid gap-2">
              {(related ?? []).map((r) => (
                <Link key={r.slug} href={`/machines/${r.slug}`}
                  className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3 hover:border-green-400 hover:bg-green-50 transition group">
                  <span className="font-semibold text-slate-800 group-hover:text-green-700">
                    {brand?.name} {r.model_name}
                  </span>
                  <span className="text-green-500 text-sm">View PDF →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

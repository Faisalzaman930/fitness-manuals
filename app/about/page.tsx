import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FitnessManuals — Free Fitness Equipment Manual PDFs",
  description: "FitnessManuals helps you find free PDF instruction manuals for treadmills, ellipticals, home gyms, exercise bikes and more. No signup needed.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {" / "}
            <span className="text-slate-300">About</span>
          </nav>
          <h1 className="text-3xl font-bold">About FitnessManuals</h1>
          <p className="text-slate-300 mt-2">Your free resource for fitness equipment instruction manuals</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 prose prose-slate max-w-none">

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">What we do</h2>
          <p className="text-slate-600 leading-relaxed">
            FitnessManuals is a free directory of instruction manuals for home and commercial fitness equipment.
            Whether you just bought a second-hand treadmill, lost your original manual, or need assembly
            instructions for a home gym that arrived in 47 pieces — we help you find the PDF you need, fast.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Why we built this</h2>
          <p className="text-slate-600 leading-relaxed">
            Fitness equipment manufacturers are often inconsistent about making manuals accessible online.
            Older models get buried, product pages get updated without archiving previous manuals, and
            third-party manual sites are cluttered and slow. We index manuals from trusted sources and
            link directly to the original PDF — no paywalls, no popups, no email required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Brands we cover</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We currently cover 14+ major fitness equipment brands including:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 not-prose">
            {[
              "NordicTrack","Weider","ProForm","Bowflex","Schwinn",
              "Body-Solid","Marcy","Sole Fitness","Nautilus","Gold's Gym",
              "LifeFitness","Precor","Cybex","Horizon Fitness",
            ].map((b) => (
              <div key={b} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium">
                {b}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">
            More brands added regularly.{" "}
            <Link href="/brands" className="text-green-600 hover:underline">Browse all brands →</Link>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Equipment types</h2>
          <p className="text-slate-600 leading-relaxed">
            We cover treadmills, ellipticals, exercise bikes, rowing machines, home gyms, strength machines,
            weight benches, steppers, and more. Browse by{" "}
            <Link href="/category/treadmill" className="text-green-600 hover:underline">category</Link>{" "}
            or search for your specific model.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Missing a manual?</h2>
          <p className="text-slate-600 leading-relaxed">
            If you can&apos;t find your model, try searching directly on{" "}
            <a href="https://www.manualslib.com" target="_blank" rel="noopener noreferrer"
              className="text-green-600 hover:underline">ManualsLib</a>{" "}
            or the manufacturer&apos;s support page. We regularly add new manuals — check back if yours
            isn&apos;t listed yet.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <p className="text-slate-500 text-sm">
            FitnessManuals is an independent reference site. All manuals link to their original sources.
            Brand names and trademarks belong to their respective owners.
          </p>
        </section>

      </div>
    </main>
  );
}

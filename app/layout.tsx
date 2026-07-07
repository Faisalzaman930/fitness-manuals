import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fitness-manuals.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Fitness Machine Manuals — Free PDF Downloads",
    template: "%s | FitnessMachineManuals",
  },
  description:
    "Free instruction and assembly manuals for fitness equipment. NordicTrack, Weider, ProForm, Bowflex, LifeFitness, Precor and more — view or download PDF.",
  openGraph: { siteName: "FitnessMachineManuals", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">

        <header className="border-b border-slate-200 bg-slate-900 sticky top-0 z-50">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="text-lg font-bold text-white shrink-0">
              💪 FitnessManuals
            </Link>
            <nav className="flex gap-4 text-sm shrink-0">
              <Link href="/category/treadmill" className="text-slate-300 hover:text-white transition">Treadmills</Link>
              <Link href="/category/elliptical" className="text-slate-300 hover:text-white transition">Ellipticals</Link>
              <Link href="/category/exercise-bike" className="text-slate-300 hover:text-white transition">Bikes</Link>
              <Link href="/category/home-gym" className="text-slate-300 hover:text-white transition hidden sm:inline">Home Gyms</Link>
              <Link href="/brands" className="text-slate-300 hover:text-white transition">All Brands</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16 border-t border-slate-200 bg-slate-900 py-10 text-slate-400 text-sm">
          <div className="mx-auto max-w-5xl px-4 grid gap-8 sm:grid-cols-4">
            <div>
              <p className="font-semibold text-white mb-3">Top Brands</p>
              <ul className="space-y-1.5">
                <li><Link href="/brands/nordictrack" className="hover:text-white transition">NordicTrack</Link></li>
                <li><Link href="/brands/weider" className="hover:text-white transition">Weider</Link></li>
                <li><Link href="/brands/proform" className="hover:text-white transition">ProForm</Link></li>
                <li><Link href="/brands/bowflex" className="hover:text-white transition">Bowflex</Link></li>
                <li><Link href="/brands/lifefitness" className="hover:text-white transition">LifeFitness</Link></li>
                <li><Link href="/brands/precor" className="hover:text-white transition">Precor</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Equipment Types</p>
              <ul className="space-y-1.5">
                <li><Link href="/category/treadmill" className="hover:text-white transition">Treadmills</Link></li>
                <li><Link href="/category/elliptical" className="hover:text-white transition">Ellipticals</Link></li>
                <li><Link href="/category/exercise-bike" className="hover:text-white transition">Exercise Bikes</Link></li>
                <li><Link href="/category/home-gym" className="hover:text-white transition">Home Gyms</Link></li>
                <li><Link href="/category/rowing-machine" className="hover:text-white transition">Rowing Machines</Link></li>
                <li><Link href="/category/strength-machine" className="hover:text-white transition">Strength Machines</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">More Brands</p>
              <ul className="space-y-1.5">
                <li><Link href="/brands/schwinn" className="hover:text-white transition">Schwinn</Link></li>
                <li><Link href="/brands/body-solid" className="hover:text-white transition">Body-Solid</Link></li>
                <li><Link href="/brands/marcy" className="hover:text-white transition">Marcy</Link></li>
                <li><Link href="/brands/sole-fitness" className="hover:text-white transition">Sole Fitness</Link></li>
                <li><Link href="/brands/horizon-fitness" className="hover:text-white transition">Horizon Fitness</Link></li>
                <li><Link href="/brands/cybex" className="hover:text-white transition">Cybex</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">About</p>
              <ul className="space-y-1.5 mb-3">
                <li><Link href="/about" className="hover:text-white transition">About this site</Link></li>
                <li><Link href="/sitemap.xml" className="hover:text-white transition">Sitemap</Link></li>
              </ul>
              <p className="text-slate-500 text-xs leading-relaxed">
                Free PDFs sourced from manufacturers and authorized retailers. We do not host copyrighted files.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-4 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-600">
            © {new Date().getFullYear()} FitnessMachineManuals — All manuals are the property of their respective manufacturers.
          </div>
        </footer>

      </body>
    </html>
  );
}

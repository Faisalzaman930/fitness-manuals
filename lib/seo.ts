const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fitness-manuals.vercel.app";

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  brand: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    brand: { "@type": "Brand", name: opts.brand },
    url: `${SITE}${opts.url}`,
    category: "Fitness Equipment",
  };
}

export function organizationSchema(opts: {
  name: string;
  url: string;
  description: string;
  country: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    foundingLocation: { "@type": "Country", name: opts.country },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fitness Machine Manuals",
    url: SITE,
    description:
      "Free instruction and assembly manuals for fitness equipment — treadmills, ellipticals, home gyms, exercise bikes, and more. NordicTrack, Weider, ProForm, Bowflex, and 30+ brands.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE}/brands` },
      "query-input": "required name=search_term_string",
    },
  };
}

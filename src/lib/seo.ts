export interface SeoOptions {
  noindex?: boolean;
  canonical?: string;
  keywords?: string[];
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function seo(
  title: string,
  description: string,
  options?: SeoOptions
) {
  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: options?.ogType ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (options?.keywords && options.keywords.length > 0) {
    meta.push({ name: "keywords", content: options.keywords.join(", ") });
  }

  if (options?.ogImage) {
    meta.push({ property: "og:image", content: options.ogImage });
    meta.push({ name: "twitter:image", content: options.ogImage });
  }

  if (options?.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    meta.push({ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" });
  }

  const links: Array<{ rel: string; href: string }> = [];
  if (options?.canonical) {
    links.push({ rel: "canonical", href: options.canonical });
  }

  const scripts: Array<{ type: string; children: string }> = [];
  if (options?.schema) {
    const schemas = Array.isArray(options.schema) ? options.schema : [options.schema];
    for (const s of schemas) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(s),
      });
    }
  }

  return {
    meta,
    links: links.length > 0 ? links : undefined,
    scripts: scripts.length > 0 ? scripts : undefined,
  };
}

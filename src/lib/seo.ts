export function seo(
  title: string,
  description: string,
  options?: { noindex?: boolean }
) {
  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];

  if (options?.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return { meta };
}


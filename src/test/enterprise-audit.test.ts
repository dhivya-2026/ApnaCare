import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { SERVICES, CITIES, ATTENDANTS, SITE, FAQS } from "@/data/site";
import { ENTERPRISE_SERVICES, AEO_FAQS } from "@/data/enterprise-content";

describe("Enterprise Audit Verification", () => {
  it("enforces enterprise security headers in vercel.json", () => {
    const vercelConfigPath = path.resolve(process.cwd(), "vercel.json");
    expect(fs.existsSync(vercelConfigPath)).toBe(true);
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf-8"));

    expect(vercelConfig.headers).toBeDefined();
    expect(Array.isArray(vercelConfig.headers)).toBe(true);

    const wildcardHeader = vercelConfig.headers.find((h: any) => h.source === "/(.*)");
    expect(wildcardHeader).toBeDefined();

    const headerKeys = wildcardHeader.headers.map((h: any) => h.key);
    expect(headerKeys).toContain("X-Content-Type-Options");
    expect(headerKeys).toContain("X-Frame-Options");
    expect(headerKeys).toContain("X-XSS-Protection");
    expect(headerKeys).toContain("Referrer-Policy");
    expect(headerKeys).toContain("Permissions-Policy");
  });

  it("validates sitemap.xml exists and covers all core public routes", () => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

    expect(sitemapContent).toContain("https://apna-care.vercel.app/");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/services");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/booking");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/cities");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/about");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/safety");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/contact");
    expect(sitemapContent).toContain("https://apna-care.vercel.app/knowledge-hub");

    // All 11 services in sitemap
    for (const service of SERVICES) {
      expect(sitemapContent).toContain(`https://apna-care.vercel.app/services/${service.slug}`);
    }

    // All 4 cities in sitemap
    for (const city of CITIES) {
      expect(sitemapContent).toContain(`https://apna-care.vercel.app/cities/${city.slug}`);
    }
  });

  it("preserves authentic business facts and contact channels", () => {
    expect(SITE.SUPPORT_PHONE).toBe("+91 88254 93949");
    expect(SITE.SUPPORT_PHONE_TEL).toBe("+918825493949");
    expect(SITE.EMAIL).toBe("care@apnacare.in");
    expect(SITE.WHATSAPP).toBe("918825493949");
    expect(CITIES.length).toBe(4);
    expect(ATTENDANTS.length).toBe(6);
  });

  it("contains rich enterprise service descriptions and AEO questions", () => {
    expect(Object.keys(ENTERPRISE_SERVICES).length).toBe(4);
    expect(AEO_FAQS.length).toBeGreaterThanOrEqual(6);
  });
});

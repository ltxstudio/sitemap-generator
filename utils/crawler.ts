import axios from "axios";
import cheerio from "cheerio";
import { create } from "xmlbuilder2";

interface Settings {
  includeLastmod?: boolean;
  priority?: number;
}

export async function generateSitemap(url: string, settings: Settings = {}) {
  const visited = new Set<string>();
  const toVisit = [url];
  const baseUrl = new URL(url).origin;

  while (toVisit.length > 0) {
    const currentUrl = toVisit.pop()!;
    if (visited.has(currentUrl)) continue;

    try {
      const { data } = await axios.get(currentUrl);
      const $ = cheerio.load(data);

      $("a[href]").each((_, element) => {
        const link = $(element).attr("href");
        if (link) {
          const absoluteLink = new URL(link, baseUrl).href;
          if (absoluteLink.startsWith(baseUrl) && !visited.has(absoluteLink)) {
            toVisit.push(absoluteLink);
          }
        }
      });

      visited.add(currentUrl);
    } catch (error) {
      console.error(`Failed to fetch ${currentUrl}:`, error.message);
    }
  }

  const urls = Array.from(visited);
  const xml = create({ version: "1.0" })
    .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" });

  urls.forEach((url) => {
    const urlNode = xml.ele("url").ele("loc").txt(url).up();
    if (settings.includeLastmod) {
      urlNode.ele("lastmod").txt(new Date().toISOString()).up();
    }
    if (settings.priority) {
      urlNode.ele("priority").txt(settings.priority.toFixed(1)).up();
    }
  });

  return xml.end({ prettyPrint: true });
}
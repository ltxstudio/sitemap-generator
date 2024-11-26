"use client";

import { useState } from "react";
import SitemapPreview from "./SitemapPreview";

export default function SitemapForm() {
  const [url, setUrl] = useState("");
  const [changefreq, setChangefreq] = useState("daily");
  const [excludeUrls, setExcludeUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sitemap, setSitemap] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setSitemap(null);

    try {
      const response = await fetch("/api/generate-sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          settings: { changefreq, excludeUrls },
        }),
      });

      if (!response.ok) throw new Error("Failed to generate sitemap");

      const sitemapText = await response.text();
      setSitemap(sitemapText);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); // Safely access 'message' property
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div className="space-y-4">
        <input
          type="url"
          placeholder="Enter website URL"
          className="w-full p-2 border rounded dark:bg-gray-700"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label>
          Change Frequency:
          <select
            value={changefreq}
            onChange={(e) => setChangefreq(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 mt-2"
          >
            <option value="always">Always</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="never">Never</option>
          </select>
        </label>
        <textarea
          placeholder="Enter URLs to exclude (one per line)"
          rows={3}
          className="w-full p-2 border rounded dark:bg-gray-700"
          onChange={(e) => setExcludeUrls(e.target.value.split("\n"))}
        ></textarea>
        <button
          className="w-full py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Sitemap"}
        </button>
      </div>
      {sitemap && <SitemapPreview sitemap={sitemap} />}
    </div>
  );
}

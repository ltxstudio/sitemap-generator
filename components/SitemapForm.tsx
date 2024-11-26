"use client";

import { useState } from "react";
import SitemapPreview from "./SitemapPreview";

export default function SitemapForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [sitemap, setSitemap] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setSitemap(null);

    try {
      const response = await fetch("/api/generate-sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed to generate sitemap");

      const sitemapText = await response.text();
      setSitemap(sitemapText);
    } catch (error) {
      console.error(error.message);
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

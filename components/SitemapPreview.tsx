"use client";

export default function SitemapPreview({ sitemap }: { sitemap: string }) {
  const downloadSitemap = () => {
    const blob = new Blob([sitemap], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <pre className="text-sm overflow-auto">{sitemap}</pre>
      <button
        onClick={downloadSitemap}
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Download Sitemap
      </button>
    </div>
  );
}

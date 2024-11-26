import SitemapForm from "../components/SitemapForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-2">
          Sitemap Generator
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Generate, preview, and download sitemaps for your website.
        </p>
      </div>
      <SitemapForm />
    </div>
  );
}

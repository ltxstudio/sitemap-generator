import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

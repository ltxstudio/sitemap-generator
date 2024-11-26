"use client";

import { useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary dark:text-secondary">
          Sitemap Generator
        </h1>
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

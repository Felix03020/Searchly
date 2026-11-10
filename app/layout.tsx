
import React from "react";

export default function Layout() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navigation */}
      <header className="flex justify-end items-center gap-6 p-5 text-sm">
        <a href="#" className="hover:underline">
          Gmail
        </a>
        <a href="#" className="hover:underline">
          Bilder
        </a>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Anmelden
        </button>
      </header>

      {/* Main Search Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        {/* Logo */}
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight mb-10">
          <span className="text-blue-500">S</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">a</span>
          <span className="text-blue-500">r</span>
          <span className="text-green-500">c</span>
          <span className="text-red-500">h</span>
        </h1>

        {/* Search Form */}
        <form
          action="/search"
          method="GET"
          className="w-full max-w-2xl"
        >
          <div className="flex items-center gap-3 border border-gray-300 rounded-full px-5 py-3 shadow-sm hover:shadow-md focus-within:shadow-md transition">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path
                d="m16 16 4 4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="search"
              name="q"
              placeholder="Suchbegriff eingeben..."
              className="flex-1 outline-none bg-transparent text-base"
              autoComplete="off"
            />

            <button
              type="submit"
              aria-label="Suchen"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-5-5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Search Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-md text-sm transition"
            >
              Google-Suche
            </button>

            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-md text-sm transition"
            >
              Auf gut Glück!
            </button>
          </div>
        </form>

        {/* Language */}
        <p className="mt-8 text-sm text-gray-500">
          Suche in deutscher Sprache
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-sm">
        <div className="px-6 py-4 border-b border-gray-300">
          Deutschland
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:underline">Über uns</a>
            <a href="#" className="hover:underline">Werbung</a>
            <a href="#" className="hover:underline">Unternehmen</a>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:underline">Datenschutz</a>
            <a href="#" className="hover:underline">Nutzungsbedingungen</a>
            <a href="#" className="hover:underline">Einstellungen</a>
          </div>
        </div>
      </footer>
    </main>
  );
}


"use client";

import { useState } from "react";
import {
  Search,
  ArrowRight,
  Globe,
  Image,
  Video,
  Newspaper,
  Loader2,
  ExternalLink,
} from "lucide-react";

type Category = "general" | "images" | "videos" | "news";

type Result = {
  title: string;
  url: string;
  content: string;
  engine: string;
  image: string | null;
};

const tabs = [
  { id: "general", label: "Web", icon: Globe },
  { id: "images", label: "Bilder", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
  { id: "news", label: "News", icon: Newspaper },
] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("general");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query.trim())}&category=${category}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Suche fehlgeschlagen");
      }

      setResults(data.results || []);
    } catch (err) {
      setResults([]);
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#09090f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <button
          onClick={() => {
            setQuery("");
            setResults([]);
            setSearched(false);
            setError("");
          }}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-violet-600 p-2.5">
            <Search size={23} />
          </div>
          <span className="text-2xl font-bold">
            Searchly<span className="text-violet-400">.</span>
          </span>
        </button>

        <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-gray-400">
          ● Keine Anmeldung
        </span>
      </header>

      <section
        className={`mx-auto flex max-w-4xl flex-col px-6 ${
          searched ? "pt-10" : "pt-28"
        }`}
      >
        {!searched && (
          <div className="mb-12 text-center">
            <div className="mb-7 text-sm text-violet-300">
              ✨ Die Suche beginnt hier
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Entdecke das
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Internet.
              </span>
            </h1>

            <p className="mt-6 text-gray-400">
              Eine Suche. Unzählige Möglichkeiten.
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          className="flex items-center rounded-2xl border border-white/10 bg-[#15151f] p-2 shadow-2xl shadow-violet-950/20 focus-within:border-violet-500/60"
        >
          <Search className="ml-4 shrink-0 text-gray-500" size={21} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Wonach suchst du?"
            className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none placeholder:text-gray-600"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 transition hover:bg-violet-500 disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={19} />
            ) : (
              <>
                <span className="hidden sm:inline">Suchen</span>
                <ArrowRight size={19} />
              </>
            )}
          </button>
        </form>

        <nav className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = category === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCategory(tab.id);
                  setResults([]);
                  setSearched(false);
                  setError("");
                }}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm transition ${
                  active
                    ? "bg-violet-600 text-white"
                    : "border border-white/10 bg-[#15151f] text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <section className="mt-12 pb-20">
          {loading && (
            <div className="py-20 text-center text-gray-400">
              <Loader2 className="mx-auto mb-4 animate-spin text-violet-400" size={32} />
              Searchly durchsucht das Internet...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-300">
              {error}
            </div>
          )}

          {!loading && searched && !error && (
            <>
              <p className="mb-6 text-sm text-gray-500">
                {results.length} Ergebnisse für "{query}"
              </p>

              {results.length === 0 ? (
                <p className="py-16 text-center text-gray-500">
                  Keine Ergebnisse gefunden.
                </p>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <article
                      key={`${result.url}-${index}`}
                      className="rounded-2xl border border-white/10 bg-[#15151f] p-6 transition hover:border-violet-500/40"
                    >
                      <div className="mb-3 text-xs text-gray-500">
                        <Globe size={13} className="mr-2 inline" />
                        {result.engine}
                      </div>

                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-lg font-semibold text-violet-300 hover:text-violet-200"
                      >
                        {result.title}
                        <ExternalLink size={15} />
                      </a>

                      <p className="mt-3 break-words text-sm leading-7 text-gray-400">
                        {result.content}
                      </p>

                      <p className="mt-3 truncate text-xs text-gray-600">
                        {result.url}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Searchly. Alle Rechte vorbehalten.
        <p className="mt-2">Powered by SearXNG</p>
      </footer>
    </main>
  );
}

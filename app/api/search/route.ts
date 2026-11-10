
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_CATEGORIES = [
  "general",
  "images",
  "videos",
  "news",
];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  const category =
    request.nextUrl.searchParams.get("category") || "general";

  if (!query || query.length > 200) {
    return NextResponse.json(
      { error: "Bitte gib einen gültigen Suchbegriff ein." },
      { status: 400 }
    );
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Ungültige Suchkategorie." },
      { status: 400 }
    );
  }

  const instance =
    process.env.SEARXNG_URL || "https://searx.be";

  try {
    const url = new URL("/search", instance);

    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("language", "de-DE");
    url.searchParams.set("safesearch", "1");
    url.searchParams.set("categories", category);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Suchanbieter nicht erreichbar");
    }

    const data = await response.json();

    const results = (data.results || [])
      .slice(0, 30)
      .map((item: {
        title?: string;
        url?: string;
        content?: string;
        engine?: string;
        img_src?: string;
      }) => ({
        title: item.title || "Ohne Titel",
        url: item.url,
        content: item.content || "",
        engine: item.engine || "Web",
        image: item.img_src || null,
      }))
      .filter((item: { url?: string }) => {
        try {
          const parsed = new URL(item.url || "");
          return ["http:", "https:"].includes(parsed.protocol);
        } catch {
          return false;
        }
      });

    return NextResponse.json({
      results,
      total: results.length,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Die Suche ist momentan nicht erreichbar. Bitte versuche es erneut.",
      },
      { status: 502 }
    );
  }
}

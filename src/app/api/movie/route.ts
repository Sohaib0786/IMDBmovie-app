import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("id");

  if (!imdbId || !imdbId.match(/^tt\d{7,8}$/)) {
    return NextResponse.json(
      { error: "Invalid IMDb ID. Format: tt followed by 7-8 digits (e.g. tt0133093)" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbId}&plot=full`
    );
    const data = await res.json();

    if (data.Response === "False") {
      return NextResponse.json({ error: data.Error || "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
  }
}
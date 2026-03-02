import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  try {
    const movie = await request.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a movie analyst AI.

Movie: "${movie.Title}" (${movie.Year})
Genre: ${movie.Genre}
Director: ${movie.Director}
Cast: ${movie.Actors}
IMDb Rating: ${movie.imdbRating}/10 (${movie.imdbVotes} votes)
Plot: ${movie.Plot}

Respond ONLY with valid JSON (no markdown) in this format:

{
  "summary": "2-3 sentence audience sentiment summary",
  "sentiment": "positive",
  "keyHighlights": ["highlight 1", "highlight 2", "highlight 3"],
  "audienceScore": 85
}

sentiment must be exactly one of: positive, mixed, negative
audienceScore must be number 0-100
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const cleaned = response.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from Gemini", raw: cleaned },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Gemini error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
import Anthropic from "@anthropic-ai/sdk";
import { MovieData, SentimentResult } from "@/types/movie";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateSentimentInsight(
  movie: MovieData
): Promise<SentimentResult> {
  const prompt = `You are a movie analyst AI. Based on the following movie information, generate an audience sentiment analysis.

Movie: "${movie.Title}" (${movie.Year})
Genre: ${movie.Genre}
Director: ${movie.Director}
Cast: ${movie.Actors}
IMDb Rating: ${movie.imdbRating}/10 (${movie.imdbVotes} votes)
Ratings: ${movie.Ratings.map((r) => `${r.Source}: ${r.Value}`).join(", ")}
Plot: ${movie.Plot}

Respond ONLY with a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "summary": "2-3 sentence AI-generated audience sentiment summary",
  "sentiment": "positive" | "mixed" | "negative",
  "keyHighlights": ["highlight 1", "highlight 2", "highlight 3"],
  "audienceScore": 85
}

audienceScore should be a number 0-100 derived from the ratings data.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as SentimentResult;
}
"use client";

import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { MovieCard } from "@/components/MovieCard";
import { Spinner } from "@/components/ui/Spinner";
import { MovieInsight } from "@/types/movie";
import { Film, Sparkles, Github } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<MovieInsight | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (imdbId: string) => {
    setStatus("loading");
    setError("");
    setData(null);

    try {
      // Fetch movie data
      const movieRes = await fetch(`/api/movie?id=${imdbId}`);
      const movie = await movieRes.json();

      if (!movieRes.ok) throw new Error(movie.error || "Movie not found");

      // Fetch AI sentiment
      const sentimentRes = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
      const sentiment = await sentimentRes.json();

      if (!sentimentRes.ok) throw new Error(sentiment.error || "Sentiment analysis failed");

      setData({ movie, sentiment });
      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Movie<span className="text-purple-400">Insight</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI-Powered</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
        
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Movie{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Enter any IMDb ID to get detailed movie information with AI-powered
            audience sentiment analysis.
          </p>

          <SearchInput onSearch={handleSearch} loading={status === "loading"} />
        </section>

        {/* Results */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4 py-20">
              <Spinner size="lg" />
              <p className="text-gray-500 animate-pulse">
                Fetching movie data & running AI analysis...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-medium">⚠ {error}</p>
              <p className="text-gray-500 text-sm mt-2">
                Please check the IMDb ID and try again.
              </p>
            </div>
          )}

          {status === "success" && data && (
            <MovieCard movie={data.movie} sentiment={data.sentiment} />
          )}

          {status === "idle" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: "🎬", title: "Movie Details", desc: "Poster, cast, director, runtime & more" },
                { icon: "⭐", title: "Ratings Data", desc: "IMDb, Rotten Tomatoes, Metacritic scores" },
                { icon: "🤖", title: "AI Sentiment", desc: " AI-powered audience analysis" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-white/3 border border-white/8 rounded-2xl p-5 text-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="font-semibold text-white mt-3 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 text-center text-sm text-gray-600">
          <p>Built with Next.js · OMDB API · Google Gemini API</p>
        </footer>
      </div>
    </div>
  );
}
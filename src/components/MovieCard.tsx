"use client";

import Image from "next/image";
import { MovieData, SentimentResult } from "@/types/movie";
import { SentimentPanel } from "./SentimentPanel";
import { Badge } from "./ui/Badge";
import { Star, Clock, Calendar, User, Clapperboard } from "lucide-react";

interface MovieCardProps {
  movie: MovieData;
  sentiment: SentimentResult;
}

export function MovieCard({ movie, sentiment }: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  const genres = movie.Genre?.split(", ") || [];
  const cast = movie.Actors?.split(", ") || [];

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Column - Poster */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[2/3]">
            {hasPoster ? (
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                <Clapperboard className="w-16 h-16 mb-2" />
                <span className="text-sm">No Poster</span>
              </div>
            )}
            {/* IMDb Rating Badge */}
            {movie.imdbRating !== "N/A" && (
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold text-sm">{movie.imdbRating}</span>
                <span className="text-gray-400 text-xs">/10</span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard icon={<Calendar className="w-4 h-4" />} label="Year" value={movie.Year} />
            <StatCard icon={<Clock className="w-4 h-4" />} label="Runtime" value={movie.Runtime} />
            <StatCard icon={<Star className="w-4 h-4" />} label="Rated" value={movie.Rated} />
            <StatCard icon={<User className="w-4 h-4" />} label="Votes" value={Number(movie.imdbVotes?.replace(/,/g, "") || 0).toLocaleString()} />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-5">
          {/* Title & Genres */}
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight">{movie.Title}</h2>
            <p className="text-gray-500 mt-1">{movie.Year} · {movie.Runtime}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {genres.map((g) => (
                <Badge key={g} variant="outline">{g}</Badge>
              ))}
            </div>
          </div>

          {/* Plot */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Plot</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{movie.Plot}</p>
          </div>

          {/* Director & Cast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Director</h3>
              <p className="text-white text-sm font-medium">{movie.Director}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cast</h3>
              <div className="flex flex-wrap gap-1.5">
                {cast.map((actor) => (
                  <span key={actor} className="text-xs px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings */}
          {movie.Ratings?.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {movie.Ratings.map((r) => (
                <div key={r.Source} className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-white font-bold text-lg">{r.Value}</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">{r.Source.replace("Internet Movie Database", "IMDb")}</p>
                </div>
              ))}
            </div>
          )}

          {/* Sentiment Panel */}
          <SentimentPanel sentiment={sentiment} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
      <span className="text-purple-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-white text-sm font-medium truncate">{value || "N/A"}</p>
      </div>
    </div>
  );
}
"use client";

import { SentimentResult } from "@/types/movie";
import { Badge } from "./ui/Badge";
import { Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

interface SentimentPanelProps {
  sentiment: SentimentResult;
}

const sentimentConfig = {
  positive: { label: "Positive Reception", color: "text-emerald-400", bg: "from-emerald-500/10 to-transparent", icon: "😍" },
  mixed: { label: "Mixed Reception", color: "text-amber-400", bg: "from-amber-500/10 to-transparent", icon: "🤔" },
  negative: { label: "Negative Reception", color: "text-red-400", bg: "from-red-500/10 to-transparent", icon: "😞" },
};

export function SentimentPanel({ sentiment }: SentimentPanelProps) {
  const config = sentimentConfig[sentiment.sentiment];

  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-b ${config.bg} p-6 space-y-5`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">AI Sentiment Analysis</h3>
        </div>
        <Badge variant={sentiment.sentiment}>
          {config.icon} {config.label}
        </Badge>
      </div>

      {/* Audience Score Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Audience Score
          </span>
          <span className={`font-bold text-lg ${config.color}`}>
            {sentiment.audienceScore}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              sentiment.sentiment === "positive"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : sentiment.sentiment === "mixed"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-red-500 to-rose-400"
            }`}
            style={{ width: `${sentiment.audienceScore}%` }}
          />
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-300 text-sm leading-relaxed italic">
          &ldquo;{sentiment.summary}&rdquo;
        </p>
      </div>

      {/* Key Highlights */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Key Highlights
        </h4>
        <ul className="space-y-2">
          {sentiment.keyHighlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Search, Film } from "lucide-react";
import { Button } from "./ui/Button";

interface SearchInputProps {
  onSearch: (id: string) => void;
  loading: boolean;
}

const EXAMPLES = ["tt0133093", "tt0111161", "tt0468569", "tt1375666", "tt0816692"];

export function SearchInput({ onSearch, loading }: SearchInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (v: string) => {
    if (!v.trim()) return "Please enter an IMDb ID";
    if (!v.trim().match(/^tt\d{7,8}$/))
      return "Format must be: tt followed by 7-8 digits (e.g. tt0133093)";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(value.trim());
    if (err) return setError(err);
    setError("");
    onSearch(value.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter IMDb ID (e.g. tt0133093)"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm"
            />
          </div>
          <Button type="submit" loading={loading} className="shrink-0">
            <Film className="w-4 h-4" />
            Analyze
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </form>

      <div className="mt-4 flex items-center gap-2 flex-wrap justify-center">
        <span className="text-xs text-gray-600">Try:</span>
        {EXAMPLES.map((id) => (
          <button
            key={id}
            onClick={() => {
              setValue(id);
              setError("");
            }}
            className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
}
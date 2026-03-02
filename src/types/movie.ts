export interface MovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  Response: string;
  Error?: string;
}

export interface SentimentResult {
  summary: string;
  sentiment: "positive" | "mixed" | "negative";
  keyHighlights: string[];
  audienceScore: number;
}

export interface MovieInsight {
  movie: MovieData;
  sentiment: SentimentResult;
}
import axios from "axios";
import { MovieData } from "@/types/movie";

const OMDB_BASE = " http://www.omdbapi.com/?i=tt3896198&apikey=9e8f2b2";

export async function fetchMovieById(imdbId: string): Promise<MovieData> {
  const { data } = await axios.get<MovieData>(OMDB_BASE, {
    params: {
      apikey: process.env.OMDB_API_KEY,
      i: imdbId,
      plot: "full",
    },
  });

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}
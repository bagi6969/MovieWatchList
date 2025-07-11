"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Movie } from "@/components/type";

type MovieListProps = {
  results: Movie[];
  onQuickAdd?: (movie: Movie) => void;
  onStartAdd: (movie: Movie) => void;
};

export function MovieList({ results, onStartAdd }: MovieListProps) {
  return (
    <div className="h-[800px] overflow-y-auto p-4 border border-gray-300 rounded">
      {results.map((movie) => {
        return (
          <div key={movie.id} className="mb-4 border-b pb-4 flex flex-row">
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || "Movie poster"}
              className="w-[100px] h-auto rounded"
              width={100}
              height={150}
            />
            <div className="flex flex-col px-4 w-full">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
              <p className="text-sm text-gray-700">{movie.overview}</p>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => onStartAdd(movie)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

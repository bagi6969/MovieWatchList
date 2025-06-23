"use client";

import { useMovieContext } from "@/app/context/MovieContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MovieList({ results, onQuickAdd, onStartAdd }) {
  return (
    <div className="h-[400px] overflow-y-auto p-2 border rounded">
      {results.map((movie) => (
        <div key={movie.id} className="mb-4 border-b pb-4 flex">
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            className="w-[100px] h-auto rounded"
            width={100}
            height={150}
          />
          <div className="flex flex-col px-4">
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-500">{movie.release_date}</p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {movie.overview}
            </p>

            <Button
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 w-fit"
              onClick={() => onStartAdd(movie)}
            >
              Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

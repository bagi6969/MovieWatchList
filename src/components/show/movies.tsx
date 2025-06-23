"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MovieList({ results, onQuickAdd, onStartAdd }) {
  return (
    <div className="h-[800px] overflow-y-auto p-4 border border-gray-300 rounded">
      {results.map((movie) => (
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
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => onQuickAdd(movie)}
              >
                Quick Add
              </Button>
              <Button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => onStartAdd(movie)}
              >
                Edit Before Adding
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

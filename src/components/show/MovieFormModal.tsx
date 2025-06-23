"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/components/type";

type MovieFormModalProps = {
  movie: Movie;
  onSubmit: (movie: Movie) => void;
  onCancel: () => void;
};

export default function MovieFormModal({
  movie,
  onSubmit,
  onCancel,
}: MovieFormModalProps) {
  const [formState, setFormState] = useState<Omit<Movie, "id">>({
    title: movie.title || "",
    release_date: movie.release_date || "",
    status: movie.status || "Want to Watch",
    rating: movie.rating || "",
    genre: movie.genre || "",
    poster_path: movie.poster_path || "",
    notes: movie.notes || "",
  });

  useEffect(() => {
    setFormState({
      title: movie.title || "",
      release_date: movie.release_date || "",
      status: movie.status || "Want to Watch",
      rating: movie.rating || "",
      genre: movie.genre || "",
      poster_path: movie.poster_path || "",
      notes: movie.notes || "",
    });
  }, [movie]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] flex flex-col gap-2 shadow-lg">
        <h2 className="text-xl font-bold">Add New Movie</h2>

        <label className="text-sm">Title</label>
        <input
          className="border p-1 rounded"
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />

        <label className="text-sm">Year</label>
        <input
          className="border p-1 rounded"
          value={formState.release_date?.slice(0, 4) || ""}
          onChange={(e) =>
            setFormState({
              ...formState,
              release_date: e.target.value
                ? e.target.value + (formState.release_date?.slice(4) || "")
                : "",
            })
          }
          placeholder="YYYY"
        />

        <label className="text-sm">Rating</label>
        <input
          className="border p-1 rounded"
          value={formState.rating?.toString() || ""}
          placeholder="Eg. 1,2,3,4,5"
          onChange={(e) =>
            setFormState({ ...formState, rating: e.target.value })
          }
        />

        <label className="text-sm">Genre</label>
        <input
          className="border p-1 rounded"
          value={formState.genre || ""}
          onChange={(e) =>
            setFormState({ ...formState, genre: e.target.value })
          }
        />

        <label className="text-sm">Status</label>
        <select
          className="border p-1 rounded"
          value={formState.status || ""}
          onChange={(e) =>
            setFormState({ ...formState, status: e.target.value })
          }
        >
          <option value="want to watch">Want to Watch</option>
          <option value="watching">Watching</option>
          <option value="watched">Watched</option>
        </select>

        <label className="text-sm">Notes</label>
        <textarea
          className="border p-1 rounded"
          rows={3}
          value={formState.notes || ""}
          onChange={(e) =>
            setFormState({ ...formState, notes: e.target.value })
          }
        />

        <div className="flex justify-between mt-4">
          <button
            className="bg-green-600 text-white py-1 px-3 rounded"
            onClick={() => onSubmit({ ...movie, ...formState })}
          >
            Add to List
          </button>
          <button className="text-red-500" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

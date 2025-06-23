"use client";
import { useState, useEffect } from "react";

export default function MovieFormModal({ movie, onSubmit, onCancel }) {
  const [formState, setFormState] = useState({
    title: movie.title || "",
    release_date: movie.release_date || "",
    status: movie.status || "want to watch",
    rating: movie.rating || 0,
    genre: movie.genre || "",
    poster_path: movie.poster_path || "",
  });

  useEffect(() => {
    if (movie) {
      setFormState({
        title: movie.title || "",
        year: movie.release_date?.slice(0, 4) || "",
        genre: movie.genre || "",
        notes: movie.overview || "",
        status: "Want to Watch",
        rating: "",
      });
    }
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
          value={formState.year}
          onChange={(e) => setFormState({ ...formState, year: e.target.value })}
        />
        <label>Rating</label>
        <input
          className="border p-1 rounded"
          value={formState.rating}
          placeholder="Eg. 1,2,3,4,5"
          onChange={(e) =>
            setFormState({ ...formState, rating: e.target.value })
          }
        />

        <label className="text-sm">Genre</label>
        <input
          className="border p-1 rounded"
          value={formState.genre}
          onChange={(e) =>
            setFormState({ ...formState, genre: e.target.value })
          }
        />

        <label className="text-sm">Status</label>
        <select
          className="border p-1 rounded"
          value={formState.status}
          onChange={(e) =>
            setFormState({ ...formState, status: e.target.value })
          }
        >
          <option>Want to Watch</option>
          <option>Watching</option>
          <option>Watched</option>
        </select>

        <label className="text-sm">Notes</label>
        <textarea
          className="border p-1 rounded"
          rows={3}
          value={formState.notes}
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

"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { searchMovies as fetchMovies } from "../components/search/search";
import { useMovieContext } from "./context/MovieContext";
import { MovieList } from "../components/show/movies";
import Image from "next/image";
import MovieFormModal from "../components/show/MovieFormModal";
import { useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const { setResults } = useMovieContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const toggleDiv = () => setVisible(!visible);
  const [myList, setMyList] = useState([]);

  const onStartAdd = (movie) => {
    setSelectedMovie(movie);
    setShowForm(true);
  };

  const filteredList = myList.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || movie.status === statusFilter;
    return matchesTitle && matchesStatus;
  });

  const { results } = useMovieContext();

  const handleAddMovie = (movie) => {
    const exists = myList.some((m) => m.id === movie.id);
    if (!exists) {
      setMyList((prev) => [...prev, movie]);
    }
    setShowForm(false);
    setSelectedMovie(null);
  };

  const searchMovies = async () => {
    if (!query) return;
    const data = await fetchMovies(query);
    setResults(data);
  };

  const handleRemove = (id) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== id));
  };

  useEffect(() => {
    const saved = localStorage.getItem("myMovieList");
    if (saved) setMyList(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("myMovieList", JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    const ids = myList.map((m) => m.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (duplicates.length > 0) {
      console.warn("Duplicate movie IDs:", duplicates);
    }
  }, [myList]);
  return (
    <div className="w-full h-full p-4">
      <nav className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl">My Watchlist</h1>
          <div className="text-sm text-gray-600 mt-2 ml-[2px]">
            {myList.length} Movies
          </div>
          <div className="flex gap-2">
            <button
              className="w-20 border border-black rounded-[20px] h-10"
              onClick={toggleDiv}
            >
              Search
            </button>
            <button
              className="w-20 border border-black rounded-[20px] h-10"
              onClick={() => {
                setSelectedMovie({});
                setShowForm(true);
              }}
            >
              Add
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search Movies..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full border border-black px-3 py-2 rounded"
        />
        <div className="relative inline-block text-left my-4">
          <button
            onClick={() => setShowStatusOptions((prev) => !prev)}
            className="border border-black px-4 py-2 rounded"
          >
            Filter:{" "}
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
          </button>

          {showStatusOptions && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md z-10">
              {["all", "watched", "watching", "want to watch"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setShowStatusOptions(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* USER ADDED MOVIES LIST */}
      <div className="flex flex-col gap-4 p-4">
        {filteredList.map((movie) => (
          <div
            key={movie.id}
            className="flex items-start gap-4 border border-gray-400 rounded p-4"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || "Movie poster"}
              className="w-[100px] h-auto rounded"
              width={100}
              height={150}
            />
            ...
            <div>
              <h2 className="font-bold text-lg">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.release_date} </p>

              <span className="text-sm text-black  rounded-sm">
                Status: {movie.status}
              </span>
              <p className="text-sm text-gray-700">Rating:{movie.rating}⭐</p>
              <p className="text-sm text-gray-700">Genre: {movie.genre}</p>
              <br />
              <button
                onClick={() => handleRemove(movie.id)}
                className="mt-2 text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH PANEL */}

      {showForm && selectedMovie && (
        <MovieFormModal
          movie={selectedMovie}
          onSubmit={handleAddMovie}
          onCancel={() => {
            setShowForm(false);
            setSelectedMovie(null);
          }}
        />
      )}

      {visible && (
        <div className="fixed inset-0 bg-white p-6 border rounded w-[872px] h-[592px] m-auto flex flex-col text-black">
          <h1 className="text-xl font-bold mb-2">Search Movies</h1>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
          />
          <button
            className="w-20 border border-black rounded-[20px] h-10 mt-2"
            onClick={searchMovies}
          >
            Search
          </button>

          <div className="mt-4 overflow-y-auto">
            <MovieList results={results} onStartAdd={onStartAdd} />
          </div>
        </div>
      )}
    </div>
  );
}

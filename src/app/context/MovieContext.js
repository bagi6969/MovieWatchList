"use client";
import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [results, setResults] = useState([]);

  return (
    <MovieContext.Provider value={{ results, setResults }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  return useContext(MovieContext);
}

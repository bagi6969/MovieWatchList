export async function searchMovies(query: string) {
  if (!query) return;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

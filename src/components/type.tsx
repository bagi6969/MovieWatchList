export type Movie = {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  status?: string;
  rating?: string | number;
  genre?: string;
  notes?: string;
};

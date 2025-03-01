"use client";

import { useLovedFilms } from "@/app/hooks/use-loved-films";
import { ListMoviesProps } from "./ListMovies.type";
import { useCurrentNetflixUser } from "@/app/hooks/use-current-user";
import { BlockMovies } from "@/components/ui/Shared/BlockMovies";



export function ListMovies(props: ListMoviesProps) {
  const { movies } = props;
  const { lovedFilmsByUser } = useLovedFilms();
  const { currentUser } = useCurrentNetflixUser();

  const userNetflix = currentUser?.id;
  const lovedFilms = userNetflix ? lovedFilmsByUser[userNetflix] : [];

  return (
    <div>
      <BlockMovies
        title="Películas favoritas"
        movies={lovedFilms}
        isMyList={true}
      />
      <BlockMovies
        title="Películas más recientes"
        movies={movies}
        isMyList={false}
      />
    </div>
  );
}
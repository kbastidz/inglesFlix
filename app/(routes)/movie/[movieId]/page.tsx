import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarFilm } from "./compoments/NavbarFilm";
import { MovieVideo } from "./compoments/MovieVideo";

  export type paramsType = Promise<{ movieId: string }>;

  export default async function MovieIdPage(props: { params: paramsType }) {

  const movieFilm = await db.movie.findUnique({
    where: {
      id: (await props.params).movieId,
    },
  });

  const popularMovie = await db.popularMovie.findUnique({
    where: {
      id: (await props.params).movieId,
    },
  });

  if (!movieFilm && !popularMovie) {
    redirect("/");
  }

  const currentMovie = movieFilm
    ? movieFilm.movieVideo
    : popularMovie
    ? popularMovie.movieVideo
    : "";

  const titleMovie = movieFilm
    ? movieFilm.title
    : popularMovie
    ? popularMovie.title
    : "";

  return (
    <div className="h-screen w-full bg-black">
      <NavbarFilm titleMovie={titleMovie} />
      <MovieVideo currentMovie={currentMovie} />
    </div>
  );
}

import client from "../client";
import { IMovieData } from "./movies.types";

export default {
  Mutation: {
    createMovie: (_: any, { title, year, genre }: IMovieData) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: IMovieData) =>
      client.movie.delete({
        where: {
          id,
        },
      }),
    updateMovie: (_: any, { id, year }: IMovieData) =>
      client.movie.update({
        where: {
          id,
        },
        data: {
          year,
        },
      }),
  },
};

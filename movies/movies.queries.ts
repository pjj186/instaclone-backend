import client from "../client";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: any) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
};

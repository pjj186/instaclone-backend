import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

interface IMovieData {
  id: number;
  title: string;
  year: number;
  genre?: string;
}

// The GraphQL schema
const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  # 쿼리
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  # 뮤테이션
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: any) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at http://localhost:4000/`);
});

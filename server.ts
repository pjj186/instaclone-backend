import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

interface ICreateMovieData {
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
    deleteMovie(id: Int!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: any) => ({
      title: "Iron Man",
      year: 2004,
    }),
  },
  Mutation: {
    createMovie: (_: any, { title, year, genre }: ICreateMovieData) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: any) => {
      console.log(id);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at http://localhost:4000/`);
});

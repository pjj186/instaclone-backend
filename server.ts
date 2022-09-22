import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  # 쿼리
  type Query {
    movies: [Movie]
    movie: Movie
  }
  # 뮤테이션
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({
      title: "Iron Man",
      year: 2004,
    }),
  },
  Mutation: {
    createMovie: (_: any, args: any) => {
      console.log(args);
      return true;
    },
    deleteMovie: (_: any, args: any) => {
      console.log(args);
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

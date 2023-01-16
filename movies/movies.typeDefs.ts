import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
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

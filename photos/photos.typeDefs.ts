import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User! # need resolver
    file: String!
    caption: String
    hashtags: [Hashtag] # need resolver
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo] # need resolver
    totalPhotos: Int! # need resolver
    createdAt: String!
    updatedAt: String!
  }
`;

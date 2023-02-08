import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User! # need resolver
    userId: Int!
    file: String!
    caption: String
    likes: Int! # need resolver
    comments: Int! # need resolver
    hashtags: [Hashtag] # need resolver
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo] # need resolver
    totalPhotos: Int! # need resolver
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;

import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    user: User! # need resolver
    userId: Int!
    file: String!
    caption: String
    likes: Int! # need resolver
    commentNumber: Int! # need resolver
    comments: [Comment]
    hashtags: [Hashtag] # need resolver
    createdAt: String!
    updatedAt: String!
    isMine: Boolean! # need resolver
    isLiked: Boolean! # need resolver
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

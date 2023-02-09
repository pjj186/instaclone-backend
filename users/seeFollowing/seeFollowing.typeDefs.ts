import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    follwing: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult
  }
`;

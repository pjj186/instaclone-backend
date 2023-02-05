import { gql } from "apollo-server";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    follwing: [User]
  }
  type Query {
    seeFollowing(username: String!, cursor: Int): SeeFollowingResult
  }
`;

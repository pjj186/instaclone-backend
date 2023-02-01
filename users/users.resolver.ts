import { IUser } from "./users.typeDefs";

export default {
  User: {
    totalFollowing: (root: IUser) => {
      console.log(root.username);
      return 666;
    },
    totalFollowers: () => 999,
  },
};

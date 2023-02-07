import { Context } from "./types";
import { IUser } from "./users.typeDefs";

export default {
  User: {
    // 내 id를 자신의 팔로우 리스트에 가지고 있는 사람들의 수
    totalFollowing: ({ id }: IUser, _: any, { client }: Context) => {
      return client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    // 내 id를 팔로잉 하고 있는 사람들의 수
    totalFollowers: ({ id }: IUser, _: any, { client }: Context) => {
      return client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }: IUser, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async (
      { id }: IUser,
      _: any,
      { loggedInUser, client }: Context
    ) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists); // 0 or 1
    },
  },
};

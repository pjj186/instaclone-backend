import { Context } from "../types";
import { IUser } from "../users.types";

export default {
  Query: {
    seeProfile: async (_: any, { username }: IUser, { client }: Context) => {
      return client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      });
    },
  },
};

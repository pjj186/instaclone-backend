import client from "../../client";
import { IUser } from "../users.types";

export default {
  Query: {
    seeProfile: async (_: any, { username }: IUser) => {
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

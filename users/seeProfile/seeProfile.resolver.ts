import client from "../../client";
import { IAccount } from "../users.types";

export default {
  Query: {
    seeProfile: async (_: any, { username }: IAccount) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

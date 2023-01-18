import bcrypt from "bcrypt";
import client from "../client";
import { IAccount } from "./users.types";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, username, email, password }: IAccount
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    },
  },
};

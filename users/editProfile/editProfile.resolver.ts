import client from "../../client";
import { IAccount } from "../users.types";
import bcrypt from "bcrypt";
import { IContext } from "../../server";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      { firstName, username, lastName, email, password: newPassword }: IAccount,
      { loggedInUser }: IContext
    ) => {
      console.log(loggedInUser);

      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile",
        };
      }
    },
  },
};

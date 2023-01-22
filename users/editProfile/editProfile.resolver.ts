import client from "../../client";
import { IAccount } from "../users.types";
import bcrypt from "bcrypt";
import { IContext } from "../../server";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _: any,
        {
          firstName,
          username,
          lastName,
          email,
          password: newPassword,
        }: IAccount,
        { loggedInUser }: IContext
      ) => {
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
            error: "프로필을 업데이트 할 수 없습니다.",
          };
        }
      }
    ),
  },
};

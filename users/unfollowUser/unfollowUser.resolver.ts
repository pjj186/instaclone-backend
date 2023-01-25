import client from "../../client";
import { IContext } from "../../server";
import { IAccount } from "../users.types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _: any,
  { username }: IAccount,
  { loggedInUser }: IContext
) => {
  const ok = await client.user.findUnique({
    where: {
      username,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "존재하지 않는 유저입니다.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        disconnect: {
          username,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn),
  },
};

import client from "../../client";
import errorMessages from "../../error-messages";
import { IContext } from "../../server";
import { IUser } from "../users.types";

import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _: any,
  { username }: IUser,
  { loggedInUser }: IContext
) => {
  const ok = await client.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: errorMessages.UserNotFound,
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
import errorMessages from "../../error-messages";
import { Context } from "../types";

interface ISeeFollowingArgs {
  username: string;
  lastId: number;
}

const resolverFn = async (
  _: any,
  { username, lastId }: ISeeFollowingArgs,
  { client }: Context
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

  // Cursor-based pagination : 보여줄 데이터가 많거나 무한 스크롤 등으로 데이터를 보여줄 때, 적합
  const following = await client.user
    .findUnique({
      where: {
        username,
      },
    })
    .following({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });
  return {
    ok: true,
    following,
  };
};

export default {
  Query: {
    seeFollowing: resolverFn,
  },
};

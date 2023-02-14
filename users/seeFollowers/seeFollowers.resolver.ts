import errorMessages from "../../error-messages";
import { Context } from "../types";

interface ISeeFollowersArgs {
  username: string;
  page: number;
}

const resolverFn = async (
  _: any,
  { username, page }: ISeeFollowersArgs,
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
  // Offset pagination : 보여줄 데이터가 적거나 게시물을 페이지를 통해 이동하려고 할 때, 적합
  const followers = await client.user
    .findUnique({
      where: {
        username,
      },
    })
    .followers({
      take: 5,
      skip: (page - 1) * 5,
    });

  // 총 팔로워
  const totalFollowers = await client.user.count({
    where: {
      following: { some: { username } },
    },
  });
  return {
    ok: true,
    followers,
    totalPages: totalFollowers / 5,
  };
};

export default {
  Query: {
    seeFollowers: resolverFn,
  },
};

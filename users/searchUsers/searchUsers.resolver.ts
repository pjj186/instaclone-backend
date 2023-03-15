import { Context } from "../types";

interface ISearchParam {
  keyword: string;
  page: number;
}

// TODO : Pagination 구현
const resolverFn = async (
  _: any,
  { keyword, page }: ISearchParam,
  { client }: Context
) => {
  const users = await client.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
    take: 4,
    skip: (page - 1) * 4,
  });
  return users;
};

export default {
  Query: {
    searchUsers: resolverFn,
  },
};

import client from "../../client";

interface ISearchParam {
  keyword: string;
}

// TODO : Pagination 구현
const resolverFn = async (_: any, { keyword }: ISearchParam) => {
  const users = await client.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
  });
  return users;
};
export default {
  Query: {
    searchUsers: resolverFn,
  },
};

import client from "../../client";

interface searchPhotosArgs {
  keyword: string;
  page: number;
}

export default {
  Query: {
    searchPhotos: (_: any, { keyword, page }: searchPhotosArgs) =>
      client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};

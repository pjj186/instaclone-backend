import client from "../../client";

interface searchPhotosParams {
  keyword: string;
  page: number;
}

export default {
  Query: {
    searchPhotos: (_: any, { keyword, page }: searchPhotosParams) =>
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

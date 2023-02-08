import client from "../../client";

interface searchPhotosParams {
  keyword: string;
}

export default {
  Query: {
    searchPhotos: (_: any, { keyword }: searchPhotosParams) =>
      client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};

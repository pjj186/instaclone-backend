import { Hashtag, Photo } from "@prisma/client";
import client from "../client";

interface HashtagQueryPhotosArgs {
  page: number;
}

export default {
  Photo: {
    user: ({ userId }: Photo) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }: Photo) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    photos: ({ id }: Hashtag, { page }: HashtagQueryPhotosArgs) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
    totalPhotos: ({ id }: Hashtag) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

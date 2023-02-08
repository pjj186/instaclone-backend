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
    likes: ({ id }: Photo) =>
      client.like.count({
        where: {
          photoId: id,
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
        .photos({ take: 5, skip: (page - 1) * 5 });
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

import { Hashtag, Photo } from '@prisma/client';
import client from '../client';
import { Context } from '../users/types';

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
    comments: ({ id }: Photo) =>
      client.comment.count({
        where: {
          photoId: id,
        },
      }),
    isMine: ({ userId }: Photo, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser?.id;
      }
    },
    isLiked: async ({ id }: Photo, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
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

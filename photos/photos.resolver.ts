import { Photo } from "@prisma/client";
import client from "../client";

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
};

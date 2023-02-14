import client from "../../client";

interface seePhotoLikesArgs {
  id: number;
}

export default {
  Query: {
    seePhotoLikes: async (_: any, { id }: seePhotoLikesArgs) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });

      return likes.map((like) => like.user);
    },
  },
};

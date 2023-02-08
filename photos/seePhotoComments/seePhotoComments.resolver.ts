import client from "../../client";

interface seePhotoCommentsParams {
  id: number;
  lastId: number;
}

// Need Pagination

export default {
  Query: {
    seePhotoComments: (_: any, { id, lastId }: seePhotoCommentsParams) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};

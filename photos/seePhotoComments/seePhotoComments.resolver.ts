import client from "../../client";

interface seePhotoCommentsArgs {
  id: number;
  lastId: number;
}

// Need Pagination

export default {
  Query: {
    seePhotoComments: (_: any, { id, lastId }: seePhotoCommentsArgs) =>
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

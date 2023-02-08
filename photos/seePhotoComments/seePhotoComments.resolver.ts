import client from "../../client";

interface seePhotoCommentsParams {
  id: number;
}

// Need Pagination

export default {
  Query: {
    seePhotoComments: (_: any, { id }: seePhotoCommentsParams) =>
      client.photo
        .findUnique({
          where: {
            id,
          },
        })
        .comments({
          orderBy: {
            createdAt: "desc",
          },
        }),
  },
};

import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface createCommentParmas {
  photoId: number;
  payload: string;
}

export default {
  Mutation: {
    createComment: protectedResolver(
      async (
        _: any,
        { photoId, payload }: createCommentParmas,
        { loggedInUser }: Context
      ) => {
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "photo not found",
          };
        }
        await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

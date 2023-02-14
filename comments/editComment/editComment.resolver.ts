import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface editCommentArgs {
  id: number;
  payload: string;
}

export default {
  Mutation: {
    editComment: protectedResolver(
      async (
        _: any,
        { id, payload }: editCommentArgs,
        { loggedInUser }: Context
      ) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "comment not found",
          };
        } else if (comment.userId !== loggedInUser?.id) {
          return {
            ok: false,
            error: "not authorized",
          };
        } else {
          await client.comment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

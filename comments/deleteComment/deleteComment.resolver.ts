import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface deleteCommentArgss {
  id: number;
}

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_: any, { id }: deleteCommentArgss, { loggedInUser }: Context) => {
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
            error: "Not authorized.",
          };
        } else {
          await client.comment.delete({
            where: {
              id,
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

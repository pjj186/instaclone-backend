import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface deletePhotoParams {
  id: number;
}

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_: any, { id }: deletePhotoParams, { loggedInUser }: Context) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "photo not found",
          };
        } else if (photo.userId !== loggedInUser?.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        } else {
          await client.photo.delete({
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

import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

interface editPhotoArgs {
  id: number;
  caption: string;
}

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (
        _: any,
        { id, caption }: editPhotoArgs,
        { loggedInUser }: Context
      ) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser?.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }

        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
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

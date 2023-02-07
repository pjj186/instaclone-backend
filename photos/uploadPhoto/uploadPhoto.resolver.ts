import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface IPhotoParams {
  file: any;
  caption: string;
}

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _: any,
        { file, caption }: IPhotoParams,
        { loggedInUser }: Context
      ) => {
        let hashtagObjs: any = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObjs = hashtags?.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
            ...(hashtagObjs.length > 0 && {
              //
              hashtags: {
                connectOrCreate: hashtagObjs,
              },
            }),
          },
        });
      }
    ),
  },
};

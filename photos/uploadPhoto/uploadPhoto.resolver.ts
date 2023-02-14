import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { Context } from "../../users/types";
import { FileUpload } from "../../users/users.types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

interface IPhotoArgs {
  file: FileUpload;
  caption: string;
}

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _: any,
        { file, caption }: IPhotoArgs,
        { loggedInUser }: Context
      ) => {
        let hashtagObjs: any = [];
        if (caption) {
          hashtagObjs = processHashtags(caption);
        }
        const fileUrl = await uploadToS3(file, loggedInUser?.id!, "uploads");
        return client.photo.create({
          data: {
            file: fileUrl,
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

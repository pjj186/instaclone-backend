import { Context } from "../../users/types";

interface seePhotoArgs {
  id: number;
}

export default {
  Query: {
    seePhoto: (_: any, { id }: seePhotoArgs, { client }: Context) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};

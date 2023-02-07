import { Context } from "../../users/types";

interface seePhotoParams {
  id: number;
}

export default {
  Query: {
    seePhoto: (_: any, { id }: seePhotoParams, { client }: Context) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};

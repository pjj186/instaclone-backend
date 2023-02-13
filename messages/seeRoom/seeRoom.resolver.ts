import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface seeRoomParams {
  id: number;
}

export default {
  Query: {
    seeRoom: protectedResolver(
      async (_: any, { id }: seeRoomParams, { loggedInUser }: Context) =>
        client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser?.id,
              },
            },
          },
        })
    ),
  },
};

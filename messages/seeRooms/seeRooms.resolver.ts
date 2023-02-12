import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRooms: protectedResolver(
      async (_: any, __: any, { loggedInUser }: Context) =>
        client.room.findMany({
          where: {
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

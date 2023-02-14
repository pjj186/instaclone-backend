import { Message } from "@prisma/client";
import { withFilter } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../users/types";

interface RoomUpdatesArgs {
  id: number;
}

interface RoomUpdatesPayload {
  roomUpdates: Message;
}

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (
        root: any,
        args: RoomUpdatesArgs,
        context: Context,
        info: GraphQLResolveInfo
      ) => {
        const room = await client.room.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error("You shall not see this");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }: RoomUpdatesPayload, { id }) => {
            return roomUpdates.roomId === id;
          }
        )(root, args, context, info);
      },
    },
  },
};

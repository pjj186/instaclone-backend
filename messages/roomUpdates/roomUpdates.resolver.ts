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
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser?.id,
              },
            },
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
          // publish 될 때 실행되는 함수 👇
          async (
            { roomUpdates }: RoomUpdatesPayload,
            { id }: RoomUpdatesArgs,
            { loggedInUser }: Context
          ) => {
            let result: boolean = false;
            if (roomUpdates?.roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id: id,
                  users: {
                    some: {
                      id: loggedInUser?.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                result = false;
              }
              result = true;
            }
            return result;
          }
        )(root, args, context, info);
      },
    },
  },
};

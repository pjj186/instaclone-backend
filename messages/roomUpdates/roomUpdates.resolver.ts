import { Message } from "@prisma/client";
import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

interface RoomUpdatesPayload {
  roomUpdates: Message;
}

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }: RoomUpdatesPayload, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
    },
  },
};

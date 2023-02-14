import { Message, Room } from "@prisma/client";
import client from "../client";
import { Context } from "../users/types";

export default {
  Room: {
    users: ({ id }: Room) =>
      client.room
        .findUnique({
          where: {
            id,
          },
        })
        .users(),
    messages: ({ id }: Room) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }: Room, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser?.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }: Room) =>
      client.message
        .findUnique({
          where: { id },
        })
        .user(),
  },
};

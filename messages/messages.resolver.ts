import { Room } from "@prisma/client";
import client from "../client";

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
    unreadTotal: () => 0,
  },
};

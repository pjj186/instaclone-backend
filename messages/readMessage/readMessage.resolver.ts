import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

interface readMessageParams {
  id: number;
}

export default {
  Mutation: {
    readMessage: protectedResolver(
      async (_: any, { id }: readMessageParams, { loggedInUser }: Context) => {
        // 내가 그 대화방 안에 들어가있고 내가 그 메시지를 보낸 사용자가 아닐 때
        const message = await client.message.findFirst({
          where: {
            id,
            userId: {
              not: loggedInUser?.id, // 내가 보낸 메시지 X
            },
            room: {
              users: {
                some: {
                  id: loggedInUser?.id,
                },
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!message) {
          return {
            ok: false,
            error: "Message not found.",
          };
        }
        // 메시지 읽음 표시
        await client.message.update({
          where: {
            id,
          },
          data: {
            read: true,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

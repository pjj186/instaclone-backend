import client from "../../client";
import { Context } from "../../users/types";
import { protectedResolver } from "../../users/users.utils";

/*
# 처음 상대방에게 메세지를 보낼 때
userId만 받아서 새로운 room모델을 생성하고, 그 room모델에 로그인한 유저와 메세지를 보낸 유저를 연결시켜준다.
새로운 message모델을 생성하고, 로그인한 유저와 생성한 room모델을 연결시켜준다.

# 이미 room이 존재할 때 (첫 메세지가 아닌 두 번째 메세지부터)
userId가 아닌 roomId만 받고, 새로운 message모델을 생성하고, 로그인한 유저와 기존에 존재하는 room모델을 연결시켜준다. 
*/

interface sendMessageParams {
  payload: string;
  roomId: number;
  userId: number;
}

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _: any,
        { payload, roomId, userId }: sendMessageParams,
        { loggedInUser }: Context
      ) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser?.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }
        const newMessage = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room?.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

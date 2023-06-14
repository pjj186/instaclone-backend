import client from '../../client';
import { Context } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

export default {
  Query: {
    seeFeed: protectedResolver(
      async (_: any, __: any, { loggedInUser }: Context) =>
        client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser?.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser?.id,
              },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
    ),
  },
};

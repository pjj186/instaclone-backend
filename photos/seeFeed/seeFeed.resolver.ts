import client from '../../client';
import { Context } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';
import { IFeedParams } from '../photos.types';

export default {
  Query: {
    seeFeed: protectedResolver(
      async (_: any, { offset }: IFeedParams, { loggedInUser }: Context) =>
        client.photo.findMany({
          take: 2,
          skip: offset,
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

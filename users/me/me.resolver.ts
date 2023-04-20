import client from '../../client';
import { Context } from '../types';
import { protectedResolver } from '../users.utils';

export default {
  Query: {
    me: protectedResolver(async (_: any, __: any, { loggedInUser }: Context) =>
      client.user.findUnique({
        where: {
          id: loggedInUser?.id,
        },
      }),
    ),
  },
};

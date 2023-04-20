import client from '../../client';
import { Context } from '../types';
import { protectedResolver } from '../users.utils';

const resolverFn = (_: any, __: any, { loggedInUser }: Context) => {
  return client.user.findUnique({
    where: {
      id: loggedInUser?.id,
    },
  });
};

export default {
  Query: {
    me: protectedResolver(resolverFn),
  },
};

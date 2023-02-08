import { Comment } from "@prisma/client";
import { Context } from "../users/types";

export default {
  Comment: {
    isMine: ({ userId }: Comment, _: any, { loggedInUser }: Context) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser?.id;
      }
    },
  },
};

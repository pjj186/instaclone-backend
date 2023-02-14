import client from "../../client";

interface seeHashtagArgs {
  hashtag: string;
}

export default {
  Query: {
    seeHashtag: (_: any, { hashtag }: seeHashtagArgs) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};

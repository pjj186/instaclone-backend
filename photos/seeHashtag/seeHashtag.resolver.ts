import client from "../../client";

interface seeHashtagParams {
  hashtag: string;
}

export default {
  Query: {
    seeHashtag: (_: any, { hashtag }: seeHashtagParams) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};

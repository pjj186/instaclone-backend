interface IProcessHashtagsReturn {
  where: {
    hashtag: string;
  };
  create: {
    hashtag: string;
  };
}

export const processHashtags = (caption: string): IProcessHashtagsReturn[] => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags?.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }))!;
};

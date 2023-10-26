interface IPayload {
  cover?: string;
  sourceId?: string;
  sourceType?: string;
}

interface ISource {
  payload: IPayload;
  type: string;
}

const isTwitchClip = (sourceUrl: string) => {
  const regexps = [
    'https:\\/\\/clips\\.twitch\\.tv\\/(?:embed\\?clip\\=|)([^\\/?"]+)',
    "https:\\/\\/clips\\.twitch\\.tv\\/([^/?]+)\\/?",
    'https:\\/\\/www\\.twitch\\.tv\\/[^/]+\\/clip\\/([^\\/?"]+)\\/?',
    'https://www.twitch.tv/[^/]+/clip/([^\\/?"]+)',
  ];

  let result: any;

  for (const regexp of regexps) {
    const regexpResult = sourceUrl.match(regexp);

    if (regexpResult && regexpResult[1]) {
      result = {
        payload: {
          sourceId: regexpResult[1],
          sourceType: "twitchClip",
        },
        type: "twitchClip",
      };

      break;
    }
  }

  return result;
};

const allMethods: any = {
  isTwitchClip,
};

export const parseSource = (sourceUrl: string): ISource | undefined => {
  let result;

  for (const methodName of Object.keys(allMethods)) {
    const methodResult = allMethods[methodName](sourceUrl);

    if (methodResult) {
      result = methodResult;
      break;
    }
  }

  return result;
};

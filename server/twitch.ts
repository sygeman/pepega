import * as querystring from "node:querystring";

import axios from "axios";

import { twitchConfig } from "@/config/twitch";

import { prisma } from "./prisma";

export class Twitch {
  headers = {
    "Client-ID": twitchConfig.clientId,
    Accept: "application/vnd.twitchtv.v5+json",
  };

  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (error.response.status === 401 && !config._retry) {
          config._retry = true;

          const authorization = config.headers["authorization"] || "";

          const access_token = authorization.split(" ")?.[1];

          const profile = await prisma.account.findFirst({
            where: { access_token },
          });

          if (!profile) {
            throw "Profile not found";
          }

          const newAccessToken = await this.refreshToken(profile.userId);

          return axios({
            ...config,
            headers: {
              ...config.headers,
              authorization: `Bearer ${newAccessToken}`,
            },
          });
        }

        throw error;
      }
    );
  }

  async getToken(userId: string) {
    const profile = await prisma.account.findFirst({
      where: { userId },
    });

    return profile?.access_token || "";
  }

  async refreshToken(userId: string) {
    console.log("refreshToken", userId);
    const profile = await prisma.account.findFirst({
      where: { userId, provider: "twitch" },
    });

    if (!profile) {
      throw "Profile not found";
    }

    const { refresh_token } = profile;
    const { clientId, clientSecret } = twitchConfig;

    const res = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      querystring.stringify({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = res?.data?.access_token;

    if (!accessToken) {
      throw new Error("fail");
    }

    await prisma.account.update({
      where: { id: profile.id },
      data: { access_token: accessToken },
    });

    return accessToken;
  }

  async helixGet(path: string, parameters: any, userId?: string) {
    const profile = await prisma.account.findFirst({
      select: { access_token: true },
      where: userId ? { userId } : { NOT: { access_token: null } },
    });

    if (!profile) {
      throw "Profile not found";
    }

    try {
      const { access_token } = profile;

      const headers: any = {
        "Client-ID": twitchConfig.clientId,
      };

      if (profile) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      return await axios.get(`https://api.twitch.tv/helix/${path}`, {
        headers,
        params: parameters,
      });
    } catch (error) {
      console.log(error);
      throw "Helix Get Error";
    }
  }

  async clips(parameters: {
    broadcaster_id?: string;
    game_id?: string;
    id?: string;
    first?: number;
    after?: string;
    started_at?: string;
    ended_at?: string;
  }) {
    const query = await this.helixGet("clips", parameters);
    return query.data;
  }

  // async follows(params: { from_id?: string }, userId: string) {
  //   const query = await this.helixGet('users/follows', params, userId);
  //   return query.data;
  // }
}

export const twitch = new Twitch();

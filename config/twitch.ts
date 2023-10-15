export const twitchConfig = {
  clientId: process.env.TWITCH_ID || "",
  clientSecret: process.env.TWITCH_SECRET || "",
  scope: "openid user:read:email user:read:follows",
};

export type Follower = {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  followed_at: string;
};

export type User = {
  id?: string;
  login?: string;
  display_name?: string;
  profile_image_url?: string;
};

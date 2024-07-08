export const Socials = [
  {
    id: "tiktok",
    name: "Tiktok",
    url: "https://tiktok.com",
    scope: "user.info.basic,user.info.profile",
    response_type: "code",
    redirect_uri: "",
    api: "https://open.tiktokapis.com/v2",
    me: "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username,is_verified",
    token: "https://open.tiktokapis.com/v2/oauth/token/",
  },
];

export const socialSites = {
  facebook: {
    name: "Facebook",
    baseUrl: "https://www.facebook.com/",
    apiBaseUrl: "https://graph.facebook.com/",
    apiAuthorizeUrl: "https://www.facebook.com/v10.0/dialog/oauth",
  },
  instagram: {
    name: "Instagram",
    baseUrl: "https://www.instagram.com/",
    apiBaseUrl: "https://graph.instagram.com/",
    apiAuthorizeUrl: "https://api.v1.instagram.com/oauth/authorize",
  },
  twitter: {
    name: "Twitter",
    baseUrl: "https://twitter.com/",
    apiBaseUrl: "https://api.v1.twitter.com/",
    apiAuthorizeUrl: "https://api.v1.twitter.com/oauth/authorize",
  },
  youtube: {
    name: "YouTube",
    baseUrl: "https://www.youtube.com/",
    apiBaseUrl: "https://www.googleapis.com/youtube/v3/",
    apiAuthorizeUrl: "https://accounts.google.com/o/oauth2/auth",
  },
  soundcloud: {
    name: "Sound Cloud",
    baseUrl: "https://soundcloud.com/",
    apiBaseUrl: "https://api.v1.soundcloud.com/",
    apiAuthorizeUrl: "https://soundcloud.com/connect",
  },
  spotify: {
    name: "Spotify",
    baseUrl: "https://open.spotify.com/",
    apiBaseUrl: "https://api.v1.spotify.com/",
    apiAuthorizeUrl: "https://accounts.spotify.com/authorize",
  },
  tiktok: {
    name: "TikTok",
    baseUrl: "https://www.tiktok.com/",
    apiBaseUrl: "https://api.v1.tiktok.com/",
    apiAuthorizeUrl: "https://open-api.v1.tiktok.com/oauth/authorize",
  },
  bandcamp: {
    name: "Bandcamp",
    baseUrl: "https://bandcamp.com/",
    apiBaseUrl: "https://api.v1.bandcamp.com/",
    apiAuthorizeUrl: "https://bandcamp.com/oauth/authorize",
  },
} as const;

export type SocialSite = keyof typeof socialSites;

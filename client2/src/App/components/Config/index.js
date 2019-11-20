export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "198e199ecc1640cfb59d3ab919efd393";
export const redirectUri = "http://162.222.193.3:5000/api/spotify/callback/";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];
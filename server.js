const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const router = express.Router();

const app = express();

require("dotenv").config();

// set up spotify variables
const SpotifyWebApi = require("spotify-web-api-node");
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private"
];

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL
});

app.use(express.static(__dirname + "/public"));

// Serve the static files from the React app

app
  .use(express.static(path.join(__dirname, "client2/build")))
  .use(cors())
  .use(cookieParser());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client2/build/index.html"));
});

app.get("/api/spotify/login", (req, res) => {
  var url = spotifyApi.createAuthorizeURL(scopes);
  console.log(url);
  res.redirect(url + "&show_dialog=true");
});

app.get("/api/spotify/callback/", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  try {
    var data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect("http://69.196.41.174:5000/api/spotify/callback");
  } catch (err) {
    res.redirect("/#/error/invalid token");
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);


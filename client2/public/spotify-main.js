console.log("spotify-main.js initialized");
window.onSpotifyWebPlaybackSDKReady = () => {
  var xhr = new XMLHttpRequest();

  // Setup our listener to process completed requests
  xhr.onload = function() {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // What do when the request is successful
      console.log("success!", xhr.response);
    } else {
      // What do when the request fails
      console.log("The request failed!");
    }

    // Code that should run regardless of the request status
    console.log("This always runs...");
  };

  // Create and send a GET request
  // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
  // The second argument is the endpoint URL
  xhr.open("POST", "https://accounts.spotify.com/api/token");
  xhr.send();

  var player = new Spotify.Player({
    name: "Carly Rae Jepsen Player",
    getOAuthToken: callback => {
      callback("7042a9cc73bb4735a5d8b397462b7fcf");
    },
    volume: 0.5
  });
  player.connect().then(success => {
    if (success) {
      console.log("The Web Playback SDK successfully connected to Spotify!");
    }
  });
};

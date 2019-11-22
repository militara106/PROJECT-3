export default {
    logInWithSpotify: (() => {

      var clientId =  "198e199ecc1640cfb59d3ab919efd393";
      var callback =  "localhost:5000/dashboard";
      var scopes = [
        "user-read-private",
        "user-read-email",
        "playlist-modify-public",
        "playlist-modify-private"
      ];

      window.location = [
        "https://accounts.spotify.com/authorize",
        `?client_id=${clientId}`,
        `&redirect_uri=${callback}`,
        `&scope=${scopes}`,
        "&response_type=token",
        "&show_dialog=true"
      ].join('');
    })
  };
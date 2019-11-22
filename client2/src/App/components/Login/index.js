export default {
    logInWithSpotify: (() => {

      var clientId =  "198e199ecc1640cfb59d3ab919efd393";
      var callback =  "http://bcs-project-3.herokuapp.com/dashboard";
      var scopes = [
        "streaming",
        "user-read-birthdate",
        "user-read-email",
        "user-read-private"
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
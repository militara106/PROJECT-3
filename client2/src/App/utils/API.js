const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '198e199ecc1640cfb59d3ab919efd393',
    clientSecret: '7042a9cc73bb4735a5d8b397462b7fcf',
    redirectUri: 'localhost:3000/dashboard'
});

spotifyApi.getMe()
  .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
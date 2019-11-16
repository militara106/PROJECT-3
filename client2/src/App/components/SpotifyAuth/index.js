import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "../Config";
import hash from "../Hash";
import Player from "../../pages/Player";
// import { get } from "http";
// import logo from "./logo.svg";
// import "./App.css";

class SpotifyAuth extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // this.callSpotify();
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      console.log("token identified");
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  callSpotify() {
    $.ajax({
      url: authEndpoint,
      data: {
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: scopes,
        show_dialog: true,
        origin: "http://69.196.45.181:3000/"
      },
      success: function(res) {
        console.log("success", res);
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        console.log("data", data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            // <a
            //   className="btn btn--loginApp-link"
            //   href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            //     "%20"
            //   )}&response_type=token&show_dialog=true`}
            // >
            //   Login to Spotify
            // </a>
            <button className="btn" onClick={this.callSpotify}>
              Login to Spotify
            </button>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )}
        </header>
      </div>
    );
  }
}

export default SpotifyAuth;

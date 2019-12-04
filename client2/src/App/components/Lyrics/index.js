import React, { Component } from "react";
import { getLyrics } from "genius-lyrics-api";

export default class Lyrics extends Component {
  state = {
    lyrics: ""
  };

  componentDidMount() {
    var lyrics = this.newLyric();
    console.log(lyrics);
  }

  newLyric(title, artist) {
    const options = {
      apiKey:
        "ZBy5lmqxq-nq7R4o7YLBQTVIdzkpjIDc6VpLsuOzH8R1t-Wcr_LbRRd3vKXjv6kR",
      title: this.title,
      artist: this.artist,
      optimizeQuery: true
    };

    getLyrics(options).then(lyrics => console.log(lyrics));
  }

  render() {
    return <div></div>;
  }
}

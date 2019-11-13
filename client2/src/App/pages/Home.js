import React, { Component } from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";
import ReactAudioPlayer from "react-audio-player";

// import { Link } from 'react-router-dom';

const audioPos = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

class Home extends Component {
  state = {
    songName: "Creative",
    artist: "Bensound",
    src: "bensound-creativeminds.mp3"
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar />
        <MainVisual />
        <TextOverlay songName={this.state.songName} artist={this.state.artist} />
        <div style={audioPos}>
          <ReactAudioPlayer src={this.state.src} autoPlay controls />
        </div>
      </div>
    );
  }
}
export default Home;

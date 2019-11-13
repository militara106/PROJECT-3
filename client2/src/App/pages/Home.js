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
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar />
        <MainVisual />
        <TextOverlay songName="Song Name" artist="Artist" />
        <div style={audioPos}>
          <ReactAudioPlayer src="bensound-creativeminds.mp3" autoPlay controls />
        </div>
      </div>
    );
  }
}
export default Home;

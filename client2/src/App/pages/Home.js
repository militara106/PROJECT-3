import React, { Component } from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";

// import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar />
        <MainVisual />
        <TextOverlay songName="Song Name" artist="Artist" />
      </div>
    );
  }
}
export default Home;

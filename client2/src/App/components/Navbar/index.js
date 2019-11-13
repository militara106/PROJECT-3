import React from "react";
import ReactAudioPlayer from 'react-audio-player';

function Navbar() {
  return (
    <div>
    <nav className="navbar navGradient lightFont navbar-fixed-top topNavBar">
        <h1 className="vybe">VYBE</h1>
        <div>
        <ReactAudioPlayer
  src="bensound-creativeminds.mp3"
  autoPlay
  controls
/></div> 
    </nav>
    <div className="lowerBorderGradient" />
    </div>
  );
}

export default Navbar;

import React from "react";

function TextOverlay(props) {
  return (
    <div className="overlay" >
      <div className="songInfo lightestFont" style={props.border}>
        <div style={props.style}>
        <h1>{props.songName}</h1>
        <h3>{props.artist}</h3>
        </div>
      </div>
    </div>
  );
}

export default TextOverlay;

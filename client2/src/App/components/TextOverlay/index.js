import React from "react";

function TextOverlay(props) {
  return (
    <div className="overlay">
      <div className="songInfo">
        <h1>{props.songName}</h1>
        <h3>{props.artist}</h3>
      </div>
    </div>
  );
}

export default TextOverlay;

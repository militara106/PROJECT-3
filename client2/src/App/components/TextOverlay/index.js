import React from "react";

function TextOverlay(props) {
  return (
    <div className="text-center testColor overlay">
        <h1>{props.songName}</h1>
        <h3>By {props.artist}</h3>
    </div>
  );
}

export default TextOverlay;

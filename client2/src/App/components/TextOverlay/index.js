import React from "react";

function TextOverlay(props) {
  return (
    <div className=" h-100 d-flex justify-content-center testColor">
      <div className="my-auto text-center">
        <h1>{props.songName}</h1>
        <h3>By {props.artist}</h3>
      </div>
    </div>
  );
}

export default TextOverlay;

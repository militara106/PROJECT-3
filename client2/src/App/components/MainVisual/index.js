import React from "react";



function MainVisual(props) {
  return (
    <div className="mainVisual">
      <div className="mainVisualOverlay"/>
      <div id="visualizerContainer">
      <canvas id="visualizer">
      </canvas>
      </div>
        <div className="fillerText">
        Visualizer Center
        </div>
    </div>
  );
}

export default MainVisual;

import React from "react";



function MainVisual(props) {
  return (
    <div className="mainVisual">
      <div className="mainVisualOverlay"/>
      {props.children}
    </div>
  );
}

export default MainVisual;

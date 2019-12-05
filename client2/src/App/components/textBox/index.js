import React from "react";

function TextBox(props) {
  return (
    <div className="floatingText testColor">
        {props.text}
    </div>
  );
}

export default TextBox;

import React, { Component } from "react";
import TextLoop from "react-text-loop";

class Verbage extends Component {
  verbage = ["VYBE","Beat", "Soul", "VYBE","Music","Heart"];

  render() {
    return (
      <div id="verbContainer">
        <TextLoop>
          {this.verbage.map(element => {
            if (element === "VYBE") {
              return <span key={element} className="lightestFont">{element}</span>
            } else {
              return <span key={element}>{element}</span>;
            }
          })}
        </TextLoop>
      </div>
    );
  }
}

export default Verbage;

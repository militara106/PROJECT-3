import React, { Component } from "react";
import TextLoop from "react-text-loop";

class Verbage extends Component {
  verbage = ["Beat", "Love", "VYBE"];

  render() {
    return (
      <div id="verbContainer">
        <TextLoop>
          {this.verbage.map(element => {
            if (element === "VYBE") {
              return <span className="lightestFont">{element}</span>
            } else {
              return <span>{element}</span>;
            }
          })}
        </TextLoop>
      </div>
    );
  }
}

export default Verbage;

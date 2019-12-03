import React, { Component } from "react";
import TextLoop from "react-text-loop";

class Verbage extends Component {
  verbage = ["VYBE", "Music", "Love", "Rhythm", "Beat"];

  render() {
    return (
      <div id="verbContainer">
        <TextLoop>
          {this.verbage.map(element => {
            return <span>{element}</span>;
          })}
        </TextLoop>
      </div>
    );
  }
}

export default Verbage;

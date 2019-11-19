import React, { Component } from "react";

const style = {
  optionHeader: {
    fontSize: "120%",
    padding: ".2rem",
    margin: ".2rem",
    textDecoration: "underline"
  }
};

class CollapseMenu extends Component {
  constructor(props) {
    super();
  }

  // State
  state = {
    menuVisible: false,
    visualizerVisible: false
  };

  toggleMenu = () => {
    if (this.state.menuVisible === false) {
      document.getElementById("menu").style.display = "block";
      this.setState({ menuVisible: true });
    } else {
      document.getElementById("menu").style.display = "none";
      this.setState({ menuVisible: false });
    }
  };

  toggleVisualizer = () => {
    if (this.state.visualizerVisible === false) {
      document.getElementById("visualizerToggle").style.color = "white";
      this.setState({ visualizerVisible: true });
    } else {
      document.getElementById("visualizerToggle").style.color = "inherit";
      this.setState({ visualizerVisible: false });
    }
  };

  render() {
    return (
      <div className="optionsContainer">
        <div className="optionsBtn" onClick={this.toggleMenu}>
          Options
        </div>
        <div id="menu" className="optionsMenu darkestBg darkBorder text-center">
          <div style={style.optionHeader}>Change Music:</div>
          {this.props.children}
          <div style={style.optionHeader}>Toggle Display:</div>
          <div className="btnCustom" onClick={this.props.toggle}>
            <div id="visualizerToggle" onClick={this.toggleVisualizer}>
              Visualizer
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollapseMenu;

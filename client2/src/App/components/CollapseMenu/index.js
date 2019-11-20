import React, { Component } from "react";

const style = {
  optionHeader: {
    fontSize: "120%",
    padding: ".2rem",
    width: "100%",
    textAlign:"center"
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
      document.getElementById("menu").style.right = "1%";
      document.getElementById("options").style.color = "white";
      this.setState({ menuVisible: true });
    } else {
      document.getElementById("menu").style.right = "-50%";
      document.getElementById("options").style.color = "inherit";
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
        <div id="options" className="optionsBtn" onClick={this.toggleMenu}>
          Options
        </div>

        <div
          id="menu"
          className="optionsMenu optionsPos text-center darkestBg medFont"
        >
          {/* Display Options */}
          <div>
            <div style={style.optionHeader} className="darkBorderBot">
              Visualizers
            </div>
            <div className="subMenu">
              <div className="btnCustom" onClick={this.props.toggle}>
                <div id="visualizerToggle" onClick={this.toggleVisualizer}>
                  Bars
                </div>
              </div>
            </div>
          </div>

          {/* Audio Option */}
          <div>
            <div style={style.optionHeader} className="darkBorderBot">
              Audio
            </div>
            <div className="subMenu">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollapseMenu;

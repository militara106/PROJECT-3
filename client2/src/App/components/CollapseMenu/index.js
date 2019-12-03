import React, { Component } from "react";

const optionsBox = {
  display: "flex",
  flexDirection: "column"
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
      document.getElementById("menu").style.right = "-200%";
      document.getElementById("options").style.color = "grey";
      this.setState({ menuVisible: false });
    }
  };

  toggleVisualizer = () => {
    if (this.state.visualizerVisible === false) {
      this.setState({ visualizerVisible: true });
    } else {
      this.setState({ visualizerVisible: false });
    }
  };

  render() {
    return (
      <div className="optionsContainer">
        <div id="options" className="optionsBtn" onClick={this.toggleMenu}>
        <i class="fas fa-ellipsis-v"></i>
        </div>

        <div id="menu" className="optionsMenu optionsPos text-center medFont">
          {/* Display Options */}
          <div>
            <div className="darkBorder">
              {/* TOGGLE VISUALIZER */}
              <div className="darkBorderBot optionsHeader">Visualizer</div>
              <div className="subMenu">
                <div className="btnCustom" onClick={this.props.toggle}>
                  <div id="visualizerToggle" onClick={this.toggleVisualizer}>
                    {!this.state.visualizerVisible && "Show"}
                    {this.state.visualizerVisible && "Hide"}
                  </div>
                </div>
              </div>

              {/* VISUALIZER COLOR */}
              <div>
                <div className="darkBorderBot optionsHeader">Colors</div>
                <div className="subMenu">
                  <div style={optionsBox}>
                    <div className="btnCustom" onClick={this.props.fireTheme}>
                      Fire
                    </div>
                    <div className="btnCustom" onClick={this.props.ebonTheme}>
                      Ebon
                    </div>
                    <div className="btnCustom" onClick={this.props.aquaTheme}>
                      Aqua
                    </div>
                    <div className="btnCustom" onClick={this.props.redlineTheme}>
                      Redline
                    </div>
                  </div>
                </div>
              </div>

              {/* VISUALIZER STYLE */}
              <div>
                <div className="darkBorderBot optionsHeader">Style</div>
                <div className="subMenu">
                  <div style={optionsBox}>
                    <div className="btnCustom" onClick={this.props.bars}>
                      Bars
                    </div>
                    <div className="btnCustom" onClick={this.props.round}>
                      Speaker
                    </div>
                    <div className="btnCustom" onClick={this.props.circleBar}>
                      Circle
                    </div>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CollapseMenu;

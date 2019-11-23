import React, { Component } from "react";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import CollapseMenu from "../components/CollapseMenu";
import Dashboard from "./Dashboard";

// import { Link } from 'react-router-dom';

const audioPos = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
  zIndex: "10"
};

const optionsBox = {
  display: "flex",
  flexDirection: "column"
};

class Home extends Component {
  // Default State/Song
  state = {

    // Account Info
    account: "",
    room: "",

    // Current Song Playing
    songName: "No Audio Playing",
    artist: "Choose Songs in Options",
    src: "",
    mediaElement: "",

    // Check if visualizer is initialized
    visualizerCheck: false,

    // Color Base Values
    redAdd: 100,
    redMult: 1,
    greenAdd: -50,
    greenMult: 1,
    blueAdd: 0,
    blueMult: 0
  };

  // Handle Audio File Upload
  handleFileUpload = event => {
    // Get File src
    let newsrc = URL.createObjectURL(event.target.files[0]);

    // Get only File Name from path
    let pathName = document.getElementById("thefile").value;
    let start =
      pathName.indexOf("\\") >= 0
        ? pathName.lastIndexOf("\\")
        : pathName.lastIndexOf("/");
    let newFileName = pathName.substring(start);
    if (newFileName.indexOf("\\") === 0 || newFileName.indexOf("/") === 0) {
      newFileName = newFileName.substring(1);
    }
    // Remove File Extension
    newFileName = newFileName.replace(/\.[^/.]+$/, "");

    // Uppercase file Letter
    newFileName = newFileName.charAt(0).toUpperCase() + newFileName.slice(1);

    // Set States
    this.setState({ src: newsrc, songName: newFileName, artist: "" });
  };

  //Start "BenSound" Demo
  handleDemoSong = () => {
    this.setState({
      src: "bensound-creativeminds.mp3",
      songName: "Creative",
      artist: "Bensound.com"
    });
  };

  // Handle Picture Upload
  handlePicUpload = event => {
    // Get File src
    let newUrl = URL.createObjectURL(event.target.files[0]);
    let overlay = document.getElementsByClassName("mainVisualOverlay")[0];
    overlay.style.backgroundImage = "url('" + newUrl + "')";
  };

  handleDefaultPic = () => {
    let overlay = document.getElementsByClassName("mainVisualOverlay")[0];
    overlay.style.backgroundImage = "url('overlayBG.jpg')";
  };

  // Toggles Visibility of Visualizer
  ToggleVisualizer = () => {
    // Audio Variables
    let audio = document.getElementsByTagName("audio")[0];
    let audioContext = new AudioContext();
    // let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let src = this.state.mediaElement;
    console.log("Audio: " + audio.src);

    // Analyzer Variables
    let analyzer = audioContext.createAnalyser();
    let freqArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 1024;

    // Toggle Logic
    let canvas = document.getElementById("visualizer");
    if (this.state.visualizerCheck === false) {
      canvas.style.display = "block";
      this.setState({ visualizerCheck: true });
    } else {
      this.setState({ visualizerCheck: false });
      canvas.style.display = "none";
    }

    if (this.state.mediaElement === "") {
      src = audioContext.createMediaElementSource(audio);
      src.connect(analyzer);
      this.setState({ mediaElement: src });
      this.Visualizer(analyzer, freqArray);
    }
  };

  changeTheme = (rA, rM, gA, gM, bA, bM) => {
    this.setState({
      redAdd: rA,
      redMult: rM,
      greenAdd: gA,
      greenMult: gM,
      blueAdd: bA,
      blueMult: bM
    });
  };

  // Visualizer Themes
  fireTheme = () => {
    this.changeTheme(100, 1, -50, 1, 0, 0);
  };
  ebonTheme = () => {
    this.changeTheme(0, 1, 0, 1, 0, 1);
  };
  aquaTheme = () => {
    this.changeTheme(0, 0, -50, 1, 100, 1);
  };

  // ----------------------AUDIO VISUALIZER-----------------------
  Visualizer = (analyzer, freqArray) => {
    // Canvas Variables
    let canvas = document.getElementById("visualizer");
    let canvasContext = canvas.getContext("2d");
    canvas.width = document.getElementById("visualizerContainer").offsetWidth;
    canvas.height = document.getElementById("visualizerContainer").offsetHeight;
    console.log("Width: " + canvas.width + " Height: " + canvas.height);

    //  Canvas Background Color
    let fillStyle = "rgba(0,0,0,0)";

    // Visualizer Variables
    let barHeight = 5;
    let barWidth = (canvas.width / analyzer.frequencyBinCount) * 2;
    let x, x2;
    // let y, y2;

    //Bar Visualizer
    const renderBarVisualizer = () => {
      requestAnimationFrame(renderBarVisualizer);
      analyzer.getByteFrequencyData(freqArray);

      drawBaseCanvas();

      // Color Based on State
      let rA = this.state.redAdd;
      let rM = this.state.redMult;
      let gA = this.state.greenAdd;
      let gM = this.state.greenMult;
      let bA = this.state.blueAdd;
      let bM = this.state.blueMult;

      x = canvas.width / 2 + barWidth;
      x2 = x - barWidth;

      for (var i = 0; i < canvas.width; i++) {
        barHeight = (freqArray[i * 3] + 5) * 2.5;

        setCanvasColor(i, barHeight, rA, rM, gA, gM, bA, bM);
        canvasContext.fillRect(
          x,
          (canvas.height - barHeight) / 2,
          barWidth,
          barHeight
        );
        canvasContext.fillRect(
          x2,
          (canvas.height - barHeight) / 2,
          barWidth,
          barHeight
        );

        x += barWidth;
        x2 -= barWidth;
      }
    };
    renderBarVisualizer();

    //  Draw Base Canvas
    function drawBaseCanvas() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.fillStyle = fillStyle;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    //  Set Canvas color
    // 'rr' Red Color Addition, 'r1' Red Color Multiplier
    // Same convention for 'g' for Green and 'b' for Blue
    function setCanvasColor(i, barHeight, rr, r1, gg, g1, bb, b1) {
      let b = (barHeight + i / analyzer.frequencyBinCount) * b1 + bb;
      let g = (barHeight + i / analyzer.frequencyBinCount) * g1 + gg;
      let r = (barHeight + i / analyzer.frequencyBinCount) * r1 + rr;
      canvasContext.fillStyle =
        "rgba(" + r + "," + g + "," + b + "," + 0.8 + ")";
      canvasContext.strokeStyle =
        "rgba(" + r + "," + g + "," + b + "," + 0.8 + ")";
    }
  };
  // ----------------------AUDIO VISUALIZER END-----------------------

  render() {
    return (
      <div className="d-flex flex-column h-100">
        {/* NavBar */}
        <NavBar>
          <CollapseMenu toggle={this.ToggleVisualizer}>
            {/*---- Theme Change Options ----*/}
            <div>
              <div className="darkBorderBot optionsHeader">Visualizer Themes</div>
              <div className="subMenu">
                <div style={optionsBox}>
                  <div className="btnCustom" onClick={this.fireTheme}>
                    Fire
                  </div>
                  <div className="btnCustom" onClick={this.ebonTheme}>
                    Ebon
                  </div>
                  <div className="btnCustom" onClick={this.aquaTheme}>
                    Aqua
                  </div>
                </div>
              </div>
            </div>
            {/*---- Theme Change Options End ----*/}

            {/*---- Audio Option ----*/}
            <div>
              <div className="darkBorderBot optionsHeader">Audio</div>
              <div className="subMenu">
                {/* Start Demo */}
                <div style={optionsBox}>
                  <div className="btnCustom" onClick={this.handleDemoSong}>
                    Demo Song
                  </div>

                  {/* Upload File */}
                  <div className="inputContainer btnCustom">
                    <input
                      type="file"
                      id="thefile"
                      className="inputFile"
                      accept="audio/*"
                      onChange={this.handleFileUpload}
                    />
                    <label id="fileLabel" for="thefile">
                      Upload Music
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/*---- Audio Option End ----*/}

            {/*---- Overlay Option ----*/}
            <div>
              <div className="darkBorderBot optionsHeader">BG Image</div>
              <div className="subMenu">
                <div style={optionsBox}>
                  {/* Default Image */}
                  <div className="btnCustom" onClick={this.handleDefaultPic}>
                    Default Picture
                  </div>

                  {/* Upload File */}
                  <div className="inputContainer btnCustom">
                    <input
                      type="file"
                      id="imageFile"
                      className="inputFile"
                      accept="image/*"
                      onChange={this.handlePicUpload}
                    />
                    <label id="fileLabel" for="imageFile">
                      Upload Picture
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/*---- Overlay Option End ----*/}
          </CollapseMenu>
        </NavBar>

        {/* Main/Center Content */}
        <MainVisual>
          <div id="visualizerContainer">
            <canvas id="visualizer"></canvas>
          </div>
        </MainVisual>

        {/* Song Info */}
        <TextOverlay
          songName={this.state.songName}
          artist={this.state.artist}
        />

        {/* Audio Player */}
        <div style={audioPos}>
          {/* <ReactAudioPlayer
            src={this.state.src}
            id={"audio-element"}
            controls
          /> */}
          <Dashboard />
        </div>

        {/* Playlist (WIP) */}
      </div>
    );
  }
}
export default Home;

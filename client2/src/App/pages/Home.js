import React, { Component } from "react";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";
import ReactAudioPlayer from "react-audio-player";
import CollapseMenu from "../components/CollapseMenu";

// import { Link } from 'react-router-dom';

const audioPos = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
  zIndex: "10"
};

class Home extends Component {
  // Default State/Song
  state = {
    songName: "Creative",
    artist: "Bensound",
    src: "bensound-creativeminds.mp3",
    account: "",
    room: "",
    mediaElement: "",
    visualizerCheck: false
  };


  ToggleVisualizer = () => {
    // Audio Variables
    let audio = document.getElementById("audio-element");
    // let audioContext = new AudioContext();
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let src = this.state.mediaElement;
    console.log("Audio: " + audio.src);

    // Analyzer Variables
    let analyzer = audioContext.createAnalyser();
    let freqArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 512;

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
    let barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
    let x, x2;
    // let y, y2;
    let g, b;
    let r = 0;

    //Bar Visualizer
    renderBarVisualizer();
    function renderBarVisualizer() {
      requestAnimationFrame(renderBarVisualizer);
      analyzer.getByteFrequencyData(freqArray);

      drawBaseCanvas();

      x = canvas.width / 2 + barWidth;
      x2 = x - barWidth;

      for (var i = 0; i < canvas.width; i++) {
        barHeight = (freqArray[i*3] + 5) * 2.5 ;

        setCanvasColor(i, barHeight);
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
    }

    //  Draw Base Canvas
    function drawBaseCanvas() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.fillStyle = fillStyle;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    //  Set Canvas color
    function setCanvasColor(i, barHeight) {
      b = (barHeight + i / analyzer.frequencyBinCount) * 0;
      g = barHeight + i / analyzer.frequencyBinCount - 50;
      r = barHeight + i / analyzer.frequencyBinCount + 100;
      canvasContext.fillStyle =
        "rgba(" + r + "," + g + "," + b + "," + .8 + ")";
      canvasContext.strokeStyle =
        "rgba(" + r + "," + g + "," + b + "," + .8 + ")";
    }
  };
  // ----------------------AUDIO VISUALIZER END-----------------------

  render() {
    return (
      <div className="d-flex flex-column h-100">
        {/* NavBar */}
        <NavBar>
          <CollapseMenu toggle={this.ToggleVisualizer}/>
        </NavBar>

        {/* Main/Center Content */}
        <MainVisual>
          {/* <div className="fillerText">Visualizer Center</div> */}
          <div id="visualizerContainer">
            <canvas id="visualizer"></canvas>
          </div>
        </MainVisual>

        {/* Song Info */}
        <TextOverlay
          songName={this.state.songName}
          artist={`By ${this.state.artist}`}
        />

        {/* Audio Player */}
        <div style={audioPos}>
          <ReactAudioPlayer
            src={this.state.src}
            id={"audio-element"}
            controls
          />
        </div>
      </div>
    );
  }
}
export default Home;

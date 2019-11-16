import React, { Component } from "react";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";
import ReactAudioPlayer from "react-audio-player";

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

  clicky = () => {
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
    if(this.state.visualizerCheck  === false){
      canvas.style.display = "block";
      this.setState({visualizerCheck: true});
    }
    else{
      this.setState({visualizerCheck:false});
      canvas.style.display = "none";
    }


    if(this.state.mediaElement === ""){
      src = audioContext.createMediaElementSource(audio);
      src.connect(analyzer);
      this.setState({mediaElement:src});
      this.Visualizer(analyzer, freqArray);
      }


  }

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
    // let x,y,x2,y2;
    let g, b;
    let r = 0;

    renderRoundVisualizer();
    function renderRoundVisualizer() {
      requestAnimationFrame(renderRoundVisualizer);
      analyzer.getByteFrequencyData(freqArray);

      var center_x = canvas.width / 2;
      var center_y = canvas.height / 2;
      var radius = 1;
      var circles = 30;

      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      drawBaseCanvas();
      drawArc(center_x, center_y, radius, 0, 2 * Math.PI);

      for (var i = 0; i < circles; i++) {
        barHeight = freqArray[i];
        radius = freqArray[i];

        setCanvasColor(i, barHeight);
        canvasContext.lineWidth = barWidth / 5;
        drawArc(center_x, center_y, radius + i * 20, i, 2 * Math.PI - i);
      }
    }

    //  Draw Base Canvas
    function drawBaseCanvas() {
      canvasContext.fillStyle = fillStyle;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    //  Set Canvas color
    function setCanvasColor(i, barHeight) {
      b = barHeight + 25 * (i / analyzer.frequencyBinCount) + 50;
      g = barHeight + 25 * (i / analyzer.frequencyBinCount) + 50;
      r = 0;
      canvasContext.fillStyle =
        "rgba(" + r + "," + g + "," + b + "," + 0.5 + ")";
      canvasContext.strokeStyle =
        "rgba(" + r + "," + g + "," + b + "," + 0.5 + ")";
    }

    //  Draw Arc
    function drawArc(x, y, radius, start, end) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, radius, start, end);
      canvasContext.stroke();
    }
  };

  // ----------------------AUDIO VISUALIZER END-----------------------

  render() {
    return (
      <div className="d-flex flex-column h-100">
        {/* NavBar */}
        <NavBar />

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
          <div onClick={this.clicky}>Click</div>
        </div>
      </div>
    );
  }
}
export default Home;

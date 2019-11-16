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
    room: ""
  };

  componentDidMount(){
    this.Visualizer();
  }


  // ----------------------AUDIO VISUALIZER-----------------------
  Visualizer = () => {
    // Canvas Variables
    let canvas = document.getElementById("visualizer");
    let canvasContext = canvas.getContext("2d");
    canvas.width = document.getElementById("visualizerContainer").offsetWidth;
    canvas.height = document.getElementById("visualizerContainer").offsetHeight;
    console.log("Width: " + canvas.width + " Height: " + canvas.height);
  
    //  Canvas Background Color
    let fillStyle = "rgba(0,0,0,0)";
  
    // Audio Variables
    let audio = document.getElementById("audio-element");
    audio.load();
  
     let audioContext = new AudioContext();
    // let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let src = audioContext.createMediaElementSource(audio);
    console.log("Audio: " + audio.src);
  
    // Analyzer Variables
    let analyzer = audioContext.createAnalyser();
    let freqArray = new Uint8Array(analyzer.frequencyBinCount);
    src.connect(analyzer);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 128;
  
    // Visualizer Variables
    let barHeight = 5;
    let barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
    let x, x2;
    let g, b;
    let r = 0;
  
    // renderBarVisualizer();
    function renderBarVisualizer() {
      // Base Canvas
      canvasContext.fillStyle = fillStyle;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  
      //Bar Variables
      requestAnimationFrame(renderBarVisualizer);
      analyzer.getByteFrequencyData(freqArray);
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
      x = canvas.width / 2;
      x2 = x;
  
      // Draw Bars
      for (var i = 0; i < analyzer.frequencyBinCount; i++) {
        barHeight = freqArray[i] + 5;
  
        // Setting Colors
        b = barHeight + 25 * (i / analyzer.frequencyBinCount) + 50;
        g = barHeight + 25 * (i / analyzer.frequencyBinCount) + 50;
        r = 0;
        canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        canvasContext.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
  
        canvasContext.fillRect(
          x,
          (canvas.height - barHeight * 2.5) / 2,
          barWidth,
          barHeight * 2.5
        );
        canvasContext.fillRect(
          x2,
          (canvas.height - barHeight * 2.5) / 2,
          barWidth,
          barHeight * 2.5
        );
  
        x += barWidth + 1;
        x2 -= barWidth + 1;
      }
    }
  }
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
        </div>
      </div>
    );
  }
}
export default Home;

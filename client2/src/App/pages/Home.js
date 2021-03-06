import React, { Component } from "react";
import NavBar from "../components/Navbar";
import TextOverlay from "../components/TextOverlay";
import MainVisual from "../components/MainVisual";
import ReactAudioPlayer from "react-audio-player";
// import AudioPlayer from "react-h5-audio-player";
import CollapseMenu from "../components/CollapseMenu";
import { TwitterTimelineEmbed } from "react-twitter-embed";
// import Lyrics from "../components/Lyrics";
import text from "../components/textBox/text.js";

// import { Link } from 'react-router-dom';

// const audioPos = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginBottom: "1rem",
//   zIndex: "10"
// };

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
    artist: "Get Started in the Options",
    src: "",
    mediaElement: "",

    // Check if visualizer is initialized
    visualizerCheck: false,
    visualizerStyle: "bar",

    // Color Base Values
    redAdd: 100,
    redMult: 0.5,
    greenAdd: -50,
    greenMult: 0.5,
    blueAdd: 0,
    blueMult: 0,

    // Background Colors
    mainFont: {
      color: "#f2a10b"
    },
    subFont: {
      color: "#f2a10b"
    },
    navbarBG: {
      background:
        "linear-gradient(180deg, #0b0c10 80%, rgba(40, 40, 40, 0) 100%)"
    },
    subBG: {
      backgroundColor: "#282828"
    },
    mainBorder: {
      borderColor: "#f2a10b"
    },
    vybe: {
      color: "white"
    },

    lyrics: "Lyrics Not Available"
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
    switch (newFileName) {
      case "Giants":
        this.changeToSong(
          "./audio/Giants/audio.mp3",
          "Giants",
          "True Damage",
          text.data.giants,
          "trueDamage"
        );
        break;
      case "Vete":
        this.changeToSong(
          "./audio/Vete/audio.mp3",
          "Vete",
          "Bad Bunny",
          text.data.vete,
          "badBunny"
        );
        break;
      case "Single Again":
        this.changeToSong(
          "./audio/Single-Again/audio.mp3",
          "Single Again",
          "Big Sean",
          text.data.singleAgain,
          "bigSean"
        );
        break;
      case "Move Mountains":
        this.changeToSong(
          newsrc,
          newFileName,
          "Angela",
          "Lyrics Not Available",
          ""
        );
        break;
      case "Dim":
          this.changeToSong(
            newsrc,
            newFileName,
            "Yetep",
            "Lyrics Not Available",
            "yetep"
          );
          break;
      default:
        this.setState(
          {
            src: newsrc,
            songName: newFileName,
            artist: "",
            lyrics: "Lyrics Not Available"
          },
          () => {
            if (
              this.state.songName !== "Giants" &&
              this.state.songName !== "Vete" &&
              this.state.songName !== "Single Again"
            ) {
              this.hideAllTwitter();
            }
          }
        );
    }
  };

  //Start "BenSound" Demo
  handleDemoSong = () => {
    this.setState(
      {
        src: "bensound-creativeminds.mp3",
        songName: "Creative",
        artist: "Bensound.com",
        lyrics: "Lyrics Not Available"
      },
      () => {
        this.resetScolling("twitterContainer");
        this.resetScolling("lyricsContainer");
        this.hideAllTwitter();
        this.showSingleTwitter("bensound");
      }
    );
  };

  // Universal Change Song
  changeToSong = (filePath, songName, artist, lyrics, twitterId) => {
    this.setState(
      {
        src: filePath,
        songName: songName,
        artist: artist,
        lyrics: lyrics
      },
      () => {
        console.log(this.state.songName);
        // Show and reset container
        if (twitterId !== "") {
          document.getElementById("twitterContainer").style.display = "block";
          this.resetScolling("twitterContainer");
          this.resetScolling("lyricsContainer");

          // Make only Song Visible
          this.hideAllTwitter();
          this.showSingleTwitter(twitterId);
        } else {
          this.hideAllTwitter();
        }
      }
    );
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

  // FIRE THEME
  fireTheme = () => {
    // +red, xred, +green, xgreen, +blue, xblue
    this.changeTheme(100, 0.5, -50, 0.5, 0, 0);

    // Main font, Sub Font, Navbar Color, Sub BG Color, VYBE Logo Color
    this.changeColorSet("#f2a10b", "#f2a10b", "#0b0c10", "#282828", "white");

    // Body Color
    this.changeBodyColor("#282828");
  };

  // EBON THEME
  ebonTheme = () => {
    // +red, xred, +green, xgreen, +blue, xblue
    this.changeTheme(0, 0.5, 0, 0.5, 0, 0.5);

    // Main font, Sub Font, Navbar Color, Sub BG Color, VYBE Logo Color
    this.changeColorSet("white", "white", "white", "white", "black");

    // Body Color
    this.changeBodyColor("black");
  };

  // AQUA THEME
  aquaTheme = () => {
    // +red, xred, +green, xgreen, +blue, xblue
    this.changeTheme(0, 0, -50, 0.5, 100, 0.5);

    // Main font, Sub Font, Navbar Color, Sub BG Color, VYBE Logo Color
    this.changeColorSet("aqua", "#240090", "#3500d3", "white", "aqua");

    // Body color
    this.changeBodyColor("#1c1042");
  };

  // REDLINE THEME
  redlineTheme = () => {
    // +red, xred, +green, xgreen, +blue, xblue
    this.changeTheme(50, 0.5, 10, 0.5, 10, 0.5);

    // Main font, Sub Font, Navbar Color, Sub BG Color, VYBE Logo Color
    this.changeColorSet("#e3e2df", "#e3e2df", "#5d001e", "#fa6a69", "#e3e2df");

    // Body color
    this.changeBodyColor("#a3a29f");
  };

  // Visualizer Stlyes
  barVisualizer = () => {
    this.setState({ visualizerStyle: "bar" });
  };
  roundVisualizer = () => {
    this.setState({ visualizerStyle: "round" });
  };
  circleBarVisualizer = () => {
    this.setState({ visualizerStyle: "circleBar" });
  };

  changeBodyColor(color) {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
  }

  changeColorSet(mainFont, subFont, navbarBG, subBG, vybe) {
    this.setState({
      mainFont: {
        color: mainFont
      },
      subFont: {
        color: subFont
      },
      navbarBG: {
        background:
          "linear-gradient(180deg, " +
          navbarBG +
          " 80%, rgba(40, 40, 40, 0) 100%)"
      },
      subBG: {
        backgroundColor: subBG
      },
      mainBorder: {
        borderColor: mainFont
      },
      vybe: {
        color: vybe
      }
    });
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
    let barWidth = (canvas.width / analyzer.frequencyBinCount) * 2;
    let x, x2;
    // let y, y2;

    //Render Visualizer (IGNORE FUNCTION NAME)
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

      // Round Viz Variables
      var center_x = canvas.width / 2;
      var center_y = canvas.height / 2;
      var radius = 1;
      var circles = 100;

      // Circle Bar Viz Variables

      // BAR VISUALIZER
      if (this.state.visualizerStyle === "bar") {
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
      }
      // ROUND VISUALIZER
      else if (this.state.visualizerStyle === "round") {
        for (let j = 0; j < circles; j++) {
          barHeight = (freqArray[j * 3] + 5) * 2.5;
          radius = freqArray[j] / 2;

          setCanvasColor(j, barHeight, rA, rM, gA, gM, bA, bM);
          canvasContext.lineWidth = barWidth;
          drawArc(center_x, center_y, radius + j * 5, j, 2 * Math.PI - j);
        }
      }

      // CIRCLE BAR VISUALIZER
      else if (this.state.visualizerStyle === "circleBar") {
        console.log("Circle Visualizer WIP");
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

    //  Draw Arc
    function drawArc(x, y, radius, start, end) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, radius, start, end);
      canvasContext.stroke();
    }
  };
  // ----------------------AUDIO VISUALIZER END-----------------------

  // Auto-Scroll
  ScrollDiv(div, repeat) {
    let x = document.getElementById(div);
    if (x.scrollTop < x.scrollHeight - x.offsetHeight) {
      x.scrollTop = x.scrollTop + 1;
    } else if (repeat === true) {
      x.scrollTop = 0;
    }
  }

  resetScolling = id => {
    document.getElementById(id).scrollTop = 0;
  };

  // COMPONENT DID MOUNT
  componentDidMount = () => {
    setInterval(this.ScrollDiv, 50, "twitterContainer", true);
    setInterval(this.ScrollDiv, 60, "lyricsContainer", true);
    this.hideAllTwitter();
  };

  // Toggle Hide Div
  hideDivLeft = id => {
    let check = document.getElementById(id).style.left;
    console.log(check);
    if (check === "0%") {
      document.getElementById(id).style.left = "-200%";
      console.log(id + " hidden");
    } else {
      document.getElementById(id).style.left = "0%";
      console.log(id + " shown");
    }
  };

  hideDivRight = id => {
    let check = document.getElementById(id).style.right;
    console.log(check);
    if (check === "0%") {
      document.getElementById(id).style.right = "-200%";
      console.log(id + " hidden");
    } else {
      document.getElementById(id).style.right = "0%";
      console.log(id + " shown");
    }
  };

  toggleTwitter = () => {
    this.hideDivLeft("twitterContainer");
  };

  toggleLyrics = () => {
    this.hideDivRight("lyricsContainer");
  };

  hideAllTwitter = () => {
    let twitterDiv = document.getElementsByClassName("twitterDiv");
    for (let i = 0; i < twitterDiv.length; i++) {
      twitterDiv[i].style.display = "none";
    }
  };

  showSingleTwitter = id => {
    document.getElementById(id).style.display = "block";
  };

  render() {
    return (
      <div className="d-flex flex-column h-100">
        {/* NavBar */}
        <NavBar style={this.state.navbarBG} vybe={this.state.vybe}>
          <CollapseMenu
            toggle={this.ToggleVisualizer}
            fireTheme={this.fireTheme}
            ebonTheme={this.ebonTheme}
            aquaTheme={this.aquaTheme}
            redlineTheme={this.redlineTheme}
            bars={this.barVisualizer}
            round={this.roundVisualizer}
            circleBar={this.circleBarVisualizer}
          >
            {/*---- Audio Option ----*/}
            <div className="darkBorder darkBg">
              <div className="darkBorderBot optionsHeader">Custom Audio</div>
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
                    <label id="fileLabel" htmlFor="thefile">
                      Upload Music
                    </label>
                  </div>
                </div>
              </div>

              <div className="darkBorderBot optionsHeader">Preset Songs</div>
              <div className="subMenu">
                {/* Start Demo */}
                <div style={optionsBox}>
                  {/* ------PRESET SONGS------- */}
                  {/* GIANTS */}
                  <div
                    className="btnCustom"
                    onClick={() =>
                      this.changeToSong(
                        "./audio/Giants/audio.mp3",
                        "Giants",
                        "True Damage",
                        text.data.giants,
                        "trueDamage"
                      )
                    }
                  >
                    "Giants" by True Damage
                  </div>
                  {/* VETE */}
                  <div
                    className="btnCustom"
                    onClick={() =>
                      this.changeToSong(
                        "./audio/Vete/audio.mp3",
                        "Vete",
                        "Bad Bunny",
                        text.data.vete,
                        "badBunny"
                      )
                    }
                  >
                    "Vete" by Bad Bunny
                  </div>
                  {/* SINGLE AGAIN */}
                  <div
                    className="btnCustom"
                    onClick={() =>
                      this.changeToSong(
                        "./audio/Single-Again/audio.mp3",
                        "Single Again",
                        "Big Sean",
                        text.data.singleAgain,
                        "bigSean"
                      )
                    }
                  >
                    "Single Again" by Big Sean
                  </div>
                  {/* ------PRESET SONGS------- */}
                </div>
              </div>
              {/*---- Audio Option End ----*/}
            </div>
            <div className="darkBorder darkBg">
              {/*---- Overlay Option ----*/}
              <div className="darkBorderBot optionsHeader">Background</div>
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
                    <label id="fileLabel" htmlFor="imageFile">
                      Upload Picture
                    </label>
                  </div>
                </div>
              </div>

              {/* Customize */}
              <div className="darkBorderBot optionsHeader">Customize</div>
              <div className="subMenu">
                <div className="btnCustom" onClick={this.toggleTwitter}>
                  Toggle Twitter
                </div>
                <div className="btnCustom" onClick={this.toggleLyrics}>
                  Toggle Lyrics
                </div>
              </div>

              {/* Navigation */}
              <div className="darkBorderBot optionsHeader">Navigation</div>
              <div className="subMenu">
                <a className="linkStyle btnCustom" href="/">
                  Login Page
                </a>
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
          style={this.state.mainFont}
          border={this.state.mainBorder}
        >
          {/* Audio Player 2 */}
          {/* <AudioPlayer src={this.state.src} loop={true} /> */}
          <ReactAudioPlayer
            src={this.state.src}
            loop={true}
            autoPlay={true}
            controls
          />
        </TextOverlay>

        {/* Lyrics */}
        <div className="floatingText" id="lyricsContainer">
          {this.state.lyrics}
        </div>

        {/* Twitter */}
        <div
          className="twitterContainer"
          data-visible={false}
          id="twitterContainer"
        >
          Twitter Not Available
          {/* Big Sean */}
          <div id="bigSean" className="twitterDiv">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="bigsean"
              transparent
              theme="dark"
              noScrollbar
              noFooter
              noHeader
              noBorders
            />
          </div>
          {/* Bad Bunny */}
          <div id="badBunny" className="twitterDiv">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="imbadBunny"
              transparent
              theme="dark"
              noScrollbar
              noFooter
              noHeader
              noBorders
            />
          </div>
          {/* True Damage */}
          <div id="trueDamage" className="twitterDiv">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="riotgames"
              transparent
              theme="dark"
              noScrollbar
              noFooter
              noHeader
              noBorders
            />
          </div>
          {/* yetep */}
          <div id="yetep" className="twitterDiv">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="imyetep"
              transparent
              theme="dark"
              noScrollbar
              noFooter
              noHeader
              noBorders
            />
          </div>
          {/* bensound */}
          <div id="bensound" className="twitterDiv">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="bensound"
              transparent
              theme="dark"
              noScrollbar
              noFooter
              noHeader
              noBorders
            />
          </div>
        </div>

        {/* Audio Player */}
        {/* <div style={this.state.mainFont} className="bottomBar">
          <div style={audioPos}>
            <ReactAudioPlayer src={this.state.src} loop autoplay controls/>
          </div>
        </div> */}

        {/* Playlist (WIP) */}

        {/* Song Lyrics Here */}
        {/* <Lyrics /> */}
      </div>
    );
  }
}
export default Home;

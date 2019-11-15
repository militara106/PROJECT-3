// Canvas Variables
canvas = document.getElementById("visualizer");
var canvasContext = canvas.getContext("2d");
canvas.width = document.getElementById("visualizerContainer").offsetWidth;
canvas.height = document.getElementById("visualizerContainer").offsetHeight;
var height = canvas.height;
var width = canvas.width;
console.log("Width: " + canvas.width + " Height: " + canvas.height);

//  Canvas Background Color
fillStyle = "rgba(0,0,0,0)";

// Audio Variables
var audio = document.getElementById("audio-element");
audio.load();

//  var audioContext = new AudioContext();
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var src = audioContext.createMediaElementSource(audio);
console.log("Audio: " + audio.src);

// Analyzer Variables
var id;
var analyzer = audioContext.createAnalyser();
var freqArray = new Uint8Array(analyzer.frequencyBinCount);
src.connect(analyzer);
analyzer.connect(audioContext.destination);
analyzer.fftSize = 128;

// Visualizer Variables
var barHeight = 5;
var barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
var x, y, x2, y2;
var g, b;
var r = 28;

renderBarVisualizer();

// Render Visualizer
// function renderBarVisualizer() {
//   id = requestAnimationFrame(renderBarVisualizer);
//   analyzer.getByteFrequencyData(freqArray);
//   canvasContext.clearRect(0, 0, canvas.width, canvas.height)

//   drawBaseCanvas();

//   x = canvas.width / 2;
//   x2 = x;

//   for (var i = 0; i < analyzer.frequencyBinCount; i++) {
//     barHeight = freqArray[i] + 5;

//     setCanvasColor(i, barHeight);
//     canvasContext.fillRect(
//       x,
//       (canvas.height - barHeight * 2.5) / 2,
//       barWidth,
//       barHeight * 2.5
//     );
//     canvasContext.fillRect(
//       x2,
//       (canvas.height - barHeight * 2.5) / 2,
//       barWidth,
//       barHeight * 2.5
//     );

//     x += barWidth + 1;
//     x2 -= barWidth + 1;
//   }
// }
function renderCircleVisualizer() {

    id = requestAnimationFrame(renderCircleVisualizer);
    analyzer.getByteFrequencyData(freqArray);

    var center_x = canvas.width / 2;
    var center_y = canvas.height / 2;
    var radius = 400;
    var bars = 200;
    var rads;

    drawBaseCanvas();

    for (var i = 0; i < bars; i++) {
        rads = Math.PI * 2 / bars;
        barHeight = freqArray[i] / 2 + 5;

        x = center_x + Math.cos(rads * i) * (radius - barHeight);
        y = center_y + Math.sin(rads * i) * (radius - barHeight);
        x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
        y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

        setCanvasColor(i,barHeight);
        canvasContext.lineWidth = barWidth;
        drawBar(x,y,x2,y2);
    }

    bars = bars * 2;
    for (var i = 0; i < bars; i++) {
        radius = 800
        rads = Math.PI * 2 / bars;
        barHeight = freqArray[i];

        x = center_x + Math.cos(rads * i) * (radius - barHeight);
        y = center_y + Math.sin(rads * i) * (radius - barHeight);
        x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
        y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

        setCanvasColor(i,barHeight);
        canvasContext.lineWidth = barWidth;
        drawBar(x,y,x2,y2);

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
  canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  canvasContext.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
}

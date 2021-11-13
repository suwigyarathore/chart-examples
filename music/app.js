let sourceConnected = false;
var audioCtx;
var audioElement;
var audioSrc;
var analyser;
var bufferSize;
var frequencyData;

var h = (window.innerHeight - 100) / 2,
  w = window.innerWidth - 10;

var colorScale = d3
  .scaleLinear()
  .domain([0, 150])
  .range(["#2c7bb6", "#d7191c"]);

const connnectSource = () => {
  if (!sourceConnected) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioElement = document.getElementById("audioElement");
    audioSrc = audioCtx.createMediaElementSource(audioElement);
    analyser = audioCtx.createAnalyser();
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);
    bufferSize = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(bufferSize);
    analyser.getByteFrequencyData(frequencyData);
    sourceConnected = true;
  }
};

function processChart() {
  connnectSource();
  var circleX = d3
    .scaleLinear()
    .domain([0, frequencyData.length])
    .range([0, w]);

  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  svg
    .selectAll("circle")
    .data(frequencyData)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return w / frequencyData.length / 2 + 0.3;
    })
    .attr("cx", function (d, i) {
      return circleX(i);
    })
    .attr("cy", function (d) {
      return h / 2 - d;
    })
    .attr("fill", function (d, i) {
      return colorScale(d);
    });

  function drawChart() {
    requestAnimationFrame(drawChart);
    analyser.getByteFrequencyData(frequencyData);

    svg
      .selectAll("circle")
      .data(frequencyData)
      .attr("cy", function (d) {
        return h / 2 - d;
      })
      .attr("fill", function (d, i) {
        return colorScale(d);
      });
  }
  drawChart();
}

function processChart2() {
  connnectSource();
  var barPadding = "1";
  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  svg
    .selectAll("rect")
    .data(frequencyData)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * (w / frequencyData.length);
    })
    .attr("width", w / frequencyData.length - barPadding);

  function drawChart() {
    requestAnimationFrame(drawChart);
    analyser.getByteFrequencyData(frequencyData);

    svg
      .selectAll("rect")
      .data(frequencyData)
      .attr("y", function (d) {
        return h - d;
      })
      .attr("height", function (d) {
        return d;
      })
      .attr("fill", function (d, i) {
        return colorScale(d);
      });
  }
  drawChart();
}

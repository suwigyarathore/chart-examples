// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3
  .select("#scatter-line")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const timeFormatter = d3.timeFormat("%Y-%b-%d");

const url =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv";

d3.csv(url, formatData, createChart);

function formatData({ date, value }) {
  return { date: timeFormatter(new Date(date)), value: +value };
}

function createChart(data) {
  console.log(data);
}

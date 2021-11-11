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

const url =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv";

d3.csv(url, formatData, createChart);

function formatData({ date, value }) {
  return { date: new Date(date), value: +value };
}

function createChart(data) {
  const { x, y } = creatingAxis(data);
  createPoints(data, x, y);
  createLine(data, x, y);
}

function creatingAxis(data) {
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, ({ date }) => new Date(date)))
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, ({ value }) => value))
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  return {
    x,
    y,
  };
}

function createPoints(data, x, y) {
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "myCircle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .transition()
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 2)
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 3)
    .attr("fill", "white");
}

function createLine(data, x, y) {
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .curve(d3.curveBasis) // Just add that to have a curve instead of segments
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.value);
        })
    );
}

function createTooltip() {
  var Tooltip = d3
    .select("#scatter-line")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");
  return Tooltip;
}

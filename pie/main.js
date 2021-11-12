var width = 450;
height = 450;
margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3
  .select("#pie-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet2);

//The pie generator does not produce a shape directly,
//but instead computes the necessary angles to represent a tabular dataset as a pie or donut chart;
//these angles can then be passed to an arc generator.

var pie = d3.pie().value(function (d) {
  return d.value;
});
var data_ready = pie(d3.entries(data));

var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

svg
  .selectAll("mySlices")
  .data(data_ready)
  .enter()
  .append("path")
  .attr("d", arcGenerator)
  .attr("fill", function (d) {
    return color(d.data.key);
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

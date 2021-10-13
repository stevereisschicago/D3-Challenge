// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 400;

// Define the chart's margins as an object
var margin = {
  top: 40,
  right: 40,
  bottom: 60,
  left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append a group area, then set its margins
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from csv
d3.csv("./assets/data/data.csv").then(function(usCensusData) {

// Print data to check
    console.log(usCensusData);

// Format data and convert to numbers 
    usCensusData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
    });

  // Set the xlinearScale function
  var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain(d3.extent(usCensusData, data => data.obesity));

  // Set the yLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    //.domain([0, d3.max(usCensusData, data => data.income)]);  NOTE: also an option to show full range
    .domain(d3.extent(usCensusData, data => data.income)); 

// Create two axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

// Add axes to chartGroup
    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis)

    var yAxis = chartGroup.append("g")
        .call(leftAxis)

// Create circles
 chartGroup.selectAll("circle")
    .data(usCensusData)
    .enter()
    .append("circle")
    .attr("stroke","black")
    .attr("stroke-width",1)
    .attr("cx",function (data) { return xLinearScale(data.obesity) })
    .attr("cy",function (data) { return yLinearScale(data.income) })
    .attr("r",10)
    .attr("fill-opacity", 0.05)

// Create text for circles
chartGroup.selectAll()
    .data(usCensusData)
    .enter()
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", "7")
    .attr ("x", function (data) { return xLinearScale(data.obesity) -4 } )
    .attr ("y", function (data) { return yLinearScale(data.income) +2 })
    .text(function (data) { return data.abbr })

// Create labels for X and Y
chartGroup.append("text")
    .attr("class", "axisText")
    .attr("transform", `rotate(-90)`)
    .attr("y", 0 - margin.left + 20)
    .attr ("x", 0 - chartHeight/1.2)
    .text("Household Income (Median)")

chartGroup.append("text")
    .attr("class", "axisText")
    .attr("y", chartHeight + 40)
    .attr ("x", chartWidth/2 - 40)
    .text("Obesity (%)")

}).catch(function(error) {
    console.log(error);
});

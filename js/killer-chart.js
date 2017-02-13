var width = 500,
  height = 500;

var svg = d3.select("#killer-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("killer-data.json"), function(json) {
  var data = json.items;

  console.log(data[0]);

}
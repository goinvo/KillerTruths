var margin = {top: 20, right: 20, bottom: 50, left: 100},
    width = parseInt(d3.select("#killer-chart").style("width")) - margin.left - margin.right;
var barHeight = 40;
var mobile_threshold = 500;

d3.json("data/killer-data.json", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.name = d.name;
        d.description = d.description;
        d.value = +d.value;
    });
    console.log(data[0].name)

    var height = barHeight * data.length;

    var formatNum = d3.format("0,000");

    data.forEach(function(d, i) { 
      max = d3.max(d.value);
      min = d3.min(d.value);
    });

    console.log(d3.max(d.value));

    var barWidth = width * 6;

    var x = d3.scale.linear()
        .domain([0, max/1000])
        .range([0, width]);
    //var y = d3.scale.linear().range([height, 0]);

    var chart = d3.select('#killer-chart').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr('height', height);

    var bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0,' + barHeight * i + ')';
        });

    /*bar.append('rect')
        .attr('class', 'bar')
        .attr('width', function(d){
            return d.value / 5100;
        })
        .attr('height', barHeight);

    bar.append('text')
        .attr('class', 'value')
        .attr('x', 80)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d){
            return d.value;
        });

    bar.append('text')
        .attr('class', 'name')
        .attr('x', 100)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d){
            return d.name;
        });*/

    bar.append('rect')
        .attr('class', 'bar')
        .attr('x', 290)
        .attr('y', barHeight / 2.5)
        .attr('width', function(d){
            return d.value / barWidth;
        })
        .attr('height', barHeight);

    bar.append('text')
        .attr('class', 'value')
        .attr('x', 215)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d){
            return formatNum(d.value);
        });

    bar.append('text')
        .attr('class', 'name')
        .attr('x', 200)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d){
            return d.name;
        });

    function resize() {
      console.log("resizing");
      var width = parseInt(d3.select("#killer-chart").style("width")) - margin.left - margin.right;

      // Update the range of the scale with new width/height
      x.range([0, width]);
      console.log(width);
      // Force D3 to recalculate and update the line
        bar.attr("width", function(d){
            return d.value / barWidth;
        });
    };

    // Call the resize function whenever a resize event occurs
    d3.select(window).on('resize', resize);

    // Call the resize function
    resize();
});
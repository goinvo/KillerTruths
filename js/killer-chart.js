d3.json("data/killer-data.json", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.name = d.name;
        d.description = d.description;
        d.value = +d.value;
    });
    console.log(data[0].name)

    var width = parseInt(d3.select('#killer-chart').style('width'), 10);
    var barHeight = 40;
    var height = barHeight * data.length;

    data.forEach(function(d, i) { 
      max = d3.max(d.value);
      min = d3.min(d.value);
    });

    var x = d3.scale.linear()
        .domain([0, max/1000])
        .range([0, width]);
    //var y = d3.scale.linear().range([height, 0]);

    var chart = d3.select('#killer-chart').append("svg")
        .attr('width', width)
        .attr('height', height);

    var bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0,' + barHeight * i + ')';
        });

    bar.append('rect')
        .attr('class', 'bar')
        .attr('width', function(d){
            return d.value / 5500;
        })
        .attr('height', barHeight -1);

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
        });

    d3.select(window).on('resize', resize); 

    function resize() {
        console.log("resizing");
        // update width
        width = parseInt(d3.select('#killer-chart').style('width'), 10);

        // resize the chart
        d3.select(chart.node().parentNode)
            .style('width', (width) + 'px');
    }
});
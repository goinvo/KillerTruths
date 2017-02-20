var margin = {top: 20, right: 20, bottom: 50, left: 300},
    width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right;
var barHeight = 40;
var mobileThreshold = 550;

d3.json('data/killer-data.json', function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.name = d.name;
        d.description = d.description;
        d.value = +d.value;
    });
    console.log(data[0].name);

    var height = barHeight * data.length;

    var formatNum = d3.format('0,000');

    data.forEach(function(d, i) { 
      max = d3.max(data, function(d) {return d.value;});
      min = d3.min(data, function(d) {return d.value;});
    });
    console.log(max);
    console.log(min);

    //var barWidth = width * 6;

    var x = d3.scale.linear()
        .domain([0, max])
        .range([0, width]);
    //var y = d3.scale.linear().range([height, 0]);

    var chart = d3.select('#killer-chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height);

    var bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0,' + barHeight * i + ')';
        });

    function desktopSize() {
            //styles for desktop - scale this
        bar.append('rect')
            .attr('class', 'bar')
            .attr('x', 290)
            .attr('y', barHeight / 2.5)
            .attr('width', function(d){
                return x(d.value);
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
    };

    function mobileSize() {
        //blow away initial chart if one exists
        d3.select('#killer-chart').empty();

        //reset width and xScale
        var margin = {top: 0, right: 0, bottom: 0, left: 0}
            width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right;

        var x = d3.scale.linear()
            .domain([0, max])
            .range([0, width]);

        /*apply class for mobile sizes, so there 
            are no awkward transitions when resizing*/
        chart.attr('class', 'mobile');

        //redraw chart for mobile
        bar.append('rect')
            .attr('class', 'bar')
            .attr('width', function(d){
                return x(d.value);
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
            });
    };

        // Define responsive behavior
    function resize() {
        var width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right;
      
        x.range([0, width]);

        bar.selectAll('rect')
            .attr('width', function(d) { return x(d.value); });
    };

    // draw a desktop chart unless the window size is below 550px
    if (window.innerWidth < mobileThreshold) {
        mobileSize();
    } else {
        desktopSize();
        d3.select(window).on('resize', resize);
        resize();
    }

});
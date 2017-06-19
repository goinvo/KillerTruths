d3.json('data/killer-data.json', function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.name = d.name;
        d.description = d.description;
        d.value = +d.value;
        d.cost = +d.cost;
    });
    console.log(data[0].name);

    var barHeight = 40;
    var height = barHeight * data.length;
    var mobileThreshold = 700;

    var formatNum = d3.format('0,000');

    data.forEach(function(d, i) { 
      max = d3.max(data, function(d) {return d.value;});
      min = d3.min(data, function(d) {return d.value;});
      costMax = d3.max(data, function(d) {return d.cost;});
      costMin = d3.min(data, function(d) {return d.cost;});
    });
    console.log(max);
    console.log(min);
    console.log(costMax);
    console.log(costMin);

    var x = d3.scale.linear()
            .domain([0, max]);

    var chart = d3.select('#killer-chart').append('svg')
        .attr('height', height);

    var bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0,' + barHeight * i + ')';
        });

    var costX = d3.scale.linear()
            .domain([0, costMax]);

    var costChart = d3.select('#killer-cost').append('svg')
        .attr('height', height);

    var costBar = costChart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0,' + barHeight * i + ')';
        });

    function desktopSize() {
        var margin = {top: 0, right: 0, bottom: 0, left: 300},
            width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right,
            costMargin = {top: 0, right: 0, bottom: 0, left: 65},
            costWidth = parseInt(d3.select('#killer-cost').style('width')) - costMargin.left - costMargin.right;
        
        x.range([0, width]);

        chart.attr('width', width + margin.left + margin.right);

        //styles for desktop, killer-chart
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
            .attr('x', 275)
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

        //styles for desktop, killer-cost
        costX.range([0, costWidth]);

        costChart.attr('width', costWidth + costMargin.left + costMargin.right);

        costBar.append('rect')
            .attr('class', 'bar')
            .attr('x', 65)
            .attr('y', barHeight / 2.5)
            .attr('width', function(d){
                return costX(d.cost);
            })
            .attr('height', barHeight);

        costBar.append('text')
            .attr('class', 'value')
            .attr('x', 50)
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(function(d){
                return '$' + formatNum(d.cost);
            });
    };

    function mobileSize() {
        //blow away initial chart if one exists
        d3.select('#killer-chart').empty();
        d3.select('#killer-cost').empty();

        //reset width and xScale
        var width = parseInt(d3.select('#killer-chart').style('width')),
            costWidth = parseInt(d3.select('#killer-cost').style('width'));

        x.range([0, width]);

        /*apply class for mobile sizes, so there 
            are no awkward transitions when resizing*/
        chart.attr('class', 'mobile')
            .attr('width', width);

        //redraw chart for mobile, killer-chart
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
                return formatNum(d.value);
            });

        bar.append('text')
            .attr('class', 'name')
            .attr('x', 100)
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(function(d){
                return d.name;
            });

        //redraw chart for mobile, killer-cost
        costX.range([0, costWidth]);

        /*apply class for mobile sizes, so there 
            are no awkward transitions when resizing*/
        costChart.attr('class', 'mobile')
            .attr('width', costWidth);

        costBar.append('rect')
            .attr('class', 'bar')
            .attr('width', function(d){
                return costX(d.cost);
            })
            .attr('height', barHeight);

        costBar.append('text')
            .attr('class', 'value')
            .attr('x', 80)
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(function(d){
                return '$' + formatNum(d.cost);
            });
    };

        // Define responsive behavior
    function resize() {
        var margin = {top: 20, right: 20, bottom: 50, left: 300},
            width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right,
            costWidth = parseInt(d3.select('#killer-cost').style('width')) - margin.left - margin.right;
        
        //killer-chart resize
        x.range([0, width]);

        chart.attr('width', width + margin.left + margin.right);

        bar.selectAll('rect')
            .attr('width', function(d) { return x(d.value); });

        //killer-cost resize
        costX.range([0, costWidth]);

        costChart.attr('width', costWidth + margin.left + margin.right);

        costBar.selectAll('rect')
            .attr('width', function(d) { return costX(d.cost); });
    };

    function mobileResize() {
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = parseInt(d3.select('#killer-chart').style('width')) - margin.left - margin.right,
            costWidth = parseInt(d3.select('#killer-cost').style('width')) - margin.left - margin.right;
        
        //killer-chart resize
        x.range([0, width]);

        chart.attr('width', width);

        bar.selectAll('rect')
            .attr('width', function(d) { return x(d.value); });

        //killer-cost resize
        costX.range([0, costWidth]);

        costChart.attr('width', costWidth);

        costBar.selectAll('rect')
            .attr('width', function(d) { return costX(d.cost); });
    };


    // draw a desktop chart unless the window size is below 550px
    if (window.innerWidth < mobileThreshold) {
        mobileSize();
        d3.select(window).on('resize', mobileResize);
        mobileResize();
    } else {
        desktopSize();
        d3.select(window).on('resize', resize);
        resize();
    }

});
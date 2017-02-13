d3.json("data/killer-data.json", function(json) {
  var data = json.items;

  console.log(data[0].name);

});
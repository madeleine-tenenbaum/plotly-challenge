  //CREATE DROPDOWN BOX


d3.json("data/samples.json").then((data) => {
    var sampleOptions = data.names;
    //console.log(sampleOptions)

      //Add the Options to the DropDownList.
    for (var i = 0; i < sampleOptions.length; i++) {
      var option = document.createElement("OPTION");
 
      //Set Customer Name in Text part.
      option.innerHTML = sampleOptions[i];
 
      //Set CustomerId in Value part.
      option.value = sampleOptions[i];
 
      //Add the Option element to DropDownList.
      document.getElementById("selDataset").options.add(option);
    }
});




// CREATE HORIZONTAL BAR CHART
/**
/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - sample_values
 * index 3 - otu_labels
 */


function init() {
// read in data
  d3.json("data/samples.json").then((importedData => {

    //define variables
    var sample = importedData.samples[0].id
    var sampleData= importedData.samples[0].sample_values
    var sampleLabels = importedData.samples[0].otu_ids
    console.log(sampleData);

    //sort and slice
    sampleData.sort(function(a,b){
      return parseFloat(b.sample_values)-parseFloat(a.sample_values);
    });
    filteredData = sampleData.slice(0,10);
    filteredData = filteredData.reverse();
    console.log(filteredData);

    sampleLabels.sort(function(a,b){
      return (b.sample_values)-(a.sample_values);
    });
    filteredLabels = sampleLabels.slice(0,10);
    filteredLabels = filteredLabels.reverse();
    console.log(filteredLabels);
  

      //  Create the Traces
      var trace1 = {
        x: filteredData,
        y: filteredLabels,
        type: "bar",
        orientation: "h",
        title: sample, 
      };
    
      // Create the data array for the plot
      var datatrace1 = [trace1];
    
      // Define the plot layout
      var layout = {
        xaxis: { title: "Sample values"},
        yaxis: { title: "OTU IDs"},
    
      };
    
      // Plot the chart to a div tag with id "bar"
      Plotly.newPlot("bar", datatrace1, layout);
    
    }));
  };



// POPULATE TABLE


function table() {
  // read in data
    d3.json("data/samples.json").then((importedData => {
      var meta = importedData.metadata
      var panel = d3.select("panel-body");

      meta.forEach((line) => {
        var row = panel.append("li");
        Object.entries(line).forEach(([key, value]) => {
         var cell = row.append("li");
          cell.text(value);
        });
      });
    }));
};




//UPDATE BAR CHART

 // This function is called when a dropdown menu item is selected
 function updatePlotly() {
   // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // read in data
  d3.json("data/samples.json").then(importedData => {
    var sample = importedData.samples
    for (var i = 0; i < sample.length; i++)
      if (dataset === importedData.samples[i].id)
      then:
        var sample = importedData.samples[i].id
        var sampleData= importedData.samples[i].sample_values
        var sampleLabels = importedData.samples[i].otu_ids
        console.log(sampleData);

      //sort and slice
      sampleData.sort(function(a,b){
       return parseFloat(b.sample_values)-parseFloat(a.sample_values);
      });
      filteredData = sampleData.slice(0,10);
      filteredData = filteredData.reverse();
      console.log(filteredData);

      sampleLabels.sort(function(a,b){
       return (b.sample_values)-(a.sample_values);
      });
      filteredLabels = sampleLabels.slice(0,10);
      filteredLabels = filteredLabels.reverse();
      console.log(filteredLabels);

      });
  // Initialize x and y arrays
    var x = [];
    var y = [];

    x = filteredData;
    y = filteredLabels;


   // Note the extra brackets around 'x' and 'y'
   Plotly.restyle("plot", "x", [x]);
   Plotly.restyle("plot", "y", [y]);
 }

 init();


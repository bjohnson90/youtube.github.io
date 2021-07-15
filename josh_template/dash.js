// Function for change on dropdown menu
function optionChanged(selectID){

  // Check if value is selected in dropdown
  console.log(selectID);

  // Read the json file for the data
  d3.csv("josh_template/dash.csv").then(function(video_data) {
    console.log(video_data);
    
  // Clears dropdown
  d3.select("#selDataset").html("");   
  
  // Select video data and for each item append the video ID and adds ID to dropdown
  video_data.forEach(function(data) {
       d3.select ("#selDataset").append('option').attr('value', data.video_id).text(data.video_id);
       });

  // Selected value is passed
  d3.select("#selDataset").node().value = selectID;
  
  // Filter video data for selected ID from dropdown
  const dropdown_data = video_data.filter(data=> (data.video_id == selectID));

  console.log(dropdown_data);
  
  const panelDisplay = d3.select("#sample-metadata");
  panelDisplay.html("");
  Object.entries(dropdown_data[0]).forEach(data=> 
     {
        // console.log(item);
        panelDisplay.append("p").text(`${data[0]}: ${data[1]}`)
     });

  // // BAR CHART

  const barDisplay = d3.select("#bar");
  barDisplay.html(""); 

  const trace = {
    y: dropdown_data[0].video_id,
    x: dropdown_data[0].likes,
    type: 'bar',
   //  orientation: "h",
   //  text:  otu_labels,
   //  marker: {
   //     color: 'green',
   //     line: {
   //        width: 3
   //    }
   //   }
    },
    layout = {
    title: 'Top 10 OTUs found per Individual',
    xaxis: {title: '# of Samples Collected'},
    yaxis: {title: 'OTU ID'}
    };

    // Plot using Plotly
    Plotly.newPlot('bar', [trace], layout);    
     
// // BUBBLE CHART

// // Remove Sample value and otuID from individual
// var sampleValue1 = sample_id[0].sample_values;
// var otuID= sample_id[0].otu_ids;

// // Define the layout and trace object, edit color and orientation
// var trace1 = {
//   x: otuID,
//   y: sampleValue1,
//   mode: 'markers',
//   marker: {
//     color: 'blue',
    
//     size: sampleValue1
//   }
// },

// layout1 = {
//   title: 'Bubble Chart For Each Sample',
//   xaxis: {title: 'OTU ID'},
//   yaxis: {title: '# of Samples Collected'},
//   showlegend: false,
//   height: 800,
//   width: 1800
//   };
  
// // Plot using Plotly
// Plotly.newPlot('bubble', [trace1], layout1);

// GAUGE CHART

// Gauge Chart to plot likes 
const guageDisplay = d3.select("#gauge");
guageDisplay.html(""); 

var washes = dropdown_data[0].likes;

var guage_data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: washes,
    title: { text: "<b>Video Likes" },
    type: "indicator",
    mode: "gauge+number",     
     gauge: {
     axis: { range: [0,50000] },
     bar: { color: "green" },
     steps: [
        { range: [0, 1000], color: "#e5d5d0" },
        { range: [1000, 2000], color: "#dbc7c2" },
        { range: [2000, 3000], color: "#d2b9b4" },
        { range: [3000, 4000], color: "#c9ada7" },
        { range: [4000, 5000], color: "#ac9899" },
        { range: [5000, 6000], color: "#8a7e88" },
        { range: [6000, 10000], color: "#7d7482" },
        { range: [10000, 20000], color: "#706a7b" },
        { range: [20000, 50000], color: "#4a4e69" }
              
      ],
     threshold: {
        value: washes
      }
    }
  }
]; 
const gaugeLayout = {  width: 600, 
                 height: 400, 
                 margin: { t: 0, b: 0 }, 
                  };

// Plot using Plotly
Plotly.newPlot('gauge', guage_data, gaugeLayout); 

});
}

// Initial test starts blank
optionChanged();

// Event on change takes the value and calls the function during dropdown selection
d3.select("#selDataset").on('change',() => {
optionChanged(d3.event.target.value);

});
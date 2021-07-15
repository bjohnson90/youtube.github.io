d3.csv("Bobby_template/USsum_withCat.csv").then(function (usdata){
  d3.csv("Bobby_template/GBsum_withCat.csv").then(function(gbdata){
    //console.log(usdata)
    //console.log(gbdata)
    var category = usdata.map(data => data.category);
    //console.log(category)
    
    label = category
    console.log(label)
    //var gbval = [];
    //for (var i in gbdata) {
      //gbval.push(gbdata[i]);
    //}
    var usval = usdata.map(data => data.views);
    var gbval = gbdata.map(d => d.views);
    console.log(usval)
    console.log(gbval)
    
    //console.log(gbval)
    //var usval = [];
    //for (var i in usdata) {
      //usval.push(usdata[i]);
    //}
    //console.log(usval)
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
          labels: label,
          datasets: [
              {
                  label: "Great Britain",
                  backgroundColor: "blue",
                  data: gbval
                  
              },
              {
                  label: "United States",
                  backgroundColor: "red",
                  data: usval
              }
          ]
      },
      options: {
          legend: { display: true },
          indexAxis:'y',
          title: {
              display: true,
              text: 'Average Views per Category'
          }

          
      }
  });
  


  });
});

// d3.csv("USsum_withCat.csv").then(function (usdata){
//   console.log(usdata)
// })
  



// async function get() {
//   try {
//     const res = await fetch ("http://127.0.0.1:5000/UScat")
//     const json = await res.json();
//     console.log('json',json)
//   } catch(err){
//     console.error('err',err);
//   }

// }
// get();
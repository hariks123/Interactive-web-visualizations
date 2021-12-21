//Function to render Gauze
function Gauze(SampleID) {
    d3.json("samples.json").then(data => { //Read Samples Json
      const metadata=data.metadata
      let filteredmetadata=metadata.filter(s => s.id == SampleID)[0] //Filter for Selected ID
      //Wash Frequency data
      let wfreq = parseInt(filteredmetadata.wfreq)
      //Define data for Gauze
      var gdata=[{
        domain: { x: [0, 1], y: [0, 1] },
        value:wfreq,
        title:'<h4> Belly Button Washing Frequency</h4> <br>Scrubs Per Week',
        type:'indicator',
        mode:'gauge+number',
        gauge:{
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
            steps: [
                { range: [0, 1], color: "antiquewhite" },
                { range: [1, 2], color: "antiquewhite" },
                { range: [2, 3], color: "darkgray" },
                { range: [3, 4], color: "lightcyan" },
                { range: [4, 5], color: "azure" },
                { range: [5, 6], color: "lightgreen" },
                { range: [6, 7], color: "mediumseagreen" },
                { range: [7, 8], color: "mediumseagreen" },
                { range: [8, 9], color: "mediumseagreen" },
              ],
        }
    }]
    //Define Layout for Gauze
    var glayout={ width: 600, height: 450, margin: { t: 0, b: 0 },name:'Scrubs per Week' }
    Plotly.newPlot("gauge",gdata,glayout)
  
    })
  } 

  

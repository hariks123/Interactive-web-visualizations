
//Create Charts function
function Charts(SampleID) {
    d3.json("samples.json").then(data => { //read samples json data
        const samples=data.samples
        let filteredsample=samples.filter(s => s.id == SampleID)[0] //Filter for user selected ID
        //Get all OTU_IDs for user selected ID
        let ids=filteredsample.otu_ids //Get all OTU_IDs
        //Get all Sample Values for user selected ID
        let sample_values=filteredsample.sample_values
        //Get all labels for user selected ID
        let otu_labels=filteredsample.otu_labels
       //create a list by appending OTU to IDs, for bar chart. Get first 10 values
        let otu_ids= ids.slice(0,10).map(i=> `OTU ${i}`) 
        //define data for horizontal bar chart
        let hdata=[{
            y:otu_ids.slice(0,10).reverse(), //get to 10 IDs in order
            x:sample_values.slice(0,10).reverse(),//get to 10 sample values in order
            type:'bar',
            orientation:'h',
            text:otu_labels.slice(0,10).reverse() //get to 10 sample labels in order
        }]
        //Define bar chart layout
        let hlayout= {
            width:400,
            height:550,
            title:"Top 10 Belly Button Bacteria"
        }
        Plotly.newPlot("bar",hdata,hlayout)

        //define data for Bubble chart
        let bdata=[{
            x:ids,
            y:sample_values,
            mode:'markers',
            marker:{
                size:sample_values,
                color:ids,
                colorscale:"Earth"
            },
            text:otu_labels
        }]
        //define layout for bubble chart
        let blayout={
            xaxis:{title:'OTU ID'},
            title:"Bacteria Cultures Per Sample",
            hovermode:"closest"
            //height:600,
            //width:1000
        }
     Plotly.newPlot("bubble",bdata,blayout)
    })

}

//Add Demogrpahic details in the table
function DemoGraphicInfo(SampleID) {
    let sdata= d3.json("samples.json").then(data => { //Read Samples Json Data
        const metadata=data.metadata
        let filteredmetadata=metadata.filter(s => s.id == SampleID)[0] //Filter data for User Selected ID
        //Select ID of the HTML table where data needs to be displayed
        let DemoTable=d3.select("#sample-metadata")
        DemoTable.html(" ")  //Reset Table data to Blank
        Object.entries(filteredmetadata).forEach((key) => { //Populate Key value pair in the HTML table
            DemoTable.append("h5").text(`${key[0]} : ${key[1]} \n`)
        })
    })
}

//Create Function which captures users Choice and refrehses the display
function optionChanged(UserChoice) {
    console.log("MainApp",UserChoice) //Display user choice in the console
    Charts(UserChoice) //Function call to refresh charts
    DemoGraphicInfo(UserChoice) //Function call to refresh Demographic info
    Gauze(UserChoice) //Function call to refresh Gauze
}

//Create Intialization function
function init() {
    //Reads Json and populates TestSubject ID no. Dropdown
    d3.json("samples.json").then(data => {
        const names=data.names //Read Names i.e IDs from Jsoninto 
    var dropdown=d3.select("#selDataset") //Select Dropown HTML ID
    //Add Each name(ID) in the list to the dropdown
    names.forEach(name => {
        dropdown.append('option').text(name).property('value',name)
        });
    let DefaultId = names[0] //Capture the 1st value in the list that is displayed
    Charts(DefaultId) //Function call for charts for the 1st value in the list
    DemoGraphicInfo(DefaultId) //Function call for Demographic details for the 1st value in the list
    Gauze(DefaultId) //Function Call for Hauze
     })
}

init() //Call Intialization Function
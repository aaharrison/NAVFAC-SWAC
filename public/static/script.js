
// Intially Plot Variable Values
var water = 42;
var mrt = "Base";
var wind = "Base";
var met = "Base";
var clo = "Base";
var Window = "Closed";
var ceiling = "Off";
var hvac = "No";
var roof = "No";
var motion = "No";
var ac = "No";
var room = "B23-104B";
var setpoint = 0;

// Add Water Temp to text in index.html page
document.getElementsByClassName("water")[0].innerHTML = water + "°F"
document.getElementsByClassName("water")[1].innerHTML = water + "°F"
document.getElementsByClassName("water")[2].innerHTML = water + "°F"
document.getElementsByClassName("water")[3].innerHTML = water + "°F"
document.getElementsByClassName("water")[4].innerHTML = water + "°F"
document.getElementsByClassName("water")[5].innerHTML = water + "°F"
document.getElementsByClassName("water")[6].innerHTML = water + "°F"
document.getElementsByClassName("water")[7].innerHTML = water + "°F"
document.getElementsByClassName("water")[8].innerHTML = water + "°F"
document.getElementsByClassName("water")[9].innerHTML = water + "°F"
document.getElementsByClassName("water")[10].innerHTML = water + "°F"
document.getElementsByClassName("water")[11].innerHTML = water + "°F"
document.getElementsByClassName("water")[12].innerHTML = water + "°F"

// Function to Close and Unfurl the Intro Text
function introText() {
	var x = document.getElementById("introText")
	if (x.style.display === 'block') {
		x.style.display = 'none'
		document.getElementById("introArrow").src = "https://image.flaticon.com/icons/svg/24/24567.svg"
	} else {
		x.style.display = 'block'
		document.getElementById("introArrow").src = "http://freevector.co/wp-content/uploads/2014/07/23714-arrow-pointing-up-inside-a-circle-outline1.png"
	}
}

// Function to Close and Unfurl the Reference List
function referenceText() {
	var x = document.getElementById("referenceText")
	if (x.style.display === 'block') {
		x.style.display = 'none'
		document.getElementById("referenceArrow").src = "https://image.flaticon.com/icons/svg/24/24567.svg"
	} else {
		x.style.display = 'block'
		document.getElementById("referenceArrow").src = "http://freevector.co/wp-content/uploads/2014/07/23714-arrow-pointing-up-inside-a-circle-outline1.png"
	}
}

// Function to Close and Unfurl the Percentage of Time Matrix Table in Metric Column
function timeMatrix() {
	var x = document.getElementById("Thermal Quality Percentage Table")
	if (x.style.display === "block") {
		x.style.display = "none"
		document.getElementById("timeArrow").src = "https://image.flaticon.com/icons/svg/24/24567.svg"
	} else {
		x.style.display = "block"
		document.getElementById("timeArrow").src = "http://freevector.co/wp-content/uploads/2014/07/23714-arrow-pointing-up-inside-a-circle-outline1.png"
	}
}

// Function to Close and Unfurl the Comfort Delivered per Unit of Energy Table in Metric Column
function energyPMVMatrix() {
	var x = document.getElementById("Thermal Quality by Energy Use")
	if (x.style.display === "block"){
		x.style.display = "none"
		document.getElementById("energyPMVArrow").src = "https://image.flaticon.com/icons/svg/24/24567.svg"
	} else {
		x.style.display = "block"
		document.getElementById("energyPMVArrow").src = "http://freevector.co/wp-content/uploads/2014/07/23714-arrow-pointing-up-inside-a-circle-outline1.png"
	}
}

// Function to Close and Unfurl the Energy Usage Table in Metric Column
function energyMatrix() {
	var x = document.getElementById("Energy Use Table")
	if (x.style.display === "block") {
		x.style.display = "none"
		document.getElementById("energyArrow").src = "https://image.flaticon.com/icons/svg/24/24567.svg"
	} else {
		x.style.display = "block"
		document.getElementById("energyArrow").src = "http://freevector.co/wp-content/uploads/2014/07/23714-arrow-pointing-up-inside-a-circle-outline1.png"
	}
}

// Display Set Point Slider Value
function sliderValue(x){
	if (x > 0) {
		document.getElementById("sliderValue").innerHTML = "+" + x 
	} else {
		document.getElementById("sliderValue").innerHTML = x 
	}
}


// Permissions for set point slider, only unlocked MRT is advanced and Passive Conditioning is No
function sliderPermission() {
	if (document.getElementById("mrtSelection1").checked == true){
		document.getElementById("setpointLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
		document.getElementById("setpointSlider").disabled = true;
		document.getElementById("setpointSlider").value = 0;
		document.getElementById("sliderValue").innerHTML = 0;}
	else if (document.getElementById("mrtSelection1").checked == false & document.getElementById("acSelection1").checked == true){
		document.getElementById("setpointLock").src = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698846-icon-119-lock-rounded-open-128.png"
		document.getElementById("setpointSlider").disabled = false;}
	else{
		document.getElementById("setpointLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
		document.getElementById("setpointSlider").disabled = true;
		document.getElementById("setpointSlider").value = 0;
		document.getElementById("sliderValue").innerHTML = 0;}
	}

// Initialize the slider Permission function
sliderPermission()

// Function to run on click of Air Speed Radio Buttons / Enable and Disable the Thermal Comfort Strategies
function windRadio(){
	if (document.getElementById('windSelection1').checked) {
  	wind = document.getElementById('windSelection1').value;
  	document.getElementById("windowSelection1").checked = true;
  	document.getElementById("ceilingSelection1").checked = true;
	}
	else if (document.getElementById('windSelection2').checked){
	wind = document.getElementById('windSelection2').value;
	}

	if (wind == "Base"){
		document.getElementById("windowSelection2").disabled = true
		document.getElementById("ceilingSelection2").disabled = true
		document.getElementById("windowLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
		document.getElementById("ceilingLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
	}
	else {
		document.getElementById("windowSelection2").disabled = false
		document.getElementById("ceilingSelection2").disabled = false
		document.getElementById("windowLock").src = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698846-icon-119-lock-rounded-open-128.png"
		document.getElementById("ceilingLock").src = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698846-icon-119-lock-rounded-open-128.png"
	}

}

// Function to run on click of Mean Radiant Temp Radio Buttons / Enable and Disable the Energy Reduction Measures
function mrtRadio(){
	if (document.getElementById('mrtSelection1').checked) {
  	mrt = document.getElementById('mrtSelection1').value;
  	document.getElementById("roofSelection1").checked = true;
  	document.getElementById("acSelection1").checked = true;
	}
	else if (document.getElementById('mrtSelection2').checked){
	mrt = document.getElementById('mrtSelection2').value;
	}

	if (mrt == "Base"){
		document.getElementById("roofSelection2").disabled = true
		document.getElementById("acSelection2").disabled = true
		document.getElementById("roofLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
		document.getElementById("acLock").src = "http://www.freeiconspng.com/uploads/lock-icon-17.png"
	}
	else {
		document.getElementById("roofSelection2").disabled = false
		document.getElementById("acSelection2").disabled = false
		document.getElementById("roofLock").src = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698846-icon-119-lock-rounded-open-128.png"
		document.getElementById("acLock").src = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698846-icon-119-lock-rounded-open-128.png"
	}
}

// Intialize enable/disable radio button functions
windRadio()
mrtRadio()

// Function to assign metadata labels of the selected parameters for the analysis
function labels() {
	if (room == "B23-104B") {
		roomLabel = "104B"; 
		typeLabel = "Bedroom"; 
		building = "Building 23"; 
		buildingLabel = "23";
	} else if (room == "B23-210B") { 
		roomLabel = "210B"; 
		typeLabel = "Bedroom"; 
		building = "Building 23"; 
		buildingLabel = "23" 
	} else if (room == "B23-LC") { 
		roomLabel = "LC"; 
		typeLabel = "Common Room"; 
		building = "Building 23"; 
		buildingLabel = "23" 
	}

	water = document.getElementById("waterSelection").value
}

// Initialize function for labels
labels()

// Creating SVG Canvas for D3

var height = 700
var width = 1000

var canvas = d3.select("#pmvVisualization")
 	.append("svg")
 	.attr("height", 1000)
 	.attr("width", 1000);

// Function to dynamically assign variables for filtering, grab variable values from html and create javascript variables

function run(){
	room = document.getElementById("roomSelection").value

	water = document.getElementById("waterSelection").value

	if (document.getElementById('mrtSelection1').checked) {
  	mrt = document.getElementById('mrtSelection1').value;
	}
	else if (document.getElementById('mrtSelection2').checked){
	mrt = document.getElementById('mrtSelection2').value;
	}

	if (document.getElementById('windSelection1').checked) {
  	wind = document.getElementById('windSelection1').value;
	}
	else if (document.getElementById('windSelection2').checked){
	wind = document.getElementById('windSelection2').value;
	}

	if (document.getElementById('metabolicSelection1').checked) {
  	met = document.getElementById('metabolicSelection1').value;
	}
	else if (document.getElementById('metabolicSelection2').checked){
	met = document.getElementById('metabolicSelection2').value;
	}

	if (document.getElementById('cloSelection1').checked) {
  	clo = document.getElementById('cloSelection1').value;
	}
	else if (document.getElementById('cloSelection2').checked){
	clo = document.getElementById('cloSelection2').value;
	}

	if (document.getElementById('windowSelection1').checked) {
  	Window = document.getElementById('windowSelection1').value;
	}
	else if (document.getElementById('windowSelection2').checked){
	Window = document.getElementById('windowSelection2').value;
	}

	if (document.getElementById('ceilingSelection1').checked) {
  	ceiling = document.getElementById('ceilingSelection1').value;
	}
	else if (document.getElementById('ceilingSelection2').checked){
	ceiling = document.getElementById('ceilingSelection2').value;
	}

	if (document.getElementById('roofSelection1').checked) {
  	roof = document.getElementById('roofSelection1').value;
	}
	else if (document.getElementById('roofSelection2').checked){
	roof = document.getElementById('roofSelection2').value;
	}

	if (document.getElementById('acSelection1').checked) {
  	ac = document.getElementById('acSelection1').value;
	}
	else if (document.getElementById('acSelection2').checked){
	ac = document.getElementById('acSelection2').value;
	}

};

// Send Variable Items and Thermal Comfort Strategies to rh1mod.py for SQL Query

var request = "/getData/?room=" + encodeURIComponent(room) + "&water_temp=" + encodeURIComponent(water) + "&mrt=" + encodeURIComponent(mrt) + "&wind=" + encodeURIComponent(wind) + 
	"&met=" + encodeURIComponent(met) + "&clo=" + encodeURIComponent(clo) + "&window=" + encodeURIComponent(Window) + "&ceiling=" + encodeURIComponent(ceiling) + 
	"&roof=" + encodeURIComponent(roof) + "&ac=" + encodeURIComponent(ac) + "&setpoint=" + encodeURIComponent(setpoint) + "&hvac=" + encodeURIComponent(hvac) + "&motion" + encodeURIComponent(motion)

// Read in csv from rh1mod.py

d3.csv(request, function(error, data) {
    if (error) throw error;
	data.forEach(function(d){
		d.air_speed= +d.air_speed
		d.clo_value= +d.clo_value
		d.metabolic_rate= +d.metabolic_rate
		d.mrt= +d.mrt
		d.energy_cost= +d.energy_cost
		d.kwh= +d.kwh
		d.relative_humidity= +d.relative_humidity
		d.sqft_percent= +d.sqft_percent
		d.water_temperature= +d.water_temperature
		d.base_kwh= +d.base_kwh
	})

	//Print to see the data came in correctly
    console.log(data[0]);


// Extreme variables set for scales of visualization and for metadata found in the input section

var minDate = d3.min(data,function(d){return d.date_time});
document.getElementById("startDate").innerHTML = d3.timeFormat("%B %d")(d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate))

var maxDate = d3.max(data,function(d){return d.date_time});
document.getElementById("endDate").innerHTML = d3.timeFormat("%B %d")(d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate))

// Creating the Scales, X Axis and Y Axis

xScale = d3.scaleTime()
	.domain([d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate), d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate)])
	.range([0,width-80]);

yScale = d3.scaleLinear()
	.domain([3, -3])
	.range([0, height-35]);

var xAxis = d3.axisBottom()
	.scale(xScale)
	.ticks(5)
	.tickSize(1)
	.tickSizeOuter(0)
	.tickSizeInner(-height+35)
	.tickPadding(15)
	.tickFormat(d3.timeFormat("%m/%d"));

var yAxis = d3.axisLeft()
	.scale(yScale)
	.ticks(5)
	.tickSize(5)
	.tickSizeInner(-width)
	.tickPadding(20)
	.tickFormat(d3.format('d'));

// Add X axis to canvas
var xAxis = canvas.append("g")
	.call(xAxis)
	.attr("transform", "translate(71,740)")
	.attr("id","xAxis");

// Add X axis label to the canvas
var xLabel = canvas.append("text")
	.attr("x",width/2)
	.attr("y",785)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",20)
	.text("Date");

// Add Y axis to canvas
var yAxis = canvas.append("g")
	.call(yAxis)
	.attr("transform","translate(70,75)")
	.attr("id","yAxis");

// Add Y axis labels to the canvas
var yLabel = canvas.append("text")
	.attr("transform", "translate(25,530) rotate(270)")
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",20)
	.text("Thermal Comfort (PMV)");

// Grey out PMV comfort Zone
var pmvZone = canvas.append("rect")
    .attr("id", "pmvZone")
    .attr("x", 70)
    .attr("y", 350)
    .attr("width", width)
    .attr("height", 115);

// Lightly Blue the area below comfort zone
var coldZone = canvas.append("rect")
	.attr("id", "coldZone")
	.attr("x", 70)
	.attr("y", 465)
	.attr("width", width)
	.attr("height", 275)

// Lightly Blue the area below comfort zone
var hotZone = canvas.append("rect")
	.attr("id", "hotZone")
	.attr("x", 70)
	.attr("y", 75)
	.attr("width", width)
	.attr("height", 275)

// Legend Values (Building, Location, Water Temperature, Location Type)
var buildingLegend = canvas.append("text")
	.attr("id", "buildingLegend")
	.attr("fill", "grey")
	.attr("x",70)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",15)
	.text("Building: ");

// Add the Building label to the canvas
var buildingValue = canvas.append("text")
	.attr("id", "buildingValue")
	.attr("fill", "#42a7ff")
	.attr("x",170)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text(buildingLabel);

var locationLegend = canvas.append("text")
	.attr("id", "locationLegend")
	.attr("fill", "grey")
	.attr("x",250)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",15)
	.text("Sensor Location: ");

// Add Location Label to the canvas
var locationValue = canvas.append("text")
	.attr("id", "locationValue")
	.attr("fill", "#42a7ff")
	.attr("x",415)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text(roomLabel);

var tempLegend = canvas.append("text")
	.attr("id", "tempLegend")
	.attr("fill", "grey")
	.attr("x",500)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",15)
	.text("Water Temperature: ");

// Add Water Temperature Label to canvas
var tempValue = canvas.append("text")
	.attr("id", "tempValue")
	.attr("fill", "#42a7ff")
	.attr("x",685)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text(water + "°F");

var typeLegend = canvas.append("text")
	.attr("id", "typeLegend")
	.attr("fill", "grey")
	.attr("x",750)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",15)
	.text("Space Type: ");

// Add space type label to canvas2
var typeValue = canvas.append("text")
	.attr("id", "typeValue")
	.attr("fill", "#42a7ff")
	.attr("x",875)
	.attr("y",830)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text(typeLabel);

var baseLegend = canvas.append("text")
	.attr("id", "baseLegend")
	.attr("fill", "grey")
	.attr("x",400)
	.attr("y",40)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text("Base: ");

var hotLegend = canvas.append("text")
	.attr("id", "hotLegend")
	.attr("fill", "#af1a33")
	.attr("x",width/2)
	.attr("y",100)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",14)
	.text("Too Hot");

var coldLegend = canvas.append("text")
	.attr("id", "coldLegend")
	.attr("fill", "#2d64c4")
	.attr("x",width/2)
	.attr("y",725)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",14)
	.text("Too Cold");

// Legend Colors (Base/Advanced)

var baseLegendLine = canvas.append("line")
	.attr("id", "baseLegendLine")
	.attr("x1", 470)
	.attr("y1", 35)
	.attr("x2",515)
	.attr("y2",35)
	.attr("stroke","black")
	.attr("stroke-width",10)

var advancedLegendLine = canvas.append("text")
	.attr("id", "advancedLegendLine")
	.attr("fill", "grey")
	.attr("x",535)
	.attr("y",40)
	.attr("font-family","Lucida Sans Unicode")
	.attr("font-size",18)
	.text("Advanced: ");

var advancedLegendLine = canvas.append("line")
	.attr("id", "advancedLegendLine")
	.attr("x1", 645)
	.attr("y1", 35)
	.attr("x2",690)
	.attr("y2",35)
	.attr("stroke","#ef634a")
	.attr("stroke-width",10)


// Scales for Plot Tool Tip
xScaleToolTip = d3.scaleTime()
	.domain([d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate), d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate)])
	.range([70,width]);

yScaleToolTip = d3.scaleLinear()
	.domain([3, -3])
	.range([60, height + 55]);


// Append area where cirlce and text will be place for tool tip
var focus = canvas.append("g")
  .attr("class", "focus")
  .style("display", "none");

// Identify where mouse is 
var bisectDate = d3.bisector(function(d) { return d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time); }).left;

// Append cirlce where mouse is
focus.append("circle")
	.attr("class", "circleClass")
	.attr("r", 10)
	.style("fill", "none")
	.style("stroke", "black");

// append line from cirlce to x axis
focus.append("line")
    .attr("class", "x")
    .style("stroke", "black")
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", 670);

// append line from circle to y axis
focus.append("line")
    .attr("class", "y")
    .style("stroke", "black")
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.5)
    .attr("x1", 925)
    .attr("x2", 925);

// Tool tip text values (air temp, rh, air speed, clo, met)
focus.append("text")
    .attr("class", "tempToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", "-1.0em");

focus.append("text")
    .attr("class", "rhToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", ".5em");

focus.append("text")
    .attr("class", "mrtToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", "2.0em");

focus.append("text")
    .attr("class", "windToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", "3.5em");

focus.append("text")
    .attr("class", "cloToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", "5.0em");

focus.append("text")
    .attr("class", "metToolTip")
    .style("stroke", "black")
    .attr("dx", 12)
    .attr("dy", "6.5em");

// Appending mouse over plot area
canvas.append("rect")                                     
    .attr("width", 928)                              
    .attr("height", 665)
    .style("fill", "none")                             
    .style("pointer-events", "all")
    .attr("transform", "translate(70, 75)")          
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

// Function running the hover over tool tip for plot
function mousemove() {                                 
    var x0 = xScale.invert(d3.mouse(this)[0]),              
        i = bisectDate(data, x0, 1),                   
        d0 = data[i - 1],                             
        d1 = data[i],
        d0_DateTime = d0.date_time
        d1_DateTime = d1.date_time

        d = x0 - d3.timeParse("%Y-%m-%d %H:%M:%S")(d0_DateTime) > d3.timeParse("%Y-%m-%d %H:%M:%S")(d1_DateTime) - x0 ? d1 : d0;

	focus.select("circle.circleClass")
		.attr("transform", 
			"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
			yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")");

	focus.select(".x")
		.attr("transform", 
			"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
			yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
		.attr("y2", 740 - yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)));

  	focus.select(".y")
  		.attr("transform",
  			"translate("+ 855 * -1 + "," + yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.attr("x2", 2000);

  	focus.select("text.tempToolTip")
      .attr("transform",
            "translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
            yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
      .text("Air Temp: " + Math.round(d.air_temperature) + "°F");

  	focus.select("text.rhToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("RH: " + Math.round(d.relative_humidity) + "%");

  	focus.select("text.mrtToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("MRT: " + Math.round(d.mrt) + "°F");

  	focus.select("text.windToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Air Speed: " + d.air_speed.toFixed(2) + " m/s");

  	focus.select("text.cloToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Clo: " + d.clo_value.toFixed(2));

  	focus.select("text.metToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Met: " + d.metabolic_rate.toFixed(2));

	}

// Plot Line
var valueLine = d3.line()
	.x(function(d){return xScale(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time));})
	.y(function(d){return yScale(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate));});

 canvas.append("path")
	.attr("d", valueLine(data))
	.attr("class", "line")
 	.style("stroke", "#000000")
	.attr("transform","translate(70,75)")
	.style("stroke-width", 1.50)
	.style("opacity", 0.70)
	.style("shape-rendering", "geometricPrecision");


// Base Model Percentage Metrics

// Base Model Average PMV
var avgBasePMV = d3.mean(data, function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate);}).toFixed(2)

// Total Data Point Counts
var totalCounts = data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -3 & PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= 3;}).length

// Percentage of Time when Base Model is above .5 PMV (Too Hot)
var perBaseHotPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}).length) / totalCounts 
document.getElementById("perBaseHotPMV").innerHTML = Math.round(perBaseHotPMV * 100) + "%";

// Percentage of Time when Base Model is below -.5 PMV (Too Cold)
var perBaseColdPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5;}).length) / totalCounts 
document.getElementById("perBaseColdPMV").innerHTML = Math.round(perBaseColdPMV * 100) + "%";

// Percentage of Time when Base Model is between -.5 and .5 PMV (Comfortable)
var perBaseComfPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 &
 PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5;}).length) / totalCounts
document.getElementById("perBaseComfPMV").innerHTML = Math.round(perBaseComfPMV * 100) + "%";


// Base Model Average PMV Metrics

// Average PMV When PMV > .5 (Too Hot)
var avgBaseHotPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}), 
	function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})

// Average PMV When PMV < -.5 (Too Cold)
var avgBaseColdPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5;}), 
	function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})

// Average PMV When PMV is between .5 and -.5 (Comfortable)
var avgBaseComfPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 && 
	PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5 ;}), 
	function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})


// Base Model Total Energy Usage Metrics
var baseHotKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}),
	function(d) {return d.base_kwh})
if (baseHotKWH == null) {baseHotKWH = 0} else {baseHotKWH}
document.getElementById("baseHotKWH").innerHTML = baseHotKWH.toFixed(1)

var baseColdKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5}),
	function(d){return d.base_kwh})
if (baseColdKWH == null) {baseColdKWH = 0} else {baseColdKWH}
document.getElementById("baseColdKWH").innerHTML = baseColdKWH.toFixed(1)

var baseComfKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 && 
	PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5}),
	function(d) {return d.base_kwh})
if (baseComfKWH == null) {baseComfKWH = 0} else {baseComfKWH}
document.getElementById("baseComfKWH").innerHTML = baseComfKWH.toFixed(1)

var baseTotal = baseHotKWH + baseComfKWH + baseColdKWH
document.getElementById("baseTotal").innerHTML = baseTotal.toFixed(1)

// Energy Cost
var baseCost = baseTotal * .29
document.getElementById("baseCost").innerHTML = "$" + baseCost.toFixed(2) 

// Base Model PMV/kWh

var baseHotEnergyPMV = avgBaseHotPMV / baseHotKWH
if (isNaN(baseHotEnergyPMV)) {baseHotEnergyPMV = 0} else {baseHotEnergyPMV}

var baseColdEnergyPMV = avgBaseColdPMV / baseColdKWH
if (isNaN(baseColdEnergyPMV)) {baseColdEnergyPMV = 0} else {baseColdEnergyPMV}

var baseComfEnergyPMV = (perBaseComfPMV * 100) / baseTotal
if (isNaN(baseComfEnergyPMV)) {baseComfEnergyPMV = 0} else {baseComfEnergyPMV}
document.getElementById("baseComfEnergyPMV").innerHTML = baseComfEnergyPMV.toFixed(3)

// Base Plot Function End
})




// Updated Plot Function Start

function updateData(){

	// Change color of the start and end date
	if (water != 42) {
		document.getElementById("startDate").style.color = '#42a7ff'
		document.getElementById("endDate").style.color = '#42a7ff'
	} else {
		document.getElementById("startDate").style.color = 'black'
		document.getElementById("endDate").style.color = 'black'
	}

	// Add Water Temp HTML
	document.getElementsByClassName("water")[0].innerHTML = water + "°F"
	document.getElementsByClassName("water")[1].innerHTML = water + "°F"
	document.getElementsByClassName("water")[2].innerHTML = water + "°F"
	document.getElementsByClassName("water")[3].innerHTML = water + "°F"
	document.getElementsByClassName("water")[4].innerHTML = water + "°F"
	document.getElementsByClassName("water")[5].innerHTML = water + "°F"
	document.getElementsByClassName("water")[6].innerHTML = water + "°F"
	document.getElementsByClassName("water")[7].innerHTML = water + "°F"
	document.getElementsByClassName("water")[8].innerHTML = water + "°F"
	document.getElementsByClassName("water")[9].innerHTML = water + "°F"
	document.getElementsByClassName("water")[10].innerHTML = water + "°F"

	// Slider for dynamic set point slider
	setpoint = document.getElementById("sliderValue").innerHTML

	var request = "/getData/?room=" + encodeURIComponent(room) + "&water_temp=" + encodeURIComponent(water) + "&mrt=" + encodeURIComponent(mrt) + "&wind=" + encodeURIComponent(wind) + 
	"&met=" + encodeURIComponent(met) + "&clo=" + encodeURIComponent(clo) + "&window=" + encodeURIComponent(Window) + "&ceiling=" + encodeURIComponent(ceiling) + "&roof=" + encodeURIComponent(roof) + 
	"&ac=" + encodeURIComponent(ac) + "&setpoint=" + encodeURIComponent(setpoint) + "&hvac=" + encodeURIComponent(hvac) + "&motion" + encodeURIComponent(motion)

	// Metadata labels
	labels()

	//Read in updated csv from rh1mod.py
	d3.csv(request, function(error, data) {
	    if (error) throw error;
		data.forEach(function(d){
			d.air_speed= +d.air_speed
			d.clo_value= +d.clo_value
			d.metabolic_rate= +d.metabolic_rate
			d.mrt= +d.mrt
			d.energy_cost= +d.energy_cost
			d.kwh= +d.kwh
			d.relative_humidity= +d.relative_humidity
			d.sqft_percent= +d.sqft_percent
			d.water_temperature= +d.water_temperature
			d.base_air_temp= +d.base_air_temp
			d.base_rh = +d.base_rh
			d.base_kwh = +d.base_kwh
			d.kwh = +d.kwh
		})
		//Print to see the data came in correctly
	    console.log(data[0]);


	// Set x axis scale extremes
	var minDate = d3.min(data,function(d){return d.date_time});
	document.getElementById("startDate").innerHTML = d3.timeFormat("%B %d")(d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate))
	
	var maxDate = d3.max(data,function(d){return d.date_time});
	document.getElementById("endDate").innerHTML = d3.timeFormat("%B %d")(d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate))


	// Create and Set Scales, X Axis and Y Axis
	var xScale = d3.scaleTime()
	.domain([d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate), d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate)])
	.range([0,width-80]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(5)
		.tickPadding(15)
		.tickFormat(d3.timeFormat("%m/%d"))

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5)
		.tickPadding(20)
		.tickFormat(d3.format('d'));

	// Apply x and y axis scales and PMV Function for base and advanced scenarios
	if (room == "B23-104B"){
		var baseValueLine = d3.line()
		.x(function(d){return xScale(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time));}) 
		.y(function(d){return yScale(PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85));})

		// Base Model Average PMV
		var avgBasePMV = d3.mean(data, function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85);}).toFixed(2)

		// Total Data Point Counts
		var totalCounts = data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -3 & PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= 3;}).length

		// Percentage of Time when Base Model is above .5 PMV (Too Hot)
		var perBaseHotPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}).length) / totalCounts 
		document.getElementById("perBaseHotPMV").innerHTML = Math.round(perBaseHotPMV * 100) + "%";

		// Percentage of Time when Base Model is below -.5 PMV (Too Cold)
		var perBaseColdPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5;}).length) / totalCounts 
		document.getElementById("perBaseColdPMV").innerHTML = Math.round(perBaseColdPMV * 100) + "%";

		// Percentage of Time when Base Model is between -.5 and .5 PMV (Comfortable)
		var perBaseComfPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 &
		 PMV(d.air_temperature, d.relative_humidity, 77.17, 0.10, 0.71, 0.85) <= .5;}).length) / totalCounts
		document.getElementById("perBaseComfPMV").innerHTML = Math.round(perBaseComfPMV * 100) + "%";

		// 42° F Base Comparision
		var perHot42 = 0
		document.getElementById("perHot42").innerHTML = perHot42 + "%"

		var perComf42 = 85
		document.getElementById("perComf42").innerHTML = perComf42 + "%"

		var perCold42 = 15
		document.getElementById("perCold42").innerHTML = perCold42 + "%"

		// Base Model Average PMV Metrics

		// Average PMV When PMV > .5 (Too Hot)
		var avgBaseHotPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})
		
		// Average PMV When PMV < -.5 (Too Cold)
		var avgBaseColdPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})

		// Average PMV When PMV is between -.5 and .5 (Comfortable)
		var avgBaseComfPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= .5 ;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})

		// Update Base kWh Metrics

		var baseHotKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}),
			function(d) {return d.base_kwh})
		if (baseHotKWH == null) {baseHotKWH = 0} else {baseHotKWH}
		document.getElementById("baseHotKWH").innerHTML = baseHotKWH.toFixed(1)

		var baseColdKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5}),
			function(d){return d.base_kwh})
		if (baseColdKWH == null) {baseColdKWH = 0} else {baseColdKWH}
		document.getElementById("baseColdKWH").innerHTML = baseColdKWH.toFixed(1)

		var baseComfKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= .5}),
			function(d) {return d.base_kwh})
		if (baseComfKWH == null) {baseComfKWH = 0} else {baseComfKWH}
		document.getElementById("baseComfKWH").innerHTML = baseComfKWH.toFixed(1)

		// 42° F Base Comparision
		var hotKWH42 = 0
		document.getElementById("hotKWH42").innerHTML = hotKWH42.toFixed(1)

		var comfKWH42 = 1563.8
		document.getElementById("comfKWH42").innerHTML = comfKWH42.toFixed(1)

		var coldKWH42 = 196.7
		document.getElementById("coldKWH42").innerHTML = coldKWH42.toFixed(1)

		var diffTotal42 = 1760.5
		document.getElementById("diffTotal42").innerHTML = diffTotal42.toFixed(1)

		var diffCost42 = 510.55
		document.getElementById("diffCost42").innerHTML = "$" + diffCost42.toFixed(2)

		// Base Model PMV/kWh

		var baseTotal = baseHotKWH + baseComfKWH + baseColdKWH
		document.getElementById("baseTotal").innerHTML = baseTotal.toFixed(1)

		var baseHotEnergyPMV = avgBaseHotPMV / baseHotKWH
		if (isNaN(baseHotEnergyPMV)) {baseHotEnergyPMV = 0} else {baseHotEnergyPMV}

		var baseColdEnergyPMV = avgBaseColdPMV / baseColdKWH
		if (isNaN(baseColdEnergyPMV)) {baseColdEnergyPMV = 0} else {baseColdEnergyPMV}

		var baseComfEnergyPMV = (perBaseComfPMV * 100) / baseTotal
		if (isNaN(baseComfEnergyPMV)) {baseComfEnergyPMV = 0} else {baseComfEnergyPMV}
		document.getElementById("baseComfEnergyPMV").innerHTML = baseComfEnergyPMV.toFixed(3)

		// 42° F Base Comparision
		document.getElementById("comfDiff42").innerHTML = "0.048"


	} else if (room == "B23-210B") {
		var baseValueLine = d3.line()
		.x(function(d){return xScale(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time));}) 
		.y(function(d){return yScale(PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85));})

		// Base Model Average PMV
		var avgBasePMV = d3.mean(data, function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85);}).toFixed(2)

		// Total Data Point Counts
		var totalCounts = data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -3 & PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= 3;}).length

		// Percentage of Time when Base Model is above .5 PMV (Too Hot)
		var perBaseHotPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}).length) / totalCounts 
		document.getElementById("perBaseHotPMV").innerHTML = Math.round(perBaseHotPMV * 100) + "%";

		// Percentage of Time when Base Model is below -.5 PMV (Too Cold)
		var perBaseColdPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5;}).length) / totalCounts 
		document.getElementById("perBaseColdPMV").innerHTML = Math.round(perBaseColdPMV * 100) + "%";

		// Percentage of Time when Base Model is between -.5 and .5 PMV (Comfortable)
		var perBaseComfPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 &
		 PMV(d.air_temperature, d.relative_humidity, 77.17, 0.10, 0.71, 0.85) <= .5;}).length) / totalCounts
		document.getElementById("perBaseComfPMV").innerHTML = Math.round(perBaseComfPMV * 100) + "%";

		// 42° F Base Comparision
		var perHot42 = 0
		document.getElementById("perHot42").innerHTML = perHot42 + "%"

		var perComf42 = 85
		document.getElementById("perComf42").innerHTML = perComf42 + "%"

		var perCold42 = 15
		document.getElementById("perCold42").innerHTML = perCold42 + "%"

		// Base Model Average PMV Metrics

		// Average PMV When PMV > .5 (Too Hot)
		var avgBaseHotPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})
		
		// Average PMV When PMV < -.5 (Too Cold)
		var avgBaseColdPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})

		// Average PMV When PMV is between -.5 and .5 (Comfortable)
		var avgBaseComfPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= .5 ;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85)})

		// Update Base kWh Metrics

		var baseHotKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) > .5;}),
			function(d) {return d.base_kwh})
		if (baseHotKWH == null) {baseHotKWH = 0} else {baseHotKWH}
		document.getElementById("baseHotKWH").innerHTML = baseHotKWH.toFixed(1)

		var baseColdKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) < -.5}),
			function(d){return d.base_kwh})
		if (baseColdKWH == null) {baseColdKWH = 0} else {baseColdKWH}
		document.getElementById("baseColdKWH").innerHTML = baseColdKWH.toFixed(1)

		var baseComfKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.71, 0.85) <= .5}),
			function(d) {return d.base_kwh})
		if (baseComfKWH == null) {baseComfKWH = 0} else {baseComfKWH}
		document.getElementById("baseComfKWH").innerHTML = baseComfKWH.toFixed(1)

		// 42° F Base Comparision

		var hotKWH42 = 0
		document.getElementById("hotKWH42").innerHTML = hotKWH42.toFixed(1)

		var comfKWH42 = 1563.8
		document.getElementById("comfKWH42").innerHTML = comfKWH42.toFixed(1)

		var coldKWH42 = 196.7
		document.getElementById("coldKWH42").innerHTML = coldKWH42.toFixed(1)

		var diffTotal42 = 1760.5
		document.getElementById("diffTotal42").innerHTML = diffTotal42.toFixed(1)

		var diffCost42 = 510.55
		document.getElementById("diffCost42").innerHTML = "$" + diffCost42.toFixed(2)

		// Base Model PMV/kWh

		var baseTotal = baseHotKWH + baseComfKWH + baseColdKWH
		document.getElementById("baseTotal").innerHTML = baseTotal.toFixed(1)

		var baseHotEnergyPMV = avgBaseHotPMV / baseHotKWH
		if (isNaN(baseHotEnergyPMV)) {baseHotEnergyPMV = 0} else {baseHotEnergyPMV}

		var baseColdEnergyPMV = avgBaseColdPMV / baseColdKWH
		if (isNaN(baseColdEnergyPMV)) {baseColdEnergyPMV = 0} else {baseColdEnergyPMV}

		var baseComfEnergyPMV = (avgBaseComfPMV * 100) / baseTotal
		if (isNaN(baseComfEnergyPMV)) {baseComfEnergyPMV = 0} else {baseComfEnergyPMV}
		document.getElementById("baseComfEnergyPMV").innerHTML = baseComfEnergyPMV.toFixed(3)

		// 42° F Base Comparision
		document.getElementById("comfDiff42").innerHTML = "0.048"

	} else if (room == "B23-LC"){
		var baseValueLine = d3.line()
		.x(function(d){return xScale(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time));}) 
		.y(function(d){return yScale(PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36));})

		// Base Model Average PMV
		var avgBasePMV = d3.mean(data, function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36);}).toFixed(2)

		// Total Data Point Counts
		var totalCounts = data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) >= -3 & PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) <= 3;}).length

		// Percentage of Time when Base Model is above .5 PMV (Too Hot)
		var perBaseHotPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) > .5;}).length) / totalCounts 
		document.getElementById("perBaseHotPMV").innerHTML = Math.round(perBaseHotPMV * 100) + "%";

		// Percentage of Time when Base Model is below -.5 PMV (Too Cold)
		var perBaseColdPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) < -.5;}).length) / totalCounts 
		document.getElementById("perBaseColdPMV").innerHTML = Math.round(perBaseColdPMV * 100) + "%";

		// Percentage of Time when Base Model is between -.5 and .5 PMV (Comfortable)
		var perBaseComfPMV = (data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) >= -.5 &
		 PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) <= .5;}).length) / totalCounts
		document.getElementById("perBaseComfPMV").innerHTML = Math.round(perBaseComfPMV * 100) + "%";

		// 42° F Base Comparision
		var perHot42 = 95
		document.getElementById("perHot42").innerHTML = perHot42 + "%"

		var perComf42 = 5
		document.getElementById("perComf42").innerHTML = perComf42 + "%"

		var perCold42 = 0
		document.getElementById("perCold42").innerHTML = perCold42 + "%"

		// Base Model Average PMV Metrics

		// Average PMV When PMV > .5 (Too Hot)
		var avgBaseHotPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) > .5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36)})

		// Average PMV When PMV < -.5 (Too Cold)
		var avgBaseColdPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) < -.5;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36)})		

		// Average PMV When PMV is between -.5 and .5 (Comfortable)
		var avgBaseComfPMV = d3.mean(data.filter(function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) <= .5 ;}), 
			function(d){return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36)})

		// Update Base kWh Metrics

		var baseHotKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) > .5;}),
			function(d) {return d.base_kwh})
		if (baseHotKWH == null) {baseHotKWH = 0} else {baseHotKWH}
		document.getElementById("baseHotKWH").innerHTML = baseHotKWH.toFixed(1)

		var baseColdKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) < -.5}),
			function(d){return d.base_kwh})
		if (baseColdKWH == null) {baseColdKWH = 0} else {baseColdKWH}
		document.getElementById("baseColdKWH").innerHTML = baseColdKWH.toFixed(1)

		var baseComfKWH = d3.sum(data.filter(function(d) {return PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) >= -.5 && 
			PMV(d.base_air_temp, d.base_rh, 77.17, 0.10, 0.64, 1.36) <= .5}),
			function(d) {return d.base_kwh})
		if (baseComfKWH == null) {baseComfKWH = 0} else {baseComfKWH}
		document.getElementById("baseComfKWH").innerHTML = baseComfKWH.toFixed(1)

		// 42° F Base Comparision
		document.getElementById("hotKWH42").innerHTML = "1703.2"
		document.getElementById("comfKWH42").innerHTML = "57.3"
		document.getElementById("coldKWH42").innerHTML = "0.0"
		document.getElementById("diffTotal42").innerHTML = "1760.5"
		document.getElementById("diffCost42").innerHTML = "$510.55"

		// 42° F Base Comparision

		var hotKWH42 = 1703.2
		document.getElementById("hotKWH42").innerHTML = hotKWH42.toFixed(1)

		var comfKWH42 = 57.3
		document.getElementById("comfKWH42").innerHTML = comfKWH42.toFixed(1)

		var coldKWH42 = 0.0
		document.getElementById("coldKWH42").innerHTML = coldKWH42.toFixed(1)

		var diffTotal42 = 1760.5
		document.getElementById("diffTotal42").innerHTML = diffTotal42.toFixed(1)

		var diffCost42 = 510.55
		document.getElementById("diffCost42").innerHTML = "$" + diffCost42.toFixed(2)

		// Base Model PMV/kWh

		var baseTotal = baseHotKWH + baseComfKWH + baseColdKWH
		document.getElementById("baseTotal").innerHTML = baseTotal.toFixed(1)

		var baseHotEnergyPMV = avgBaseHotPMV / baseHotKWH
		if (isNaN(baseHotEnergyPMV)) {baseHotEnergyPMV = 0} else {baseHotEnergyPMV}

		var baseColdEnergyPMV = avgBaseColdPMV / baseColdKWH
		if (isNaN(baseColdEnergyPMV)) {baseColdEnergyPMV = 0} else {baseColdEnergyPMV}

		var baseComfEnergyPMV = (perBaseComfPMV * 100) / baseTotal
		if (isNaN(baseComfEnergyPMV)) {baseComfEnergyPMV = 0} else {baseComfEnergyPMV}
		document.getElementById("baseComfEnergyPMV").innerHTML = baseComfEnergyPMV.toFixed(3)

		// 42° F Base Comparision
		document.getElementById("comfDiff42").innerHTML = "0.003"
	}

	// Advanced Model Plot

	var advancedValueLine = d3.line()
		.x(function(d){return xScale(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time));}) 
		.y(function(d){return yScale(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate));});


	// Advanced Model Percentage Metrics

	// Advanced Model Average PMV
	var avgAdvancedPMV = d3.mean(data, function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate);}).toFixed(2)

	// Total Data Point Counts
	var totalCounts = data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -3 & PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= 3;}).length

	// Percentage of Time when Advanced Model is above .5 PMV (Too Hot)
	var perAdvHotPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}).length) / totalCounts 
	document.getElementById("perAdvHotPMV").innerHTML = Math.round(perAdvHotPMV * 100) + "%";

	// Percentage of Time when Advanced Model is below -.5 PMV (Too Cold)
	var perAdvColdPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5;}).length) / totalCounts 
	document.getElementById("perAdvColdPMV").innerHTML = Math.round(perAdvColdPMV * 100) + "%";

	// Percentage of Time when Advanced Model is between -.5 and .5 PMV (Comfortable)
	var perAdvComfPMV = (data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 &
	 PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5;}).length) / totalCounts
	document.getElementById("perAdvComfPMV").innerHTML = Math.round(perAdvComfPMV * 100) + "%";

	// Base vs Advanced Percentage Difference Metrics
	var perHotDiff = Math.abs(perAdvHotPMV - perBaseHotPMV)

	var perColdDiff = Math.abs(perAdvColdPMV - perBaseColdPMV)

	var perComfDiff = Math.abs(perAdvComfPMV - perBaseComfPMV)

	// Advanced Model Average PMV Metrics


	// Average PMV When PMV > .5 (Too Hot)
	var avgAdvHotPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}), 
		function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})

	// Average PMV When PMV < -.5 (Too Cold)
	var avgAdvColdPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5;}), 
		function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})

	// Average PMV When PMV is between -.5 and .5 (Comfortable)
	var avgAdvComfPMV = d3.mean(data.filter(function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 && 
		PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5 ;}), 
		function(d){return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)})

	// Base vs Advanced PMV Avg Difference Metrics
	var avgHotDiff
	
	var avgHotDiff = Math.abs(avgAdvHotPMV) - Math.abs(avgBaseHotPMV)
	if (avgHotDiff == null) {avgHotDiff = "N/A"} else {avgHotDiff}

	var avgColdDiff = Math.abs(avgAdvColdPMV) - Math.abs(avgBaseColdPMV)
	if (avgColdDiff == null){avgColdDiff = "N/A"} else {avgColdDiff}

	var avgComfDiff = Math.abs(avgAdvComfPMV) - Math.abs(avgBaseComfPMV)
	if (avgComfDiff == null){avgComfDiff = "N/A"} else {avgComfDiff}


	// Update Advanced Energy Usage (kWh) Metrics

	var advHotKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) > .5;}),
		function(d) {return d.kwh})
	if (advHotKWH == null) {advHotKWH = 0} else {advHotKWH}
	document.getElementById("advHotKWH").innerHTML = advHotKWH.toFixed(1)

	var advColdKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) < -.5}),
		function(d){return d.kwh})
	if (advColdKWH == null) {advColdKWH = 0} else {advColdKWH}
	document.getElementById("advColdKWH").innerHTML = advColdKWH.toFixed(1)

	var advComfKWH = d3.sum(data.filter(function(d) {return PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) >= -.5 && 
		PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate) <= .5}),
		function(d) {return d.kwh})
	if (advComfKWH == null) {advComfKWH = 0} else {advComfKWH}
	document.getElementById("advComfKWH").innerHTML = advComfKWH.toFixed(1)

	// Base vs Advanced Energy Usage Differences

	var hotDiffKWH = Math.abs(advHotKWH) - Math.abs(baseHotKWH)

	var coldDiffKWH = Math.abs(advColdKWH) - Math.abs(baseColdKWH)

	var comfDiffKWH = Math.abs(advComfKWH) - Math.abs(baseComfKWH)

	var baseTotal = baseHotKWH + baseComfKWH + baseColdKWH

	var advTotal = advHotKWH + advComfKWH + advColdKWH
	document.getElementById("advTotal").innerHTML = advTotal.toFixed(1)

	var diffTotal = hotDiffKWH + comfDiffKWH + coldDiffKWH

	var baseDiffTotal = advTotal - 1760.51
	
	// Energy Cost
	var baseCost = baseTotal * .29
	document.getElementById("baseCost").innerHTML = "$" + baseCost.toFixed(2) 

	var advCost = advTotal * .29
	document.getElementById("advCost").innerHTML = "$" + advCost.toFixed(2)

	var diffCost = diffTotal * .29

	var baseDiffCost = advCost - 510.55

	// Advanced Model PMV/kWh

	var advHotEnergyPMV = avgAdvHotPMV / advHotKWH
	if (isNaN(advHotEnergyPMV)) {advHotEnergyPMV = 0} else {advHotEnergyPMV}

	var advColdEnergyPMV = avgAdvColdPMV / advColdKWH
	if (isNaN(advColdEnergyPMV)) {advColdEnergyPMV = 0} else {advColdEnergyPMV}

	var advComfEnergyPMV = (perAdvComfPMV * 100) / advTotal
	if (isNaN(advComfEnergyPMV)) {
		advComfEnergyPMV = 0
	} else if (advComfEnergyPMV == Number.POSITIVE_INFINITY || advComfEnergyPMV == Number.NEGATIVE_INFINITY){
		advComfEnergyPMV = 0
	} else {
		advComfEnergyPMV
	}

	document.getElementById("advComfEnergyPMV").innerHTML = advComfEnergyPMV.toFixed(3)

	var comfDiff = baseComfEnergyPMV - advComfEnergyPMV

	// Metric Summary
	var energyMetric = hotDiffKWH + comfDiffKWH + coldDiffKWH

	if (ac == "No"){
		var summary1TC = ((perBaseComfPMV - (perComf42 / 100)) / perBaseComfPMV) * 100
	} else {
		var summary1TC = ((perBaseComfPMV - (perComf42 / 100)) / perBaseComfPMV) * 100
	}

	if (summary1TC == Number.POSITIVE_INFINITY || summary1TC == Number.NEGATIVE_INFINITY) {
		document.getElementById("summary1TC").innerHTML = "N/A"
		document.getElementById("summary1TC").style.color = "#525252";
	} else if (Math.round(summary1TC) > 0) {
		document.getElementById("summary1TC").innerHTML = Math.round(summary1TC) + "%"
		document.getElementById("summary1TC").style.color = "#24e016"
	} else if (Math.round(summary1TC) < 0) {
		document.getElementById("summary1TC").innerHTML = Math.round(summary1TC) + "%"
		document.getElementById("summary1TC").style.color = "red"
	} else if (Math.round(summary1TC) == 0) {
		document.getElementById("summary1TC").innerHTML = Math.round(summary1TC) + "%"
		document.getElementById("summary1TC").style.color = "#525252";
	}

	
	var summary1Energy = ((baseTotal - diffTotal42) / baseTotal) * 100
	if (Math.round(summary1Energy) > 0) {
		document.getElementById("summary1Energy").innerHTML = Math.round(summary1Energy) + "%"
		document.getElementById("summary1Energy").style.color = "red"
	} else if (Math.round(summary1Energy) < 0) {
		document.getElementById("summary1Energy").innerHTML = Math.round(summary1Energy) + "%"
		document.getElementById("summary1Energy").style.color = "#24e016"
	} else if (Math.round(summary1Energy) == 0){
		document.getElementById("summary1Energy").innerHTML = Math.round(summary1Energy) + "%"
		document.getElementById("summary1Energy").style.color = "#525252";
	}
	

	//Update Summary Box
	
	if (Window == "Closed" && ceiling == "Off" && roof == "No" && ac == "No" && mrt == "Base" && wind == "Base" && met == "Base" && clo == "Base"){
		document.getElementById("placeHolder").innerHTML = " "
	} else if (Window == "Closed" && ceiling == "Off" && roof == "No" && ac == "No") {
		document.getElementById("placeHolder").innerHTML = document.getElementById("summary2").innerHTML;

		var summary2TC = ((perAdvComfPMV - perBaseComfPMV) / perAdvComfPMV) * 100
		if (summary2TC > 0) {
			document.getElementById("summary2TC").innerHTML = Math.round(summary2TC) + "%"
			document.getElementById("summary2TC").style.color = "#24e016"
		} else if (summary2TC < 0) {
			document.getElementById("summary2TC").innerHTML = Math.round(summary2TC) + "%"
			document.getElementById("summary2TC").style.color = "red"
		} else if (summary2TC == 0) {
			document.getElementById("summary2TC").innerHTML = Math.round(summary2TC) + "%"
			document.getElementById("summary2TC").style.color = "#525252";
		}
		
	} else {
		document.getElementById("placeHolder").innerHTML = document.getElementById("summary3").innerHTML;

		var summary3TC = ((perAdvComfPMV - perBaseComfPMV) / perAdvComfPMV) * 100
		if (summary3TC == Number.POSITIVE_INFINITY || summary3TC == Number.NEGATIVE_INFINITY) {
			document.getElementById("summary3TC").innerHTML = "N/A"
			document.getElementById("summary3TC").style.color = "#525252";
		}else if (summary3TC > 0) {
			document.getElementById("summary3TC").innerHTML = Math.round(summary3TC) + "%"
			document.getElementById("summary3TC").style.color = "#24e016"
		} else if (summary3TC < 0) {
			document.getElementById("summary3TC").innerHTML = Math.round(summary3TC) + "%"
			document.getElementById("summary3TC").style.color = "red"
		} else if (summary3TC == 0) {
			document.getElementById("summary3TC").innerHTML = Math.round(summary3TC) + "%"
			document.getElementById("summary3TC").style.color = "#525252";
		}
		
		var summary3Energy = ((advTotal - baseTotal) / advTotal) * 100

		if (summary3Energy < -99999) {
			document.getElementById("summary3Energy").innerHTML = "No Energy Used"
			document.getElementById("summary3Energy").style.color = "#24e016"
		} else if (summary3Energy == Number.POSITIVE_INFINITY || summary3Energy == Number.NEGATIVE_INFINITY) {
			document.getElementById("summary3Energy").innerHTML = "N/A"
			document.getElementById("summary3Energy").style.color = "#525252"; 
		} else if (summary3Energy > 0) {
			document.getElementById("summary3Energy").innerHTML = Math.round(summary3Energy) + "%"
			document.getElementById("summary3Energy").style.color = "red"
		} else if (summary3Energy < 0) {
			document.getElementById("summary3Energy").innerHTML = Math.round(summary3Energy) + "%"
			document.getElementById("summary3Energy").style.color = "#24e016"
		}

		var summary3PMV = ((advComfEnergyPMV - baseComfEnergyPMV) / advComfEnergyPMV) * 100

		if (summary3PMV == Number.POSITIVE_INFINITY || summary3PMV == Number.NEGATIVE_INFINITY) {
			document.getElementById("summary3TC").innerHTML = "N/A"
			document.getElementById("summary3TC").style.color = "#525252";
		} else if (summary3PMV > 0) {
			document.getElementById("summary3PMV").innerHTML = Math.round(summary3PMV) + "%"	
			document.getElementById("summary3PMV").style.color = "#24e016"
		} else if (summary3PMV < 0) {
			document.getElementById("summary3PMV").innerHTML = Math.round(summary3PMV) + "%"
			document.getElementById("summary3PMV").style.color = "red"
		} else if (summary3PMV == 0){
			document.getElementById("summary3PMV").innerHTML = Math.round(summary3PMV) + "%"
			document.getElementById("summary3PMV").style.color = "#525252"
		}
		
	}

	//Mouse over

	xScaleToolTip = d3.scaleTime()
		.domain([d3.timeParse("%Y-%m-%d %H:%M:%S")(minDate), d3.timeParse("%Y-%m-%d %H:%M:%S")(maxDate)])
		.range([70, width]);

	yScaleToolTip = d3.scaleLinear()
		.domain([3, -3])
		.range([60, height + 55]);


	// Hover over visualization and view data points

	var focus = canvas.append("g")
	  .attr("class", "focus")
	  .style("display", "none");

	var bisectDate = d3.bisector(function(d) { return d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time); }).left;

	focus.append("circle")
		.attr("class", "circleClass")
		.attr("r", 10)
		.style("fill", "none")
		.style("stroke", "#e55a2b");

	// append the x line
	focus.append("line")
	    .attr("class", "x")
	    .style("stroke", "black")
	    .style("stroke-dasharray", "3,3")
	    .style("opacity", 0.5)
	    .attr("y1", 0)
	    .attr("y2", 670);

	// append the y line
	focus.append("line")
	    .attr("class", "y")
	    .style("stroke", "black")
	    .style("stroke-dasharray", "3,3")
	    .style("opacity", 0.5)
	    .attr("x1", 925)
	    .attr("x2", 925);

	focus.append("text")
	    .attr("class", "tempToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", "-1.0em");

	focus.append("text")
	    .attr("class", "rhToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", ".5em");

	focus.append("text")
	    .attr("class", "mrtToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", "2.0em");

	focus.append("text")
	    .attr("class", "windToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", "3.5em");

	focus.append("text")
	    .attr("class", "cloToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", "5.0em");

	focus.append("text")
	    .attr("class", "metToolTip")
	    .style("stroke", "#e55a2b")
	    .attr("dx", 12)
	    .attr("dy", "6.5em");
	                             
	canvas.append("rect")                                     
	    .attr("width", 925)                              
	    .attr("height", 670)
	    .style("fill", "none")                             
	    .style("pointer-events", "all")
	    .attr("transform", "translate(70, 75)")                  
	    .on("mouseover", function() { focus.style("display", null); })
	    .on("mouseout", function() { focus.style("display", "none"); })
	    .on("mousemove", mousemove);

	// Plot Base data

	canvas.append("path")
		.attr("d", baseValueLine(data))
		.attr("class", "baseLine")
	 	.style("stroke", "#000000")
		.attr("transform","translate(70,75)")
		.style("shape-rendering", "geometricPrecision");


	// Plot Advanced Data
	// Update

	trans = d3.transition()
		.duration(1000)
		.ease(d3.easeQuad);

	datetrans = d3.transition()
		.duration(1000)
		.ease(d3.easeLinear)

	canvas.selectAll(".line").transition(trans)
		.attr("d", advancedValueLine(data))
		.style("stroke", "#ef634a")
		.style("stroke-width", 1.50)
		.style("opacity", 0.60);

	canvas.selectAll(".baseLine")
		.attr("d", baseValueLine(data))
		.style("stroke", "#000000")
		.style("stroke-width", 1)
		.style("opacity", 0.60);

	canvas.selectAll("#buildingValue")
		.text(buildingLabel);

	canvas.selectAll("#locationValue")
		.text(roomLabel);

	canvas.selectAll("#tempValue")
		.text(water + "°F");

	canvas.selectAll("#typeValue")
		.text(typeLabel);

	// Enter
	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(5)
		.tickSize(5)
		.tickSizeOuter(0)
		.tickSizeInner(-height+35)
		.tickPadding(15)
		.tickFormat(d3.timeFormat("%m/%d"));

    canvas.selectAll("#xAxis").transition(datetrans)
		.call(xAxis);

	// Exit
	canvas.selectAll("#xAxis")
		.exit()
		.remove();

	function mousemove() {                                 
    var x0 = xScale.invert(d3.mouse(this)[0]),              
        i = bisectDate(data, x0, 1),                   
        d0 = data[i - 1],                             
        d1 = data[i],
        d0_DateTime = d0.date_time
        d1_DateTime = d1.date_time

        d = x0 - d3.timeParse("%Y-%m-%d %H:%M:%S")(d0_DateTime) > d3.timeParse("%Y-%m-%d %H:%M:%S")(d1_DateTime) - x0 ? d1 : d0;

	focus.select("circle.circleClass")
		.attr("transform", 
			"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
			yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")");

	focus.select(".x")
		.attr("transform", 
			"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
			yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
		.attr("y2", 740 - yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)));

  	focus.select(".y")
  		.attr("transform",
  			"translate("+ 855 * -1 + "," + yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.attr("x2", 2000);

  	focus.select("text.tempToolTip")
      .attr("transform",
            "translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
            yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
      .text("Air Temp: " + Math.round(d.air_temperature) + "°F");

  	focus.select("text.rhToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("RH: " + Math.round(d.relative_humidity) + "%");

  	focus.select("text.mrtToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("MRT: " + Math.round(d.mrt) + "°F");

  	focus.select("text.windToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Air Speed: " + d.air_speed.toFixed(2) + " m/s");

  	focus.select("text.cloToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Clo: " + d.clo_value.toFixed(2));

  	focus.select("text.metToolTip")
  		.attr("transform",
        	"translate(" + xScaleToolTip(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date_time)) + "," + 
        	yScaleToolTip(PMV(d.air_temperature, d.relative_humidity, d.mrt, d.air_speed, d.clo_value, d.metabolic_rate)) + ")")
  		.text("Met: " + d.metabolic_rate.toFixed(2));

	}

	//END
	})
};

// PMV Function

function PMV(air_temperature, relative_humidity, meanRad, airSpeed, cloValue, metabolicRate){
	// Air Temperature = Fahrenheit
	// Relative Humidity = Whole Number not Percentage (eg. 85)
	// Mean Radiant Temperature = Fahrenheit
	// Air Speed = Meters Per Second
	// Clothing Insulation = Clo
	// Metabolic Rate = Met

	//Conversion of Units of Measure
	var ta = (air_temperature - 32) / 1.8
	var tr = (meanRad - 32) / 1.8
	var vel = airSpeed
	var pa = relative_humidity * 10 * Math.exp(16.6536 - 4030.183 / (ta + 235))

	// Thermal Insulation of the clothing in M2K/W
	var icl = 0.155 * cloValue

	// Metabolic Rate in W/M2
	var m = metabolicRate * 58.15

	// External Work in W/M2
	var w = .001 * 58.15

	// Internal heat production of the human body
	var mw = m - w
	if (icl <= .078) {
		var fcl = 1 + (1.29 * icl)}
	else {
		var fcl = 1.05 + (.645 * icl)}

	// Heat Transfer coefficient by forced convection
	var hcf = 12.1 * Math.sqrt(vel)
	var taa = ta + 273
	var tra = tr + 273
	var tcla = taa + (35.5 - ta) / (3.5 * icl)
	var p1 = icl * fcl
	var p2 = p1 * 3.96
	var p3 = p1 * 100
	var p4 = p1 * taa
	var p5 = 308.7 - .028 * mw + p2 * Math.pow(tra/100, 4)
	var xn = tcla / 100
	var xf = tcla / 50
	var eps = .00015

	n = 0
	while (Math.abs(xn - xf) > eps) {
		xf = (xf + xn) / 2
		var hcn = 2.38 * Math.pow(Math.abs(100 * xf - taa), .25)
		if (hcf > hcn) {var hc = hcf}
		else {var hc = hcn}

		xn = (p5 + p4 * hc - p2 * Math.pow(xf, 4)) / (100 + p3 * hc)
		n+=1

		if (n > 150) {console.log("Max Interations Exceeded")}
	}
	
	var tcl = 100 * xn - 273

	// Heat loss diff through skin
	var hl1 = 3.05 * .001 * (5733 - (6.99 * mw) - pa)

	// Heat loss by sweating
	if (mw > 58.15) {
		var hl2 = .42 * (mw - 58.15)}
	else {
		var hl2 = 0
	}

	// Latent Respiration Heat Loss
	var hl3 = 1.7 * .00001 * m * (5867 - pa)

	// Dry Respiration Heat Loss
	var hl4 = .0014 * m * (34 - ta)

	// Heat Loss by Radiation
	var hl5 = 3.96 * fcl * (Math.pow(xn, 4) - Math.pow(tra/100, 4))

	// Heat Loss by Convection
	var hl6 = fcl * hc * (tcl - ta)

	var ts = .303 * Math.exp(-.036 * m) + .028

	var pmvHold = (ts * (mw - hl1 - hl2 - hl3 - hl4 - hl5 - hl6)).toFixed(1)

	if (pmvHold < -3) { pmvHold = -3 } else if (pmvHold > 3) { pmvHold = 3}

	return pmvHold
}

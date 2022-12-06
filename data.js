var airportsData;
var airportMap;
var img1,img2,size;
var iataInput,flInput;;
var departData,airportData, arrivalData,schArrivalData,arrivaliata,flightarrData,flights, airData;
var iataCode,schCode;
var canvas;
var departStatus,schArrivalDataStatus;


var weather,weatherStatus;
var cityInput;
var forecast,forecastStatus,forecast2;



// Options for map
var options = {
  lat: 20,
  lng: -30,
  zoom:2.5,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
}

// Create map of Leaflet through mappa
const mappa = new Mappa('Leaflet');


function setup() {

  canvas = createCanvas(1440, 750);
  
//input button
iataInput = createInput('');
  //cityInput.input(InputEvent);
  iataInput.position(90, 700);
  iataInput.style('font-family', 'Verdana');
  iataInput.style('padding', '5px');
  iataInput.style('z-index', '1000');
  //input button
  cityInput = createInput('');
  //cityInput.input(InputEvent);
  cityInput.position(450, 700);
  cityInput.style('font-family', 'Verdana');
  cityInput.style('padding', '5px');
  cityInput.style('z-index', '1000');

  




  // check Airport flight text
  var checkFlight = createP('Check for Flights in Airport');
  checkFlight.position(90, 665);
  checkFlight.style('font-size', '14px');
  checkFlight.style('color', 'black');
  checkFlight.style('font-family', 'Verdana');
  checkFlight.style('z-index', '1000');

  // airport text
  var AirportText = createP('Airport')
  AirportText.position(25, 692);
  AirportText.style('font-size', '14px');
  AirportText.style('color', 'black');
  AirportText.style('font-family', 'Verdana');
  AirportText.style('z-index', '1000');

  //check button
  button = createButton('Check');
  button.position(280, 705);
  button.style('font-family', 'Verdana');
  button.style('z-index', '1000');
  button.mousePressed(flightsData);

  //check flight text
  var flightNumber = createP('Check Flight Number');
  flightNumber.style('font-size', '14px');
  flightNumber.style('color', 'black');
  flightNumber.style('font-family', 'Verdana');
  flightNumber.style('z-index', '1000');

   //flight# text
   var cityText = createP('City')
  cityText.position(410, 692);
  cityText.style('font-size', '14px');
  cityText.style('color', 'black');
  cityText.style('font-family', 'Verdana');
  cityText.style('z-index', '1000');
   // check flight # text
   var checkWeather = createP('Check for City Weather');

   checkWeather.position(450, 665);
   checkWeather.style('font-size', '14px');
   checkWeather.style('color', 'black');
   checkWeather.style('font-family', 'Verdana');
   checkWeather.style('z-index', '1000');

   

  //airportflight button
  button1 = createButton('Check');
  button1.position(640,705);
  button1.style('font-family', 'Verdana');
  button1.style('z-index', '1000');
  button1.mousePressed(weatherData);



 
  //draw weather data

  // Create a tile map and overlay the canvas on top
  airportMap = mappa.tileMap(options);
  airportMap.overlay(canvas);
  
  
  // using function preload to load table is not working
  airportsData = loadTable('assets/airport1.csv', 'csv', 'header');
  console.log(airportsData)
  
  
}

function preload(){
  img1 = loadImage('assets/airplane.png');
  img2 = loadImage('assets/airport-location-2959.png');

}
function flightsData(){

  iataCode = iataInput.value();
 
  //load flght departure API
  loadJSON('https://aviation-edge.com/v2/public/flights?key=ac5b23-ce3354&depIata='+iataCode,gotDep);

  //load flight arrivals API
  loadJSON('https://aviation-edge.com/v2/public/flights?key=ac5b23-ce3354&arrIata='+iataCode, gotArr)

  //load airport lat&lon
  loadJSON('https://aviation-edge.com/v2/public/airportDatabase?key=ac5b23-ce3354&codeIataAirport='+iataCode, gotAirport);


  
  
}




function weatherData(){
  const city = cityInput.value();
 
 // load current weather JSON API
  loadJSON('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=750ef11121f4d903850a3c03ddc47fbf&units=metric', gotData);
  print(city);

  //load weather forecast JSON API
  loadJSON('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=750ef11121f4d903850a3c03ddc47fbf&units=metric', gotForecast);
}
//current weather
function gotData(data){
  weather = data;
  weatherStatus=true;

}

//weather forecast
function gotForecast(data1){
  forecast = data1;
  forecastStatus=true;
}

// Close weather window
function mouseClicked(){
if(mouseX>450 && mouseX<610 && mouseY>660 && mouseY<690){
  
  if(weatherStatus==true)
{
  weatherStatus=false;
  
}
  if(forecastStatus==true)
{
  forecastStatus=false;
}
}
if (mouseX>470 && mouseX<510 && mouseY>460 && mouseY<490){

  if(weatherStatus==true)
  {
    weatherStatus=false;
    
  }
    if(forecastStatus==true)
  {
    forecastStatus=false;
  }
}
}


//get all airports data
function gotAir(data){
  airData = data;
}
//get flight data - departure
function gotDep(data){
  departData = data;
  departStatus = true;
}

//get flight data - arrival
function gotArr(data){
  arrivalData = data;
  
}


//get schedule departure data
function gotAirport(data){
  airportData = data;
  
}



  



function draw(){
  clear();

  for (var i = 0; i < airportsData.getRowCount(); i++){
     
    //geting lat and lon of data sheet to load them on the map API
    var latitude = Number(airportsData.getString(i, 'Airport1Latitude'));
    var longitude = Number(airportsData.getString(i, 'Airport1Longitude'));

    if (airportMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      var pos = airportMap.latLngToPixel(latitude, longitude);
      size = airportsData.getString(i, 'TotalSeats');

      var dis = dist(mouseX, mouseY, pos.x, pos.y);
      var shortname = airportsData.getString(i, 'Orig');
      var fullname = airportsData.getString(i, 'Name');
      var countname = airportsData.getString(i, 'Country Name');


  //text for airports
  if(dis<5){
  
    fill('white');
    noStroke();
    rect(mouseX,mouseY,fullname.length*5+70, 70, 20, 20);
  
    textSize(14);
    fill('black');
    text(shortname, mouseX+15, mouseY+20);
    text(fullname, mouseX+15, mouseY+40);
    text(countname, mouseX+15, mouseY+60);
    
  }
  
    noStroke();
    //fill(frameCount % 200, 100, 191);
    fill(200, 100, 191);
    if(pos.y<603 && pos.y>105){
    //fill('white')
   size = map(size, 558, 60000000, 1, 25) + airportMap.zoom() * sin(frameCount * 0.05);
    //size = map(size, 558, 60000000, 1, 25) + airportMap.zoom();
    
    if(departStatus ==true || schArrivalDataStatus==true){
      ellipse(pos.x, pos.y, 0);
    }
    
   else{
    ellipse(pos.x, pos.y, size);
   }

  
}
 
}
  }



 
  if(airportData){

    for(var air of airportData.slice(0,1)){
    var x =air.latitudeAirport;
    var y =air.longitudeAirport;
    var namecity = air.nameAirport;
    var namecountry = air.nameCountry;
    print(x,y);
    
    if (airportMap.map.getBounds().contains({lat: x, lng: y})) {
      var pos = airportMap.latLngToPixel(x, y);

      
      var dis = dist(mouseX, mouseY, pos.x, pos.y);
  
      if(dis<25){
    
        fill('white');
        noStroke();
        rect(mouseX,mouseY,namecity.length*5+70,70, 20, 20);
      
        textSize(14);
        fill('black');
        text(namecity, mouseX+15, mouseY+20);
        text(namecountry, mouseX+15, mouseY+40);

        
    }
    
    image(img2,pos.x, pos.y, 30,30);
  
  
  }
  
}
} 
if(departData){
  for(var i of departData){
    var flightdx = i.geography.latitude;
    var flightdy = i.geography.longitude;
    var flightdNum = i.flight.iataNumber;
    var flightdDepa = i.departure.iataCode;
    var flightdArr = i.arrival.iataCode;
    var flightDstatus = i.status;
    
    if (airportMap.map.getBounds().contains({lat: flightdx, lng: flightdy})) {
      var fdpos = airportMap.latLngToPixel(flightdx, flightdy);
      var disS = dist(mouseX, mouseY, fdpos.x, fdpos.y);
  
      if(disS<20){
    
        fill('white');
        
        rect(mouseX,mouseY,120,70, 20, 20);
      
        textSize(14);
        fill('black');
        text(flightdNum, mouseX+15, mouseY+20);
        text(flightdDepa+"  ---->  "+flightdArr, mouseX+15, mouseY+40);
        text(flightDstatus,mouseX+15,mouseY+60);


  }
  fill('white');
  image(img1,fdpos.x, fdpos.y,30,30);
  

}}}
//arriving to select airport
if (arrivalData){
  for(var j of arrivalData){
    var flightax = j.geography.latitude;
    var flightay = j.geography.longitude;
    var flightANum = j.flight.iataNumber;
    var flightADepa = j.departure.iataCode;
    var flightAArr = j.arrival.iataCode;
    var flightAstatus = j.status;
    
    if (airportMap.map.getBounds().contains({lat: flightax, lng: flightay})) {
      var fapos = airportMap.latLngToPixel(flightax, flightay);
      var dissA = dist(mouseX, mouseY, fapos.x, fapos.y);
  
      if(dissA<20){
    
        fill('white');
        
        rect(mouseX,mouseY,130,70, 20, 20);
      
        textSize(14);
        fill('black');
        
        text(flightANum, mouseX+15, mouseY+20);
        text(flightADepa+"  ---->  "+flightAArr, mouseX+15, mouseY+40);
        text(flightAstatus,mouseX+15,mouseY+60);
    
}}}

image(img1,fapos.x, fapos.y,30,30);

    }


// Close weather window
if (weatherStatus==true) {
  var country = weather.sys.country;
  var temp = weather.main.temp;
  var humidity = weather.main.humidity;
  var clouds = weather.clouds.all;
  var wind = weather.wind.speed;
  var feels_like = weather.main.feels_like;
 
  
  //City & country name and close window button
  fill('rgb(100%,65%,0%)');
  rect(90, 460, 440, 30, 10, 10, 0, 0);
  fill('black');
  textSize(14);
  textStyle(BOLD);
  text(cityInput.value()+'       '+country,100,480);
  fill('white');
  text('X', 505, 480);

  
  // current weather box
  fill('white');
  rect(90, 490, 150, 140, 0, 0, 0, 10);
  fill('black');
  textSize(12);
  textStyle(NORMAL);
  text('Current Weather', 100, 510);
  text('Temputer', 100, 540);
  text('Feels Like', 100, 560);
  text('Humidity', 100,580);
  text('Clouds', 100, 600);
  text('Wind', 100,620);

  //data text align
  text(temp+' °C', 170, 540);
  text(feels_like+' °C', 170, 560);
  text(humidity+' %', 170,580);
  text(clouds+' %', 170, 600);
  text(wind+' %', 170,620);
 
}
    //draw 2 day weather forecast

if(forecastStatus==true){
for(var forecast1 of forecast.list.slice(5,6)){
 
  var temp1 = forecast1.main.temp;
  var feels1 = forecast1.main.feels_like;
  var humidity1 = forecast1.main.humidity;
  var clouds1 = forecast1.clouds.all;
  var wind1 = forecast1.wind.speed;

  fill('rgb(78%,78%,100%)');
  rect(230, 490, 150, 140);
  fill('black');
  textSize(12);
  text('Weather 24 hours later', 240, 510);
  text('Temputer', 240, 540);
  text('Feels Like', 240, 560);
  text('Humidity', 240, 580);
  text('Clouds', 240, 600); 
  text('Wind', 240, 620);

  //data text align
  text(temp1+' °C', 310, 540);
  text(feels1+' °C', 310, 560);
  text(humidity1+' %', 310, 580);
  text(clouds1+' %', 310, 600); 
  text(wind1+' %', 310, 620);
  
 }

 
 for(var forceast2 of forecast.list.slice(13,14)){
 
  var temp2 = forceast2.main.temp;
  var feels2 = forceast2.main.feels_like;
  var humidity2 = forceast2.main.humidity;
  var clouds2 = forceast2.clouds.all;
  var wind2 = forceast2.wind.speed;

  fill('rgb(78%,78%,100%)');
  rect(370, 490, 160, 140, 0, 0, 10, 0);

  fill('black');
  textSize(12);
  
  text('Weather 48 hours later', 390, 510);
  text('Temputer', 390, 540);
  text('Feels Like', 390, 560);
  text('Humidity', 390, 580);
  text('Clouds', 390, 600); 
  text('Wind', 390, 620);

  //data text align
  text(temp2+' °C', 460, 540);
  text(feels2+' °C', 460, 560);
  text(humidity2+' %', 460, 580);
  text(clouds2+' %', 460, 600); 
  text(wind2+' %', 460, 620);
}

}
}

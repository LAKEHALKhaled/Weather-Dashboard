var nameInputEl = document.querySelector('#cityname');
var userFormEl = document.querySelector('#city-form');
var weatherContainerEl = document.querySelector('#weathers-container');
var cityEl = document.querySelector("#city")
var weatherCityEl = document.querySelector("#cityOfWeather")
var container1El = document.querySelector("#container1")
var container2El = document.querySelector("#container2")
var container3El = document.querySelector("#container3")
var container4El = document.querySelector("#container4")
var container5El = document.querySelector("#container5")
var container6El = document.querySelector("#container6")



 function search (cityname) {
    
    var cities = JSON.parse(localStorage.getItem("citiesList"))  || [] 


    //no existing cityname will be pushed twice to the cities array 
    if(cities.includes(cityname)){
      console.log("city already exist");
     
    } else{
      cities.push(cityname)
      localStorage.setItem("citiesList", JSON.stringify(cities))
      addButton(cityname);
    }
    




   //if it's an existing city name add it to the list otherwise alert enter a valid city name
    if (cityname) {
      getLatlon(cityname);
      weatherCityEl.textContent = cityname
      
      weatherContainerEl.textContent = '';
      container1El.textContent = '';
      container2El.textContent = '';
      container3El.textContent = '';
      container4El.textContent = '';
      container5El.textContent = '';
      container6El.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a city name');
    }
  };





  //use the city API to get the lattitude and longitude to use them for the on call API that provide all week weather and uvi.
  var getLatlon = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1de90d827e463b75865e4df8ff41370b";
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            // console.log(data); 
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            
            getWeather(lat,lon)
            // displayRepos(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };


//using lattitude and longitude from previous API to get all data needed
  var getWeather = function (lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=metric&exclude=hourly,minutely&appid=1de90d827e463b75865e4df8ff41370b";
    
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.daily); 
            
             weatherWeek = data.daily;
             displayWeather(weatherWeek[0],weatherContainerEl)
             displayWeather(weatherWeek[1],container1El)
             displayWeather(weatherWeek[2],container2El)
             displayWeather(weatherWeek[3],container3El)
             displayWeather(weatherWeek[4],container4El)
             displayWeather(weatherWeek[5],container5El)
             displayWeather(weatherWeek[6],container6El)
             
            // displayRepos(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };
  


   
    //this functin is to convert the UNIX time to regular time
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }
  //adding a city to the city list 
function addButton(cityname){
     
          
          var cities = JSON.parse(localStorage.getItem("citiesList"))
          console.log(cities);
          console.log({cityname}); 
              var addCity = document.createElement("button")
                cityEl.appendChild(addCity) 
                addCity.textContent = cityname;
                addCity.setAttribute("class", "btn btn-lg")
                addCity.addEventListener("click", function (event){
                  cityname = event.target.textContent ; 
                  search(cityname)
                })
                
                
            
          
          }     
          // addCity.addEventListener("click", )

//display the weather on the screen
function displayWeather(weather,container){
  weatherDay = weather
  cityname = nameInputEl.value.trim().toUpperCase();
  temp = weather.temp.day
  wind = weather.wind_speed
  humidity =weather.humidity
  uvi = weather.uvi
  date = weather.dt
  date = timeConverter(date)
  icon = weather.weather[0].icon
  console.log(icon);
  icon = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  
    
    // weathrDay1 = weatherWeek[1]
    
    
     




  var weathers1 = document.createElement("button")
  weathers1.setAttribute("class"," btn btn-success flex-row justify-center")
  container.appendChild(weathers1)
  weathers1.textContent =  date ;

  var weathers2 = document.createElement("img")
  weathers2.setAttribute("src", icon)
  weathers2.setAttribute("class", " flex-row")
  container.appendChild(weathers2)

  var weathers3 = document.createElement("h5")
  weathers3.setAttribute("class","flex-row padding")
  container.appendChild(weathers3)
  weathers3.textContent ="Temp: " + temp + " ??F";

  var weathers4 = document.createElement("h5")
  weathers4.setAttribute("class","flex-row padding")
  container.appendChild(weathers4)
  // weathers4.setAttribute("class","flex-row padding")
  weathers4.textContent ="Wind: " + wind + " MPH";

  var weathers5 = document.createElement("h5")
  weathers5.setAttribute("class","flex-row padding")
  container.appendChild(weathers5)
  weathers5.textContent ="Humidity: " + humidity + "%";
  
  var weathers6 = document.createElement("h5")
  weathers6.setAttribute("class","flex-row margin")
  container.appendChild(weathers6)
  weathers6.textContent ="UV index: " + uvi;
  console.log(typeof uvi);
  if (uvi < 3) {
    weathers6.style.backgroundColor = "#5D8233";
  }
  else if( uvi >=3  && uvi <6 ){
    weathers6.style.backgroundColor = "#E8E46E";
  }
  else if( uvi >=6 && uvi <8){
    weathers6.style.backgroundColor = "#F3C583";
  }
  else if( uvi >=8 && uvi <11){
    weathers6.style.backgroundColor = "#DF5E5E";
  }
  else{
    weathers6.style.backgroundColor = "#D62AD0";
  }
}


  userFormEl.addEventListener('submit', function(event){
    event.preventDefault();
    var cityname = nameInputEl.value.trim().toUpperCase();
    search(cityname)
  });
//   var cities = JSON.parse(localStorage.getItem("citiesList"))
//  
   
 
//     console.log(event.target.textContent);
//   })
var cities = JSON.parse(localStorage.getItem("citiesList"))  || [] 
for(i=0;i<cities.length;i++){
  addButton(cities[i])
}

var nameInputEl = document.querySelector('#cityname');
var userFormEl = document.querySelector('#city-form');
var weatherContainerEl = document.querySelector('#weathers-container');
var cityEl = document.querySelector("#city")
var weatherCityEl = document.querySelector("#cityOfWeather")
var container1El = document.querySelector("#container1")

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname = nameInputEl.value.trim().toUpperCase();
    var cities = JSON.parse(localStorage.getItem("citiesList"))  || [] 
    cities.push(cityname)
    localStorage.setItem("citiesList", JSON.stringify(cities))
   
    if (cityname) {
      getLatlon(cityname);
      addButton(cityname);
      weatherCityEl.textContent = cityname
      
      
    
      weatherContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };

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
  var getWeather = function (lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=metric&exclude=hourly,minutely&appid=1de90d827e463b75865e4df8ff41370b";
    
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.daily); 
            
             weatherWeek = data.daily;
             displayWeather(weatherWeek[1],weatherContainerEl)
             displayWeather(weatherWeek[2],container1El)
             
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
 


   
    
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }
  
function addButton(cityname){
      var addCity = document.createElement("button")
          cityEl.appendChild(addCity)   
          addCity.textContent = cityname;
          addCity.setAttribute("class", "btn btn-success btn-lg")
          
          // addCity.addEventListener("click", )
}

function displayWeather(weather, container){
  weatherDay = weatherWeek
  cityname = nameInputEl.value.trim().toUpperCase();
  temp = weatherDay.temp.day
  wind = weatherDay.wind_speed
  humidity =weatherDay.humidity
  uvi = weatherDay.uvi
  date = weatherDay.dt
  date = timeConverter(date)
  icon = weatherDay.weather[0].icon
  console.log(icon);
  icon = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  
    
    // weathrDay1 = weatherWeek[1]
    
    
     




  var weathers1 = document.createElement("button")
  weathers1.setAttribute("class"," btn btn-success flex-row")
  weatherContainerEl.appendChild(weathers1)
  weathers1.textContent =  date ;

  var weathers2 = document.createElement("img")
  weathers2.setAttribute("src", icon)
  weathers2.setAttribute("class", " flex-row")
  weatherContainerEl.appendChild(weathers2)

  var weathers3 = document.createElement("div")
  weathers3.setAttribute("class","flex-row ")
  weatherContainerEl.appendChild(weathers3)
  weathers3.textContent ="Temp: " + temp + " °F";

  var weathers4 = document.createElement("div")
  weathers4.setAttribute("class","flex-row btn ")
  weatherContainerEl.appendChild(weathers4)
  weathers4.setAttribute("class","flex-row ")
  weathers4.textContent ="Wind" + wind + "MPH";

  var weathers5 = document.createElement("div")
  weathers5.setAttribute("class","flex-row ")
  weatherContainerEl.appendChild(weathers5)
  weathers5.textContent ="Humidity: " + humidity + "%";
  
  var weathers6 = document.createElement("div")
  weathers6.setAttribute("class","flex-row ")
  weatherContainerEl.appendChild(weathers6)
  weathers6.textContent ="UV index: " + uvi;
}


  userFormEl.addEventListener('submit', formSubmitHandler);
  
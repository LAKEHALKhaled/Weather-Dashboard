var nameInputEl = document.querySelector('#cityname');
var userFormEl = document.querySelector('#city-form');
var repoContainerEl = document.querySelector('#weathers-container');
var cityEl = document.querySelector("#city")


var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname = nameInputEl.value.trim();
    var cities = JSON.parse(localStorage.getItem("citiesList"))  || [] 
    cities.push(cityname)
    localStorage.setItem("citiesList", JSON.stringify(cities))
   
    if (cityname) {
      getLatlon(cityname);
      
      repoContainerEl.textContent = '';
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=imperial&exclude=hourly,minutely&appid=1de90d827e463b75865e4df8ff41370b";
    
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.daily); 
            weatherWeek = data.daily;
            for(i=0;i<7;i++){
              
              weatherDay = weatherWeek[i]
              day = weatherDay.dt
              temp = weatherDay.temp.day
              wind = weatherDay.wind_speed
              humidity =weatherDay.humidity
              uvi = weatherDay.uvi
              console.log(temp,wind,humidity,uvi);
              console.log(weatherDay);
              
            }
            dateTo = moment(new Date()).format('YYYY-MM-DD');
            dateFrom = moment(new Date() - 7).format('YYYY-MM-DD')
            console.log(dateTo);
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
  userFormEl.addEventListener('submit', formSubmitHandler);


   
    

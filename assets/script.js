// var APIKey = '9a7846c4d42fa23a212917672d587d16';
var searchForm = document.querySelector('#search-form');
var input = document.querySelector('#input');
var recentSearches = document.querySelector('.recent');
var weatherToday = document.querySelector('#weather-today');
var forecast = document.querySelector('#forecast');

var city;
// HOW TO FORMAT FETCH REQUEST:

// var apiUrl = 'SOME_URL';

// fetch(apiUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = input.value.trim();

  if (city) {
    getWeather(city);

    var li = document.createElement('li');
    li.textContent = city;
    recentSearches.appendChild(li);

    input.value = '';
  } else {
    alert('Please enter a city name')
  }
}

var getWeather = function (city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9a7846c4d42fa23a212917672d587d16"

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to today\'s weather');
    });
}

function displayWeather(weatherData) {
  // Update Today's weather section
  var todayWeatherHtml = '';
  todayWeatherHtml += '<div>City: ' + weatherData.name + '</div>';
  todayWeatherHtml += '<div>Temperature: ' + weatherData.main.temp + '</div>';
  todayWeatherHtml += '<div>Description: ' + weatherData.weather[0].description + '</div>';
  todayWeatherHtml += '<div>Humidity: ' + weatherData.main.humidity + '</div>';
  todayWeatherHtml += '<div>Wind Speed: ' + weatherData.wind.speed + '</div>';
  weatherToday.innerHTML = todayWeatherHtml;

  // Update 5-day Forecast section
  var forecastHtml = '';
  // Add your code here to generate the HTML for the forecast section
  forecast.innerHTML = forecastHtml;
}


searchForm.addEventListener('submit', formSubmitHandler);
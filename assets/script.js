var searchForm = document.querySelector('#search-form');
var input = document.querySelector('#input');
var recentSearches = document.querySelector('.recent');
var weatherToday = document.querySelector('#weather-today');
var forecast = document.querySelector('#forecast');

var city;

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
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=9a7846c4d42fa23a212917672d587d16"

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
      alert('Unable to connect to weather forecast');
    });
}

function displayWeather(weatherData) {
  // Update Today's weather section
  var todayWeatherHtml = '';
  todayWeatherHtml += '<div>City: ' + weatherData.city.name + '</div>';

  // Convert the temperature value from Kelvin to Fahrenheit
  var tempF = (weatherData.list[0].main.temp - 273.15) * 1.8 + 32;

  todayWeatherHtml += '<div>Temperature: ' + tempF.toFixed(2) + '&deg;F</div>'; // Display the temperature in Fahrenheit
  todayWeatherHtml += '<div>Description: ' + weatherData.list[0].weather[0].description + '</div>';
  todayWeatherHtml += '<div>Humidity: ' + weatherData.list[0].main.humidity + '</div>';
  todayWeatherHtml += '<div>Wind Speed: ' + weatherData.list[0].wind.speed + '</div>';
  weatherToday.innerHTML = todayWeatherHtml;

  // Update 5-day Forecast section
  var forecastHtml = '';
  for (var i = 0; i < weatherData.list.length; i++) {
    if (weatherData.list[i].dt_txt.indexOf('15:00:00') !== -1) {

      // Convert the temperature value from Kelvin to Fahrenheit
      var tempF = (weatherData.list[i].main.temp - 273.15) * 1.8 + 32;

      var iconCode = weatherData.list[i].weather[0].icon;
      var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';

      forecastHtml += '<div class="col-md-2 card bg-primary text-white p-2">';
      forecastHtml += '<h5>' + new Date(weatherData.list[i].dt_txt).toLocaleDateString() + '</h5>';
      forecastHtml += '<img src="' + iconUrl + '" alt="' + weatherData.list[i].weather[0].description + '">';
      forecastHtml += '<h6>' + weatherData.list[i].weather[0].description + '</h6>';
      forecastHtml += '<div>Temp: ' + tempF.toFixed(2) + '&deg;F</div>'; // Display the temperature in Fahrenheit
      forecastHtml += '<div>Humidity: ' + weatherData.list[i].main.humidity + '%</div>';
      forecastHtml += '<div>Wind: ' + weatherData.list[i].wind.speed + ' MPH</div>';
      forecastHtml += '</div>';
    }
  }
  forecast.innerHTML = forecastHtml;
}




searchForm.addEventListener('submit', formSubmitHandler);
recentSearches.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    var city = event.target.textContent;
    getWeather(city);
  }
});

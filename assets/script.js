var APIKey = '9a7846c4d42fa23a212917672d587d16';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


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

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
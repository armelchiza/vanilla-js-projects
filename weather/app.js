// (function() {
//     var cors_api_host = 'cors-anywhere.herokuapp.com';
//     var cors_api_url = 'https://' + cors_api_host + '/';
//     var slice = [].slice;
//     var origin = window.location.protocol + '//' + window.location.host;
//     var open = XMLHttpRequest.prototype.open;
//     XMLHttpRequest.prototype.open = function() {
//         var args = slice.call(arguments);
//         var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//         if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//             targetOrigin[1] !== cors_api_host) {
//             args[1] = cors_api_url + args[1];
//         }
//         return open.apply(this, args);
//     };
// })();
//
// fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5612f1c3bb6024a6eb085d59521682c7/37.8267,-122.4233')
// .then(response => response.json())
// .then(data => console.log(data));
//
// fetch('https://maps.googleapis.com/maps/api/geocode/json?address=montreal&key=AIzaSyCwIFlJ04Kriz1t3-SFsjECZoDnEbudFBU')
// .then(response => response.json())
// .then(data => console.log(data));

// unclean 1/2 ___________________________________________________________________

// var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
// var DARKSKY_API_KEY = '5612f1c3bb6024a6eb085d59521682c7';
// var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
//
// var GOOGLE_MAPS_API_KEY = 'AIzaSyCwIFlJ04Kriz1t3-SFsjECZoDnEbudFBU';
// var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
//
//
// // This function returns a promise that will resolve with an object of lat/lng coordinates
// function getCoordinatesForCity(cityName) {
//   // This is an ES6 template string, much better than verbose string concatenation...
//   var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
//
//   return (
//     fetch(url) // Returns a promise for a Response
//     .then(response => response.json()) // Returns a promise for the parsed JSON
//     .then(data => data.results[0].geometry.location) // Transform the response to only take what we need
//   );
// }
//
// // getCoordinatesForCity("montreal").then(console.log);
//
// function getCurrentWeather(coords) {
//   // Template string again! I hope you can see how nicer this is :)
//   var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
//
//   return (
//     fetch(url)
//     .then(response => response.json())
//     .then(data => data.currently)
//   );
// }

// getCurrentWeather({lat: 45.5, lng: -73.5}).then(console.log);

// getCoordinatesForCity("montreal")
// .then(getCurrentWeather)
// .then(data => console.log(`The current temperature is ${data.temperature}`));

// unclean 2/2 ___________________________________________________________________
            // var app = document.querySelector('#app');
            // var cityForm = app.querySelector('.city-form');
            // var cityInput = cityForm.querySelector('.city-input');
            // var getWeatherButton = cityForm.querySelector('.get-weather-button');
            // var cityWeather = app.querySelector('.city-weather');


// getWeatherButton.addEventListener('submit', function() {
//   // submit could be click
//   var city = cityInput.value; // Grab the current value of the input   <-   !!!
//
//   getCoordinatesForCity(city) // get the coordinates for the input city
//   .then(getCurrentWeather) // get the weather for those coordinates
//   .then(function(weather) {
//     cityWeather.innerText = 'Current temperature: ' + weather.temperature;
//   });
// });                                                          >>    VS ::


// cityForm.addEventListener('submit', function(event) { // this line changes
//   event.preventDefault(); // prevent the form from submitting
//
//   // This code doesn't change!
//   var city = cityInput.value;
//
//   getCoordinatesForCity(city)
//   .then(getCurrentWeather)
//   .then(function(weather) {
//     cityWeather.innerText = 'Current temperature: ' + weather.temperature;
//   });
// });








(function() {

  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '5612f1c3bb6024a6eb085d59521682c7';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyCwIFlJ04Kriz1t3-SFsjECZoDnEbudFBU';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}`;

    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.currently)
    );
  }

  function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.results[0].geometry.location)
    );
  }

  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');

  cityForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting

    var city = cityInput.value;

    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather) {
      cityWeather.innerText = 'Current temperature: ' + weather.temperature;
    })
  });
})();








// var app = document.querySelector('#app');
//
// var theLink = document.createElement('a');
// theLink.innerText = 'a link to DecodeMTL';
// theLink.setAttribute('href', 'http://www.decodemtl.com'); // This is how we set HTML attributes ;)
// app.appendChild(theLink);
//
// theLink.addEventListener('click', function(event) {
//   event.preventDefault();
//   console.log('Prevented browsing to ' + this.href + ' by using preventDefault');
//   console.log(event);
// });


// var request = require('request-promise');
// GOOGLE API
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCwIFlJ04Kriz1t3-SFsjECZoDnEbudFBU
//
// var request = require('request-promise');
// // Euclidian distance between two points
// function getDistance(pos1, pos2) {
//   return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
// }
//
// function getIssPosition() {
//   return request("http://api.open-notify.org/iss-now.json")
//   .then(
//     function(responce) {
//       // Parse as JSON
//       // Return object with lat and lng
//       var returned = {lat: 0, lng: 0};
//       returned.lat = JSON.parse(responce).iss_position.latitude;
//       returned.lng = JSON.parse(responce).iss_position.longitude;
//       return(returned);
//     }
//   )
// }
//
// function getAddressPosition(address) {
//    var link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA20qf0-wOeSRHUynZN4VXwzRaZ9_GEzfw"
//   return request(link)
//   .then(
//     function(response) {
//       var newResponse = JSON.parse(response);
//       var yourPosition = newResponse.results[0].geometry.location;
//       return(yourPosition);
//     }
//   )
// }
//
// // API KEY : AIzaSyA20qf0-wOeSRHUynZN4VXwzRaZ9_GEzfw
// function getCurrentTemperatureAtPosition(position) {
//   var key = "5612f1c3bb6024a6eb085d59521682c7";
//   var latitude = position.lat;
//   var longitude = position.lng;
//   var link = "https://api.darksky.net/forecast/" + key +
// "/" + latitude + "," + longitude;
//   return request(link).then( // makes a request for the JSON object from DarkSky
//     function(theresponse) {
//       var response = JSON.parse(theresponse);
//       console.log(response.currently.temperature);
//       return(response.currently.temperature);
//     }
//   )
// }

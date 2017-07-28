var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=be7e284c7c8bc84c932bccd6c537f5b7&text=';

function getPhotosForSearch(term){
  console.log('hello');

  return fetch(FLICKR_API_URL + term)
  .then(response => response.json())
  .then(responses => {
    return responses.photos.photo;})
  .then(pics => {
    return pics.map(function(pic){
    var farm_id = pic.farm;
    var server_id = pic.server;
    var id = pic.id;
    var secret = pic.secret;
    var returning = {};
    returning.thumb = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_t.jpg`;
    returning.large = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_b.jpg`;
    returning.title = pic.title;
    return (returning);
  })} )
  //.then(flickr => console.log(flickr))
  // thumb, large and title
}



function createFlickrThumb(photoData) {
  var link = document.createElement('a');
  link.setAttribute('href', photoData.large);
  link.setAttribute('target', '_blank');

  var image = document.createElement('img');
  image.setAttribute('src', photoData.thumb); // thumb or large
  image.setAttribute('alt', photoData.title);

  link.appendChild(image);

  return link;
}

getPhotosForSearch("corn")
.then(photoDatas => {
  return photoDatas.map(function(photoData){
    return (createFlickrThumb(photoData))
  })
})
.then(links => {
  links.forEach(link => {
    var app = document.querySelector('#app');
    app.appendChild(link);
  })
});



  // function getCurrentWeather(coords) {
  //   var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}`;
  //
  //   return (
  //     fetch(url)
  //     .then(response => response.json())
  //     .then(data => data.currently)
  //   );
  // }
  //
  // function getCoordinatesForCity(cityName) {
  //   var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
  //
  //   return (
  //     fetch(url)
  //     .then(response => response.json())
  //     .then(data => data.results[0].geometry.location)
  //   );
  // }
  //
  // var app = document.querySelector('#app');
  // var cityForm = app.querySelector('.city-form');
  // var cityInput = cityForm.querySelector('.city-input');
  // var getWeatherButton = cityForm.querySelector('.get-weather-button');
  // var cityWeather = app.querySelector('.city-weather');
  //
  // cityForm.addEventListener('submit', function(event) {
  //   event.preventDefault(); // prevent the form from submitting
  //
  //   var city = cityInput.value;
  //
  //   getCoordinatesForCity(city)
  //   .then(getCurrentWeather)
  //   .then(function(weather) {
  //     cityWeather.innerText = 'Current temperature: ' + weather.temperature;
  //   })
  // });
// })();

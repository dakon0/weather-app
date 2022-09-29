const key = '4fa592d94426516b6e4d2bdb8f30b2dd';

function weatherBalloon( location ) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + key)
  .then(function(resp) {
    console.log('we do have a resp');
    return resp.json();//converting data to json
   })
  .then(function(data) {
    console.log(data);
      const temp = data.main.temp;
      const loc = data.name;
    document.querySelector('.temp').textContent = temp;
    document.querySelector('.location').textContent = loc;
  })
  .catch(function(error) { console.log('Caught an error: ', error)});
}

function weatherBalloonLoc( latitude, longitude ) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
  .then(function(resp) {
    console.log('we do have a resp');
    return resp.json();//converting data to json
   })
  .then(function(data) {
    console.log(data);
      const temp = data.main.temp;
      const loc = data.name;
    document.querySelector('.temp').textContent = temp;
    document.querySelector('.location').textContent = loc;
  })
  .catch(function(error) { console.log('Caught an error: ', error)});
}

function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    weatherBalloonLoc(latitude, longitude);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }


}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

weatherBalloon('Berlin');

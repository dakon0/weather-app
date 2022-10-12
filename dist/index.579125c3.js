const key = "4fa592d94426516b6e4d2bdb8f30b2dd"; //openweathermap API key
const tempPara = document.querySelector(".temp");
const unitsCheck = document.querySelector(".unitsCheck");
const humidityPara = document.querySelector(".humidity");
const windPara = document.querySelector(".wind");
const weatherDescPara = document.querySelector(".weather-description");
const city = document.querySelector(".location");
// const tempUnits = document.querySelector('.tempUnits');
const input = document.querySelector(".input-location-name");
const datePara = document.querySelector(".date");
let temp;
let date;
function getWeatherByCity(location) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + key).then(function(resp) {
        return resp.json(); //converting data to json
    }).then(function(data) {
        console.log(data);
        if (!unitsCheck.checked) temp = (data.main.temp - 273.15).toFixed(2);
        else if (unitsCheck.checked) temp = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
        tempPara.textContent = temp;
        city.textContent = data.name;
        humidityPara.textContent = `${data.main.humidity}%`;
        windPara.textContent = `${data.wind.speed} m/s`;
        weatherDescPara.textContent = data.weather[0].description;
        date = `${Date().slice(0, 3)}, ${Date().slice(9, 11)}${Date().slice(4, 8)}${Date().slice(11, 16)}`;
        datePara.textContent = date;
    }).catch(function(error) {
        console.log("Caught an error: ", error);
    });
}
function getWeatherBylatlon(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`).then(function(resp) {
        return resp.json(); //converting data to json
    }).then(function(data) {
        if (!unitsCheck.checked) temp = (data.main.temp - 273.15).toFixed(2);
        else if (unitsCheck.checked) temp = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
        tempPara.textContent = temp;
        city.textContent = data.name;
        humidityPara.textContent = `${data.main.humidity}%`;
        windPara.textContent = `${data.wind.speed} m/s`;
        weatherDescPara.textContent = data.weather[0].description;
    }).catch(function(error) {
        console.log("Caught an error: ", error);
    });
}
function getLocalWeather() {
    const status = document.querySelector("#status");
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherBylatlon(latitude, longitude);
    }
    function error() {
        status.textContent = "Unable to retrieve your location";
    }
    if (!navigator.geolocation) status.textContent = "Geolocation is not supported by your browser";
    else navigator.geolocation.getCurrentPosition(success, error);
}
function kelvins2Ferenheits(tempInKelvins) {
    return (tempInKelvins - 273.15).toFixed(2);
}
function kelvins2Celsius(tempInKelvins) {
    return ((tempInKelvins - 273.15) * 9 / 5 + 32).toFixed(2);
}
function ferenheit2Celsius(tempInFerenheit) {
    return ((tempInFerenheit - 32) * 5 / 9).toFixed(2);
}
function celsius2Ferenheit(tempInCelsius) {
    return (tempInCelsius * 9 / 5 + 32).toFixed(2);
}
// Main Code:
document.querySelector("#find-loc-weather").addEventListener("click", getLocalWeather);
unitsCheck.addEventListener("change", ()=>{
    if (!unitsCheck.checked) tempPara.textContent = temp = ferenheit2Celsius(temp);
    else if (unitsCheck.checked) tempPara.textContent = temp = celsius2Ferenheit(temp);
});
input.addEventListener("keypress", (event)=>{
    if (event.key === "Enter") {
        event.preventDefault();
        getWeatherByCity(input.value);
        input.value = "";
    }
    console.log(event);
});
getWeatherByCity("London");

//# sourceMappingURL=index.579125c3.js.map

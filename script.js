// Date and Time
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayTime = document.querySelector("#currentTime");
displayTime.innerHTML = `${hours}:${minutes}`;

let year = now.getFullYear();
let date = now.getDate();
let month = now.getMonth();
if (month < 10) {
  month = `0${month}`;
}

let displayDate = document.querySelector("#currentDate");
displayDate.innerHTML = `${year}.${month}.${date}`;

// Search

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  let units = "metric";
  let apiKey = "ae257b6f200fc59e9f754b38798d7627";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let searchEvent = document.querySelector("#changeCity");
searchEvent.addEventListener("submit", search);

// Weather
function showWeather(response) {
  let city = document.querySelector("#curCity");
  let cityName = response.data.name;
  city.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-cur");
  temperatureElement.innerHTML = temperature;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-cur");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind-cur");
  windElement.innerHTML = `${wind}km/h`;

  let clouds = response.data.weather[0].description;
  let cloudsElement = document.querySelector("#clouds-cur");
  cloudsElement.innerHTML = clouds;
}

// Current location
function locationButton(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ae257b6f200fc59e9f754b38798d7627";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  function showTemperature(position) {
    let currentTemperature = Math.round(position.data.main.temp);
    let temperatureCur = document.querySelector("#temperature-cur");
    temperatureCur.innerHTML = currentTemperature;
    let city = document.querySelector("#curCity");
    let cityName = position.data.name;
    city.innerHTML = cityName;
    let humidity = position.data.main.humidity;
    let humidityElement = document.querySelector("#humidity-cur");
    humidityElement.innerHTML = `${humidity}%`;
    let wind = position.data.wind.speed;
    let windElement = document.querySelector("#wind-cur");
    windElement.innerHTML = `${wind}km/h`;
    let clouds = position.data.weather[0].description;
    let cloudsElement = document.querySelector("#clouds-cur");
    cloudsElement.innerHTML = clouds;
  }
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationButton);
}
let locationCurrent = document.querySelector("#locationSearch");
locationCurrent.addEventListener("click", getCurrentPosition);
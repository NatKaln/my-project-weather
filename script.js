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

//display correct days with forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <strong>${formatDay(forecastDay.dt)}</strong> <br />
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ae257b6f200fc59e9f754b38798d7627";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-cur");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-cur");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celcium-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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

let celsiusTemperature = null;

search("Kyiv");

//Time and day

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(
            forecastDay.time
          )}</div>
          <img src= "${forecastDay.condition.icon_url.replace(
            "http://",
            "https://"
          )}" alt="${forecastDay.condition.icon}" width="42" />
          <div class="wather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temperature.maximum
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}° </span>
          </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;

  let displayWeather = document.querySelector("#weather-display");
  displayWeather.style.display = "block";
}

function getForecast(coordinates) {
  let apiKey = "03tfb48099c19775o01bafce7bdf4d20";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Display weather

function displayWeather(response) {
  //document.querySelector("#city").innerHTML = response.data.name;
  //document.querySelector(".temperature").innerHTML = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city");
  let condition = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  condition.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url.replace("http://", "https://")
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

// Search engine

function search(city) {
  let apiKey = "03tfb48099c19775o01bafce7bdf4d20";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//search("London");

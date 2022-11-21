
// CURRENT DATE AND TIME
let now = new Date();

let currentDate = document.querySelector("#time-day");


let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
let currentDay = days[now.getDay()];

currentDate.innerHTML = `${currentHour}:${currentMinutes}, ${currentDay} `;

// TAKE API RESPONSE AND DISPLAY DATA

function displayWeatherCondition(response) {
  
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#current-windspeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  
}
// DEFAULT CITY DISPLAY
function searchCity(city) {
  const apiKey = "d75be4ab28304d8abb6b825bbe55e153";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayWeatherCondition); 
  
}
// API REQUEST
function handleSubmit(event) {
  event.preventDefault();
  
  const city = document.querySelector("#search-text-input").value;
  searchCity(city);
 
}
// CURRENT LOCATION
function searchLocation(position) {
  let apiKey = "d75be4ab28304d8abb6b825bbe55e153";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

const currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Vyshhorod"); // DEFAULT CITY DISPLAY

 // CHANGE CELSIIY FARENGEIT INDICATOR

let isCelsiy = true;

function onFarengeit() {
  if (isCelsiy === true) { 
    let farengeit = document.querySelector("#current-temperature");
    farengeit.innerHTML = `${Math.round(parseInt(farengeit.textContent) * 9 / 5 + 32)}`;

    isCelsiy = false;
  }
}

function onCelsiy() {
  if (isCelsiy === false) {
    let celsius = document.querySelector("#current-temperature");
    celsius.innerHTML = `${Math.round((5 / 9) * (parseInt(celsius.textContent) - 32))}`;

    isCelsiy = true;
  }
}

let celsiy = document.querySelector("#indicator-celsiy");
let farengeit = document.querySelector("#indicator-farengeit");

celsiy.addEventListener("click", onCelsiy);
farengeit.addEventListener("click", onFarengeit);


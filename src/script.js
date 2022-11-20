
// CURRENT DATE AND TIME
let now = new Date();

let currentDate = document.querySelector("#time-day");


let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
let currentDay = days[now.getDay()];

currentDate.innerHTML = `${currentHour}:${currentMinutes}, ${currentDay} `;

// CHANGE TOWN IN FORM INPUT
function seachTown(event) {
  event.preventDefault();
  
    let seachInput = document.querySelector("#search-text-input");
    let inputedCity = document.querySelector("h1");
    inputedCity.innerHTML = `${seachInput.value}`;
    const apiKey = "d75be4ab28304d8abb6b825bbe55e153";
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${seachInput.value}&units=metric&appid=${apiKey}`;
   axios.get(`${apiUrl}&appiid=${apiKey}`).then(showTemperature);
  

}
  let form = document.querySelector("#search-form");
form.addEventListener("submit", seachTown);

// CHANGE TEMPERATURE, DESCRIPTION, HUMINIDY, WIND SPEED
function showTemperature(response) {
  // console.log(response)
        
    const temperature = Math.round(response.data.main.temp);
    const temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;

    const weatherDescription = response.data.weather[0].description;
  const descriptionElement = document.querySelector("#weather-description");

 descriptionElement.innerHTML = `${weatherDescription}`;

  const humidity = Math.round(response.data.main.humidity);
  
  const humidityElement = document.querySelector("#current-humidity");

  humidityElement.innerHTML = `${humidity}%`;

  const windSpeed = Math.round(response.data.wind.speed);
  const windElement = document.querySelector("#current-windspeed");

  windElement.innerHTML = `${windSpeed}km/h`;
  
 
      }




// CURRENT BUTTON

function takePosition(position) {
  
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
 const apiKey = "d75be4ab28304d8abb6b825bbe55e153";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
 axios.get(`${apiUrl}&appiid=${apiKey}`).then(showTemperature, showCityName);
   
}
 
function getCurrentPosition() {
  
  navigator.geolocation.getCurrentPosition(takePosition);
  }

const currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click",getCurrentPosition);

function showCityName(response) {
  console.log(response)
  console.log(response.data.name);
           const cityName = response.data.name;
  const nameElement = document.querySelector("h1");

  nameElement.innerHTML = `${cityName}`;
 
      }



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



// function handlePosition(position) {
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
//   const lati = position.coords.latitude;
//   const longi = position.coords.latitude;
//  const apiKey = "d75be4ab28304d8abb6b825bbe55e153";
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=${apiKey}`;
//   axios.get(`${apiUrl}&appiid=${apiKey}`).then(showTemperature);
// }

// navigator.geolocation.getCurrentPosition(handlePosition);


// function showTemperature(response) {
        
//     const temperature = Math.round(response.data.main.temp);
//     const temperatureElement = document.querySelector("h1");
//   temperatureElement.innerHTML = `${temperature} C`
 
//     console.log(response.data.main.temp);
//       }
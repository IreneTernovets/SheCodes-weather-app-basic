function transformedDate(timestamp) {
let date = new Date(timestamp * 1000);
let hours = date.getHours();
let minutes = date.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
if (minutes < 10) {
    minutes = `0${minutes}`;
}
if (hours < 10) {
    hours = `0${hours}`;
}
return `${day} ${hours}:${minutes}`;
}

function formatDay (timestamp) {
let date = new Date(timestamp * 1000)
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}


function displayForecastForWeek(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#weather-forecast");
let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index){
    if (index < 4) {
     forecastHTML = forecastHTML + `
<div class="col">
    <ul class="forecast-day">
        <li class="forecast-day-name">${formatDay(forecastDay.dt)}</li>
        <li><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width = "50"></li>
        <li class="forecast-day-temperature"><span class="temp-max">${Math.round(forecastDay.temp.max)}°</span><span class="temp-min">${Math.round(forecastDay.temp.min)}°</span></li>   
    </ul>
</div>`;
    }   
})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
    let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
    let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecastForWeek);
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#cityName");
    let tempretatureInCelsius = document.querySelector("#temperature");
    let weatherDescription = document.querySelector("#forecastDescription");
    let humidityElement = document.querySelector("#humidity");
    let windVelocity = document.querySelector("#windSpeed");
    let currentDate = document.querySelector("#date");
    let iconElement = document.querySelector("#weather-icon");
    let icon = response.data.weather[0].icon;

    cityElement.innerHTML = response.data.name;
    celsiusTemperature = response.data.main.temp;
    tempretatureInCelsius.innerHTML = Math.round(celsiusTemperature);
    weatherDescription.innerHTML = response.data.weather[0].description; 
    humidityElement.innerHTML = response.data.main.humidity;
    windVelocity.innerHTML = Math.round((response.data.wind.speed * 3600) / 1000);
    currentDate.innerHTML = `Last update: ${transformedDate(response.data.dt)}`;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

    getForecast(response.data.coord);
}
function search(city) {
let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(urlApi).then(displayTemperature);    
}
function handleSubmit(respond) {
respond.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value); 
}

function displayInFahrenhait(event) {
event.preventDefault();
let tempretatureInCelsius = document.querySelector("#temperature");
let fahrenhaitTemperature = (celsiusTemperature * 9) / 5 + 32;
tempretatureInCelsius.innerHTML = Math.round(fahrenhaitTemperature);
celsiusLink.classList.remove("active");
fahrenhaitLink.classList.add("active");
}

function displayInCelsius(event) {
    event.preventDefault();
    let tempretatureInFahrenhait = document.querySelector("#temperature");
    tempretatureInFahrenhait.innerHTML = Math.round(celsiusTemperature);
    fahrenhaitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenhaitLink = document.querySelector("#fahrenhait-link");
fahrenhaitLink.addEventListener("click", displayInFahrenhait);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayInCelsius);

let celsiusTemperature = null;

search("Tokyo");
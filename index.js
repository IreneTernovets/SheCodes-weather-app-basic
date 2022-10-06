function transformedDate(timestamp) {
let date = new Date(timestamp);
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

function displayForecast(response) {
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
}
function search(city) {
let apiKey = "2ee22b85e49eeb365b43bd7a023f52ac";
let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(urlApi).then(displayForecast);    
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
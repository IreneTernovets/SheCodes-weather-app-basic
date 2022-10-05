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
    cityElement.innerHTML = response.data.name;
    let tempretatureInCelsius = document.querySelector("#tempCelsius");
    tempretatureInCelsius.innerHTML = Math.round(response.data.main.temp);
    let weatherDescription = document.querySelector("#forecastDescription");
    weatherDescription.innerHTML = response.data.weather[0].description; 
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windVelocity = document.querySelector("#windSpeed");
    windVelocity.innerHTML = Math.round((response.data.wind.speed * 3600) / 1000);
    let currentDate = document.querySelector("#date");
    currentDate.innerHTML = `Last update: ${transformedDate(response.data.dt)}`;
    let iconElement = document.querySelector("#weather-icon");
    let icon = response.data.weather[0].icon;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Kyiv");
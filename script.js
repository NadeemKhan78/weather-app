// Declaring Variable
const city = document.querySelector(".city--name");
const weatherIcon = document.querySelector(".weather--icon");
const descriptionTxt = document.querySelector(".description");
const humidityTxt = document.querySelector(".humidity");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind");
const searchBtn = document.querySelector(".search--btn");
const input = document.querySelector(".search--bar");
///////////////////////////////////////////////

// Weather API
let weather = {
  apikey: "b9e978be97b8629f386d5ad93adf0e66",

  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    try {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      city.innerText = name;
      weatherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
      descriptionTxt.innerText = description;
      humidityTxt.innerText = `Humidity: ${humidity}%`;
      temperature.innerText = `${Math.trunc(temp)}°C`;
      windSpeed.innerText = `Wind Speed: ${speed} km/h`;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + " ')";
    } catch (err) {
      alert("Invalid City Name");
    }
  },

  search: function () {
    weather.fetchWeather(input.value);
    input.value = "";
  },
};
//////////////////////////////////////////////

// Implementing Search button
searchBtn.addEventListener("click", weather.search);

// Implementing enter button
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    weather.search();
    input.value = "";
  }
});

// Default Location
weather.fetchWeather("London");

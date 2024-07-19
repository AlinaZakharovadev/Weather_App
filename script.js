const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box .weather");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
  const APIkey = "4194b8bf4c16a585ff51fdc9a8bc24ee";
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value.trim();

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((json) => {
      updateWeatherUI(json);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("City not found! Please enter a valid city name.");
      cityInput.value = "";
    });
});

const updateWeatherUI = (json) => {
  const image = document.querySelector(".weather-box .weather img");
  const temperature = document.querySelector(
    ".weather-box .weather .temperature"
  );
  const description = document.querySelector(
    ".weather-box .weather .description"
  );
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  const weatherIcons = {
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Snow: "images/snow.png",
    Clouds: "images/cloud.png",
    Mist: "images/mist.png",
    Haze: "images/mist.png",
  };

  image.src = weatherIcons[json.weather[0].main] || "images/cloud.png";
  temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${Math.round(json.wind.speed)}km/h`;

  weatherBox.style.opacity = "1";
  weatherDetails.style.opacity = "1";
};

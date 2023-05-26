const weatherContainer = document.getElementById("weatherContainer");
let count = 2;
weatherContainer.addEventListener("click", changeBG);

function changeBG() {
  if (count > 4) {
    count = 1;
  }
  const srcLink = `./img/gif${count}.gif`;
  weatherContainer.style.backgroundImage = "url(" + srcLink + ")";
  count++;
}

getIp();
async function getIp() {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const obj = await response.json();
  const { city, latitude, longitude } = obj;
  getWeather(city, latitude, longitude);
  get3DaysWeather(city, latitude, longitude);
}

async function getWeather(city, latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const weather = await response.json();
  const { temperature, windspeed, weathercode } = weather.current_weather;
  renderWeather(city, temperature, windspeed, weathercode);
}

async function renderWeather(city, temperature, windspeed, weathercode) {
  const weatherDescr = getWeatherByCode(weathercode);
  const element = `
  <div id="city">
  <img src="./img/geo.png" alt="geo" class="geo">
  ${city}</div>
  <div id="temperature">
  <img src="./img/temp.png" alt="temperature" class="temp">
  ${temperature}</div>
  <div id="windspeed">
  <img src="./img/wind.png" alt="windSpeed" class="wind">   
  <p>Wind speed:<br> ${windspeed} km/h </p>   
  </div>
  <div id="weatherDescr">${weatherDescr}</div>
  `;

  weatherContainer.insertAdjacentHTML("afterbegin", element);
}

function getWeatherByCode(weathercode) {
  switch (weathercode) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing<br>rime fog";
    case 51:
      return "Drizzle:<br>light intensity";
    case 53:
      return "Drizzle:<br>moderate intensity";
    case 55:
      return "Drizzle:<br>dense intensity";
    case 56:
      return "Freezing Drizzle:<br>light intensity";
    case 57:
      return "Freezing Drizzle:<br>dense intensity";
    case 61:
      return "Rain:<br>slight intensity";
    case 63:
      return "Rain:<br>moderate intensity";
    case 65:
      return "Rain:<br>heavy intensity";
    case 66:
      return "Freezing Rain:<br>light intensity";
    case 67:
      return "Freezing Rain:<br>heavy intensity";
    case 71:
      return "Snow fall:<br>slight intensity";
    case 73:
      return "Snow fall:<br>moderate intensity";
    case 75:
      return "Snow fall:<br>heavy intensity";
    case 77:
      return "Snow grains";
    case 80:
      return "Rain showers:<br>slight";
    case 81:
      return "Rain showers:<br>moderate";
    case 82:
      return "Rain showers:<br>violent";
    case 85:
      return "Snow showers:<br>slight";
    case 86:
      return "Snow showers:<br>heavy";
    case 95:
      return "Thunderstorm";
    case 96:
      return "Thunderstorm<br>with slight hail";
    case 99:
      return "Thunderstorm<br>with heavy hail";
  }
}

// current_weather: {
//   temperature: 18.3,
//   windspeed: 11.7,
//   winddirection: 313,
//   weathercode: 2,
//   is_day: 1,
//   time: '2023-05-25T16:00'
// },

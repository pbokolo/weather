"use strict";

const today = new Date();

const timeLbl = document.querySelector(".text--time-main-weather");
const tempLbl = document.querySelector(".text--temp");
const windLbl = document.querySelector(".text--wind-speed");
const humidityLbl = document.querySelector(".text--humidity");

function displayTime() {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  timeLbl.textContent = `${new Intl.DateTimeFormat("fr-FR", options).format(
    today
  )}`;
}

function handleCoords(position) {
  getForecast(position.coords);
}

async function handleForecastResult(result) {
  //1-Parses the result in json
  const data = await result.json();
  //2-Gets the hourly object
  const hourly = data.hourly;
  //3-Extract the array of temperatures, humidity and wind speed
  const { temperature_2m, relative_humidity_2m, wind_speed_10m } = hourly;
  //4-Computes sum of temperatures, humidities and wind speeds
  let meanTemp = temperature_2m.reduce((acc, cur) => acc + cur, 0);
  let meanHumidity = relative_humidity_2m.reduce((acc, cur) => acc + cur, 0);
  let meanWindSpeed = wind_speed_10m.reduce((acc, cur) => acc + cur, 0);
  //5-Then computes the mean value
  meanTemp = meanTemp / temperature_2m.length;
  meanHumidity = meanHumidity / relative_humidity_2m.length;
  meanWindSpeed = meanWindSpeed / wind_speed_10m.length;
  //6-Render forecast
  renderForecast({
    temp: meanTemp.toFixed(1),
    humidity: meanHumidity.toFixed(1),
    windSpeed: meanWindSpeed.toFixed(1),
  });
}

async function getGeoCoords() {
  navigator.geolocation.getCurrentPosition(
    (position) => handleCoords(position),
    (faillure) => {
      throw new Error(faillure);
    }
  );
}

async function getForecast({ latitude, longitude }) {
  try {
    const result = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );
    handleForecastResult(result);
  } catch (error) {
    console.log(error);
  }
}

function renderForecast({ temp, windSpeed, humidity }) {
  tempLbl.textContent = `${temp}°C`;
  windLbl.textContent = `${windSpeed} km/h`;
  humidityLbl.textContent = `${humidity} %`;
}

displayTime();

// getGeoCoords();

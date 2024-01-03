"use strict";

const today = new Date();

const timeLbl = document.querySelector(".text--time-main-weather");
const tempLbl = document.querySelector(".text--temp");

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
  const data = await result.json();
  const { current } = data;
  renderForecast(current);
  console.log(current, data);
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

/*interval
: 
900
temperature_2m
: 
22.6
time
: 
"2024-01-03T07:30"
wind_speed_10m
: 
3.1*/

/*interval
: 
"seconds"
temperature_2m
: 
"°C"
time
: 
"iso8601"
wind_speed_10m
: 
"km/h"*/

function renderForecast(current) {
  tempLbl.textContent = `${current.temperature_2m}°C`;
}

displayTime();

getGeoCoords();

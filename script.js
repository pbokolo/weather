"use strict";

const API = "";
const today = new Date();

let position = [];

const timeLbl = document.querySelector(".text--time-main-weather");

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
  /*const { latitude, longitude } = position.coords;
  //   console.log(latitude, longitude);
  position = [latitude, longitude];
  console.log(position);*/
  getForecast(position.coords);
}

async function getGeoCoords() {
  navigator.geolocation.getCurrentPosition(
    (position) => handleCoords(position),
    (faillure) => {
      //   console.log(faillure);
      throw new Error(faillure);
    }
  );
}

async function getForecast({ latitude, longitude }) {
  try {
    const result = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

displayTime();

getGeoCoords();

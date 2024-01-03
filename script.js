"use strict";

const today = new Date();
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

function getGeoCoords() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
    },
    (faillure) => {
      console.log(faillure);
    }
  );
}

displayTime();

getGeoCoords();

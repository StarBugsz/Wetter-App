"use strict";

import { fetchData, windSpeed, humidity, description, temp } from "./API.mjs";
import { CityUrl } from "./API.mjs";

let currentPlace = null;
let weatherparameters;
const weathertoday = document.querySelector(".weather-today");

document.addEventListener("DOMContentLoaded", function () {
  async function mainfunction() {
    const place = document.getElementById("search-box");
    let placevalue = place.value;

    try {
      // CityUrl aufrufen und neue Daten abrufen
      const apiUrl = await CityUrl(placevalue);

      // Überprüfen, ob der Ort sich geändert hat
      if (placevalue !== currentPlace) {
        currentPlace = placevalue; // Neuen Ort speichern
        // Vorhandenen Container entfernen, falls vorhanden
        if (weatherparameters) {
          weathertoday.removeChild(weatherparameters);
        }
        // Neuen Container erstellen und Wetterdaten anzeigen
        divcontainer(apiUrl);
      } 
    } catch (error) {
      console.error(error);
      alert("Ein Ort mit diesem Namen existiert nicht");
    }
  }

  const searchbutton = document.getElementById("search-button");
  searchbutton.addEventListener("click", () => {
    mainfunction();
  });

  const searchfield = document.getElementById("search-box");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && document.activeElement === searchfield) {
      mainfunction();
    }
  });

  function divcontainer() {

    fetchData();
    weatherparameters = document.createElement("div");
    weatherparameters.className = "weather-parameters";
    weathertoday.appendChild(weatherparameters);

    // Container mit HaupticonIcon
    const div_mainweather = document.createElement("div");
    div_mainweather.className = "div_mainparameters";
    weatherparameters.appendChild(div_mainweather);
    const mainicon = document.createElement("i");
    const mainText = document.createElement("span");
    const mainText1 = document.createElement("span");
    mainText.className = "textstylemain";
    mainText1.className = "textstyle1";
    mainText1.innerHTML = description;
    if (description === "overcast clouds" || "scattered clouds") {
      mainicon.className = "bx bx-cloud";
    } else if (
      description === "moderate rain" ||
      "light intensity drizzle rain" ||
      "broken clouds"
    ) {
      mainicon.className = "bx bx-cloud-light-rain";
    } else if (description === "clear sky") {
      mainicon.className = "bx bxs-sun";
    }
    div_mainweather.appendChild(mainicon);
    div_mainweather.appendChild(mainText);

    mainText.innerText = Math.round((temp - 273.15) * 10) / 10 + "°C";
    mainText1.innerHTML = description;
    div_mainweather.appendChild(mainText1);

    //Container mit Windgeschwindigkeit
    const div_windSpeed = document.createElement("div");
    div_windSpeed.className = "div_parameters";
    weatherparameters.appendChild(div_windSpeed);

    const div_windspeedicon = document.createElement("div");
    div_windspeedicon.className = "windspeedicon";
    div_windSpeed.appendChild(div_windspeedicon);
    const windicon = document.createElement("i");
    windicon.className = "bx bx-wind iconmargin";
    div_windspeedicon.appendChild(windicon);

    const div_windspeedvalue = document.createElement("div");
    div_windspeedvalue.className = "textstyle1";
    div_windSpeed.appendChild(div_windspeedvalue);
    div_windspeedvalue.innerHTML =
      Math.round(((windSpeed * 3600) / 1000) * 10) / 10 + " km/h";

    const div_windspeeddescription = document.createElement("div");
    div_windspeeddescription.className = "textstyle2";
    div_windSpeed.appendChild(div_windspeeddescription);
    div_windspeeddescription.innerHTML = "Windgeschw.";

    //Container mit Feuchtigkeit
    const div_humidity = document.createElement("div");
    div_humidity.className = "div_parameters";
    weatherparameters.appendChild(div_humidity);

    const div_humidityicon = document.createElement("div");
    div_humidityicon.className = "humidityicon";
    div_humidity.appendChild(div_humidityicon);
    const humidityicon = document.createElement("i");
    humidityicon.className = "bx bx-water iconmargin";
    div_humidityicon.appendChild(humidityicon);

    const div_humidityvalue = document.createElement("div");
    div_humidityvalue.className = "textstyle1";
    div_humidity.appendChild(div_humidityvalue);
    div_humidityvalue.innerHTML = humidity + "%";

    const div_humiditydescription = document.createElement("div");
    div_humiditydescription.className = "textstyle2";
    div_humidity.appendChild(div_humiditydescription);
    div_humiditydescription.innerHTML = "Feuchtigkeit";
  }
});


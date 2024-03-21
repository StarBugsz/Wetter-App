"use strict";

let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=d4bc6ce6e4621213cb2cce36c27b6217";
const apiKey = "d4bc6ce6e4621213cb2cce36c27b6217";

let windSpeed;
let description;
let humidity;
let main;
let temp;
let mistake;

// Funktion für Fetch-Anfrage senden
async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    // Überprüfen, ob die Anfrage erfolgreich war (Statuscode 200-299)
    if (!response.ok) {
      throw new Error("Fehler bei der Anfrage. Statuscode: " + response.status);
    }

    // Die Antwort als JSON parsen
    const data = await response.json();

    // Verarbeite die Daten hier
    console.log("Antwort von der API:", data);

    if (data.wind) {
      // Zugriff auf die Windgeschwindigkeit
      windSpeed = data.wind.speed;
      console.log(
        "Windgeschwindigkeit:",
        Math.round(((windSpeed * 3600) / 1000) * 10) / 10 + " km/h"
      );
    } else {
      console.log("Winddaten nicht verfügbar.");
    }

    if (data.main) {
      // Zugriff auf die Feuchtigkeit
      humidity = data.main.humidity;
      console.log("Feuchtigkeit:", humidity);
    } else {
      console.log("Winddaten nicht verfügbar.");
    }

    if (data.weather) {
      // Zugriff auf die allgemeine wetter Beschreibung
      description = data.weather[0].description;
      console.log("Bewölkung:", description);
    } else {
      console.log("Winddaten nicht verfügbar.");
    }

    if (data.main) {
      //Zugriff auf Temperatur
      temp = data.main.temp;
      console.log("Temperatur:", Math.round((temp - 273.15) * 10) / 10 + "°C");
    }

    // Hier wird ein Promise mit den gesammelten Daten zurückgegeben
    return { windSpeed, humidity, description, temp };
  } catch (error) {
    console.error("Fehler:", error);
    // Hier wird ein Promise mit einem Fehler zurückgegeben
    throw error;
  }
}

async function CityUrl(placevalue) {
  const CurrentCityName = apiUrl.split("q=")[1].split("&")[0];

  if (placevalue !== CurrentCityName) {
    apiUrl = apiUrl.replace(CurrentCityName, placevalue);
    return await fetchData();
  }

  return apiUrl;
}

export { fetchData, windSpeed, humidity, description, temp };
export { CityUrl };

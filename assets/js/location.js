var city = document.getElementById("city");
var state = document.getElementById("state");
let searchButton = document.getElementById("searchButton");

function handleClick(event) {
  event.preventDefault();
  let cityInput = city.value;
  let stateInput = state.value;

  const stateURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},&limit=1&appid=${apiKey}`;
  const cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit=1&appid=${apiKey}`;

  const selectedURL = (stateInput = "" ? cityURL : stateURL);

  console.log("click");
  console.log(selectedURL);

  getlocation(selectedURL);

  city.value = "";
  state.value = "";
}

searchButton.addEventListener("click", handleClick);

function getlocation(url) {
  fetch(url)
    .then((response) => {
      if (response.status >= 500) {
        throw new Error("An unknown error occurred.");
      } else if (response.status >= 400) {
        throw new Error("The resource you requested could not be found.");
      } else if (response.status > 200) {
        throw new Error("An error occurred on the server.");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
      deleteChildElements();
      getCurrentWeather();
      getfiveDayForcast();

      console.log(lat, lon);
    })
    .catch((error) => {
      console.error(error);
    });
}

var lastSearchIncludedState = false;
var lastSearchString = "";
var lat = 40.08;
var lon = -74.2;
const apiKey = "043390da5a76d81703ed4fe2131f4f11";
const fiveDayObject = [];
const fiveDayFilteredDates = new Set();

function deleteChildElements() {
  // Get references to the parent elements
  var mainCard = document.getElementById("mainWeatherCard");
  var cardContainer = document.getElementById("weatherCardContainer");

  // Remove all child elements of mainWeatherCard
  while (mainCard.firstChild) {
    mainCard.removeChild(mainCard.firstChild);
  }

  // Remove all child elements of weatherCardContainer
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

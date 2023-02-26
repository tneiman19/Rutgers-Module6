var locationHistory = checkLocalStorage();

function checkLocalStorage() {
  if (localStorage.getItem("locations") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("locations"));
  }
}

function recordLocation() {
  var newLocation = {
    city: lastSearchString,
    lat: lat,
    lon: lon,
    currentUrl: `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`,
    fiveDayUrl: `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=imperial`,
  };
  locationHistory.push(newLocation);
  var stringLocationHistory = JSON.stringify(locationHistory);
  localStorage.setItem("locations", stringLocationHistory);
  checkLocalStorage();
}

checkLocalStorage();


function delayedFunctionCall() {
    setTimeout(function() {
      checkLocalStorage();
      onLoadButtons();
    }, 10000); // 10 seconds delay
  }
  
  delayedFunctionCall();
  
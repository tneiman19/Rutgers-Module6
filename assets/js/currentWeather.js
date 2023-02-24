//Assuming we already have the longitude and latitude

// function getfiveDayForcast() {
//     fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//     )
//       .then((response) => {
//         if (response.status >= 500) {
//           throw new Error("An unknown error occurred.");
//         } else if (response.status >= 400) {
//           throw new Error("The resource you requested could not be found.");
//         } else if (response.status > 200) {
//           throw new Error("An error occurred on the server.");
//         } else {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         console.log(data);

function getCurrentWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    )
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
        //console.log(data);
  
        const date = moment(data.dt * 1000).format("MM/DD/YYYY");
  
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const mainWeatherCard = document.getElementById("mainWeatherCard");
  
        const mainWeatherInfo = `
        <img class="weatherIcon" src="${iconUrl}" alt="weatherIcon" />
        <h3>${data.name}</h3> 
          <h5>${date}</h5>
        It is currently ${Math.floor(
          data.main.temp
        )} ℉ with a high of ${Math.floor(data.main.temp_max)}
         and low of ${Math.floor(
           data.main.temp_min
         )}, a wind speed of ${Math.floor(
          data.wind.speed
        )}, and it feels like ${Math.floor(data.main.feels_like)}.`;
  
        mainWeatherCard.innerHTML += mainWeatherInfo;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  

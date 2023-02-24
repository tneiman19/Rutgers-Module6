function getfiveDayForcast() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
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
      .then((data) =>{

        console.log(data);

        for (let day of data.list) {
          const today = moment().format("L");
          // console.log(day)
          const { dt_txt } = day;
          // console.log(dt_txt)
          const date = moment(dt_txt).format("L");
          //console.log(date)
          const hourStr = moment(dt_txt).format("HH:mm");
          if (today === date || hourStr !== "12:00") {
            continue;
          } else {
            console.log(date, hourStr);
        
            const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            const temp = day.main.temp;
            const humid = day.main.humidity;
            const wind = day.wind.speed;
            const desciription = day.weather[0].description;
            //console.log(icon, temp, humid,wind,desciription)
        
            const weatherCardContainer = document.getElementById(
              "weatherCardContainer"
            );
            const newWeatherCard = `   
         <div class="weatherCard">
         <p>${date}</p>
         <img class="weatherIcon" src="${icon}" alt="weatherIcon" />
         <p class="alignRight">${desciription.toUpperCase()}</p>
         <p>Temp: ${Math.floor(temp)} ℉</p>
         <p>Humidity: ${humid}</p>
         <p>Wind: ${wind}</p>
        </div>`;
        
            weatherCardContainer.insertAdjacentHTML("beforeend", newWeatherCard);
          }
        }



      })}



// console.log(data);

// for (let day of data.list) {
//   const today = moment().format("L");
//   // console.log(day)
//   const { dt_txt } = day;
//   // console.log(dt_txt)
//   const date = moment(dt_txt).format("L");
//   //console.log(date)
//   const hourStr = moment(dt_txt).format("HH:mm");
//   if (today === date || hourStr !== "12:00") {
//     continue;
//   } else {
//     console.log(date, hourStr);

//     const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
//     const temp = day.main.temp;
//     const humid = day.main.humidity;
//     const wind = day.wind.speed;
//     const desciription = day.weather[0].description;
//     //console.log(icon, temp, humid,wind,desciription)

//     const weatherCardContainer = document.getElementById(
//       "weatherCardContainer"
//     );
//     const newWeatherCard = `   
//  <div class="weatherCard">
//  <p>${date}</p>
//  <img class="weatherIcon" src="${icon}" alt="weatherIcon" />
//  <p class="alignRight">${desciription.toUpperCase()}</p>
//  <p>Temp: ${Math.floor(temp)} ℉</p>
//  <p>Humidity: ${humid}</p>
//  <p>Wind: ${wind}</p>
// </div>`;

//     weatherCardContainer.insertAdjacentHTML("beforeend", newWeatherCard);
//   }
// }

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

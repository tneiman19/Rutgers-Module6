function getfiveDayForcast(url) {
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
          //console.log(date, hourStr);

          const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
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
    });
}

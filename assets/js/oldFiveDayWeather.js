//***The code in this file is not being used anymore.  It has been replaced with file newFiveDayWeather.js*** 



//Assuming we already have the longitude and latitude

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
    .then((data) => {
      //console.log(data);

      //populateFiveDayObject
      data.list.forEach((element) => {
        const date = moment(element.dt_txt).format("L");
        fiveDayFilteredDates.add(date);
      });

      // Convert filteredDates to an array of unique dates
      const uniqueDates = Array.from(fiveDayFilteredDates);

      // Initialize newObject with date and empty hour array
      uniqueDates.forEach((date) => {
        fiveDayObject.push({ date, hour: [] });
      });

      //console.log(fiveDayObject);

      // Populate the hourly array in fiveDayObject\

      let dateArrayIndex = 0;

      data.list.forEach((e) => {
        const date = moment(e.dt_txt).format("L");
        if (date !== uniqueDates[dateArrayIndex]) {
          dateArrayIndex++;
        } else {
          fiveDayObject[dateArrayIndex].hour.push({
            datetime: e.dt_txt,
            temp: e.main.temp,
            tempMin: e.main.temp_min,
            tempMax: e.main.temp_max,
            feelLike: e.main.feels_like,
            icon: `https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,
            desciription: e.weather[0].description,
            wind: e.wind.speed,
          });
        }
      });
      console.log(fiveDayObject);
      //populateHourlyObjects(uniqueDates);
      //Call the function to generate the daily weather cards
      createDailyWeatherCards(fiveDayObject);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createDailyWeatherCards(weatherArray) {
  const weatherCardContainer = document.getElementById("weatherCardContainer");
  weatherArray.forEach((day) => {
    if (day.hour.length === 0) {
      console.log("no data");
      return; // skip this iteration
    }
    const avgTemp =
      day.hour.reduce((sum, hour) => sum + hour.temp, 0) / day.hour.length;
    const curDayData = day.hour[2];
    const date = day.date;
    const weatherIconUrl = curDayData.icon;

    const weatherCard = `
        <div class="weatherCard">
          <p>${date}</p>
          <img class="weatherIcon" src="${weatherIconUrl}" alt="weatherIcon" />
          <p class="alignRight">${curDayData.desciription.toUpperCase()}</p>
          <p>Temp: ${Math.floor(avgTemp)} ℉</p>
          <p>High: ${curDayData.tempMax}</p>
          <p>Low: ${curDayData.tempMin}</p>
          <p>Wind: ${curDayData.wind}</p>
          <p>Feels Like: ${curDayData.feelLike}</p>
        </div>
      `;

    weatherCardContainer.insertAdjacentHTML("beforeend", weatherCard);

    // weatherCardContainer.innerHTML += weatherCard;
  });
}

getfiveDayForcast();

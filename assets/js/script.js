var cityName;
var countryCode;
var apiKey = "043390da5a76d81703ed4fe2131f4f11";
// var fetchLink = `api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&appid=${apiKey}`

var fetchLink =
  "https://api.openweathermap.org/data/2.5/forecast?lat=74.29&lon=40.08&appid=043390da5a76d81703ed4fe2131f4f11";

fetch(fetchLink)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    var index = 0; // move declaration and initialization outside loop
    var days = [];

    for (const { dt } of data.list) {
      const date = new Date(dt * 1000).toDateString();
      if (date === days[index - 1]) {
        continue;
      }
      days.push(date);
      console.log(days);
      index++;
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

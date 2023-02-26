const locationHistoryButtons = document.getElementById(
  "locationHistoryButtons"
);

// function onLoadButtons() {
//   deleteLocationHistory();
//   locationHistory.forEach((e) => {
//     // console.log(e);
//     const newHistoryButton = ` <button 'data-type'='historyButton' 'data-url'=${e.url}>${e.city}</button>`;
//     locationHistoryButtons.insertAdjacentHTML("beforeend", newHistoryButton);
//   });
// }

function onLoadButtons() {
  deleteLocationHistory();

  locationHistory.forEach((e) => {
    const newHistoryButton = document.createElement("button");
    newHistoryButton.textContent = e.city;
    newHistoryButton.setAttribute("current-url", e.currentUrl);
    newHistoryButton.setAttribute("fiveDay-url", e.fiveDayUrl);
    newHistoryButton.setAttribute("location", e.city);
    newHistoryButton.setAttribute("data-type", "historyButton");

    // Add the event listener to the button
    newHistoryButton.addEventListener("click", handleHistoryButtonClick);

    locationHistoryButtons.appendChild(newHistoryButton);
  });
}

function deleteLocationHistory() {
  const locationHistoryButtons = document.getElementById(
    "locationHistoryButtons"
  );
  const children = locationHistoryButtons.children;

  // Remove only the button elements
  for (let i = children.length - 1; i >= 0; i--) {
    if (children[i].tagName === "BUTTON") {
      locationHistoryButtons.removeChild(children[i]);
    }
  }
}

function handleHistoryButtonClick(event) {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Get the data-url attribute of the button
  const button = event.target;
  const currentUrl = button.getAttribute("current-url");
  const fiveDayUrl = button.getAttribute("fiveDay-url");
  const location = button.getAttribute("location");
  // Log the data-url attribute to the console
  //console.log(currentUrl, fiveDayUrl);
  lastSearchString = location;
  deleteChildElements();
  getCurrentWeather(currentUrl);
  getfiveDayForcast(fiveDayUrl);
  checkLocalStorage();
}

onLoadButtons();

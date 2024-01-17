var searchHistory = [];

function addToHistory(cityName) {
    if (!searchHistory.includes(cityName)) {
      searchHistory.push(cityName);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    var historyItem = $("<div>")
      .addClass("history-item list-group-item list-group-item-action")
      .text(cityName);

    historyItem.on("click", function () {
      getWeatherData(cityName);
    });

    $("#history").append(historyItem);
    updateDisplayedHistory();
  }
}
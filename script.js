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
    DisplayedHistory();
  }
}

function DisplayedHistory() {
    $(".history-container").empty();
  
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = $("<div>")
        .addClass("history-item")
        .text(searchHistory[i]);
  
      historyItem.on("click", function () {
        getWeatherData($(this).text());
      });
  
      $(".history-container").append(historyItem);
    }
  }

  function displaySearchHistory() {
    for (var i = 0; i < searchHistory.length; i++) {
      addToHistory(searchHistory[i]);
    }
  }

  // Load search history from local storage on page load
$(document).ready(function () {
    // Get search history from local storage
    var storedSearchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
    // Update the global searchHistory variable
    searchHistory = storedSearchHistory;
  
    // Call the function to update the displayed history
    displaySearchHistory();
    DisplayedHistory(); // Add this line to ensure history is displayed on page load
  });
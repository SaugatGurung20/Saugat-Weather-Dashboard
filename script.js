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

$(document).ready(function () {
    var storedSearchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory = storedSearchHistory;
    displaySearchHistory();
    DisplayedHistory(); 
  });

$("#search-form").submit(function (event) {
    event.preventDefault();
      var cityName = $("#search-input").val().trim();
      if (cityName !== "") {
      getWeatherData(cityName);
  
      $("#search-input").val("");
    }
  });

function getWeatherData(cityName) {
    var apiKey = '155762a56bacbcb490402c8eeb8ef0b7';
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
  
    $.ajax({
      url: apiUrl,
      method: "GET",
      success: function (response) {
        updateWeatherUI(response);
        addToHistory(cityName);
      },
      error: function (error) {
        console.log("Error fetching weather data: ", error);
      }
    });
  }
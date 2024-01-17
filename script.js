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

function updateWeatherUI(data) {
  
    var cityName = data.city.name; 
    var currentDate = data.list[0].dt_txt.split(' ')[0];
    var weatherIcon = data.list[0].weather[0].icon; 
    var currentTemperature = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;
  
    var h2Content = "<h2>" +
      cityName + " - " +
      currentDate +
      "<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png' alt='Weather Icon'>" +
      "</h2>";
  
    $("#today").html(h2Content +
      "<p>Temperature: " + currentTemperature + "</p><p>Humidity: " + humidity + "</p><p>Wind Speed: " + windSpeed + "</p>");
  
      $("#forecast").empty();
  
    for (var i = 1; i <= 5; i++) {
      var forecastDate = data.list[i].dt_txt.split(' ')[0];
      var forecastTemperature = data.list[i].main.temp;
      var forecastHumidity = data.list[i].main.humidity;
      var forecastWindSpeed = data.list[i].wind.speed;
      var forecastWeatherIcon = data.list[i].weather[0].icon;
  
      var forecastBox = $("<div>").addClass("forecast-box");
      forecastBox.append(
        "<p>Date: " + forecastDate + "</p>" +
        "<img src='http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png' alt='Forecast Weather Icon'>" +
        "<p>Temperature: " + forecastTemperature + "</p><p>Humidity: " + forecastHumidity + "</p><p>Wind Speed: " + forecastWindSpeed + "</p>"
      );
  
      $("#forecast").append(forecastBox);
    }

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
// This is my API key
var apiKey = 'b9da2b7e40a98e59cb40534717905908';
// This is my array for the city search results
var citySearchArray = []


$(document).ready(function(){
    var currentDate = moment().format('l');
    $("#date").append(currentDate)
    $("#temperature").append('');
    $("#humidity").append('');
    $("#windspeed").append('');
    $("#uvindex").append('');
    
    // $("#city").css("style", "font-weight: bold")
    getWeather();
})

function cityName() {
    console.log("cityName displays")
    var cityName = $("#entry").val()
    $("#search").on("click", function () {
        $("#cityName").append(cityName);
    })
}

function getWeather() {
    console.log("getWeather called")
    $("#search").on("click", function (evt) {
        evt.preventDefault()
        let city = $("#entry").val();
        weatherData(city);
    })
}

    function weatherData(city) {
        console.log("weatherData works")
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
         makeWeatherInfo(response);
        })
    }

    function makeWeatherInfo(weatherData) {
        let infoURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}`
        let info = {};
        info.kTemp = weatherData.main.temp;
        info.humidity = weatherData.main.humidity
        info.windspeed = weatherData.main.windspeed
        info.uvi = ''
        $.ajax({
            url: infoURL,
            method: "GET"
        }).done(function(response){
            info.uvi = response.value
            showWeatherInfo(info)
        })
    }

    function showWeatherInfo(info){
        // $("#temperature").append("Temperature: " + "°F");
        $("#temperature").append(convertTemp(info.kTemp) + ' °F');
        $("#humidity").append(info.humidity);
        $("#windspeed").append(info.windspeed);
        $("#uvindex").append(info.uvi);
        convertTemp()
      }

    function fivedayForecast() {
        var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: fivedayURL,
            method: "GET",
        }).then(function(response){
    })


    
    // Kelvin to Fahrenheit
    function convertTemp(temp) {
        return Math.floor((temp - 273.15) * 9 / 5 + 32)
    }
}

    function clearData() {
        $("#city").empty();
        $("#temperature").empty();
        $("#windspeed").empty();
    }

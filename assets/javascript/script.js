// This is my API key
var apiKey = 'b9da2b7e40a98e59cb40534717905908';
// This is my array for the city search results
var citySearchArray = [];
// 


$(document).ready(function(){
    var currentDate = moment().format('l');
    $("#date").append(currentDate)
    
    getWeather();
})

cityName();

function cityName() {
    $("#search").on("click", function (e) {
        e.preventDefault();
        var cityID = $("#entry").val();
        console.log(cityID);
        $("#cityName").text(cityID);
        console.log("cityName displays")
    })
}

function getWeather() {
    console.log("getWeather called")
    $("#search").on("click", function (evt) {
        evt.preventDefault()
        clearData();
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
        info.icon = weatherData.weather[0].icon;
        info.humidity = weatherData.main.humidity;
        info.windspeed = weatherData.wind.speed;
        console.log(weatherData);
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
        
        $("#temperature").append('Temperature: ' + convertTemp(info.kTemp) + ' °F');
        $("#icon img").first().attr("src", iconURL(info.icon));
        $("#icon").show();
        $("#humidity").append('Humidity: ' + info.humidity);
        $("#windspeed").append('Windspeed: ' + info.windspeed + ' MPH');
        $("#uvindex").append('UV Index: ' + info.uvi);
        convertTemp()
        uvIndexScale(info.uvi)
      }

    function fivedayForecast() {
        var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: fivedayURL,
            method: "GET",
        }).then(function(response){
    })
}
    function iconURL(filename) {
        var URL = `http://openweathermap.org/img/wn/${filename}.png`;
        return URL;
    }

    // Kelvin to Fahrenheit
    function convertTemp(temp) {
        return Math.floor((temp - 273.15) * 9 / 5 + 32)
    }

    function clearData() {
        $("#temperature").html('');
        $("#humidity").html('');
        $("#windspeed").html('');
        $("#uvindex").html('');
    }

    function uvIndexScale(uvIndex) {
        var risk = ''
        if (uvIndex < 2) {
            risk = 'low';
        } else if (uvIndex > 3 && uvIndex < 5) {
            risk = 'moderate'
        } else if (uvIndex > 5 && uvIndex < 8) {
            risk = 'high'
        } else if (uvIndex > 8) {
            risk = 'veryhigh'
        }
        $("#uvindex").addClass(risk)
    }

    function forecastResults() {
        var forecastResults = `https://api.openweathermap.org/data/2.5/forecast?id=524901`;

        $("#day1").append('');
        $("<br>").append(weatherIcon);  
        $("#temp1").append("Temp: " + ' °F');
        $("#hum1").append("Humidity: " );
        
        $("#day2").append('');
        $("<br>").append(weatherIcon);    
        $("#temp2").append("Temp: " + ' °F');
        $("#hum2").append("Humidity: " );
        
        $("#day3").append('');
        $("<br>").append(weatherIcon);    
        $("#temp3").append("Temp: " + ' °F');
        $("#hum3").append("Humidity: " );
        
        $("#day4").append('');  
        $("<br>").append(weatherIcon);  
        $("#temp4").append("Temp: " + ' °F');
        $("#hum4").append("Humidity: " );
        
        $("#day5").append(''); 
        $("<br>").append(weatherIcon);   
        $("#temp5").append("Temp: " + ' °F');
        $("#hum5").append("Humidity: " );
    }

    function generateList() {
        $("#entry").on('click', function (event) {
            localStorage.setItem(, JSON.stringify(citySearchArray));
        }
    }
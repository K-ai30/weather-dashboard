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
        fivedayForecast(city);
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

    function fivedayForecast(city) {
        var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: fivedayURL,
            method: "GET",
        }).then(function(response){
            let fiveDays = [response.list[0], response.list[6], response.list[14], response.list[30], response.list[38]];
            forecastResults(fiveDays);
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

    function forecastResults(forecastInfo) {
        for (let i = 0; i < 5; i++) {
            let day = $("#day" + (i+1));
            let icon = $("#icon" + (i+1));
            let temp = $("#temp" + (i+1));
            let hum = $("#hum" + (i+1));
            let URL = iconURL(forecastInfo[i].weather[0].icon);
            let ftemp = convertTemp(forecastInfo[i].main.temp);
            $(day).append(forecastInfo[i].dt_txt);
            // Select the image in the context of icon, which is my div for the image
            $("img", icon).first().attr("src", URL);
            $(icon).show();
            $(temp).append('Temp: ' + ftemp + ' °F');
            $(hum).append('Humidity: ' + forecastInfo[i].main.humidity);
        }
    }

    function generateList() {
        $("#entry").on('click', function (event) {
            localStorage.setItem(JSON.stringify(citySearchArray));
        })
    }

    // get text
    // look for the array from local storage
    // check to see if the text is in local storage array, if not, add it
    // save that array to local storage
    // on page load, call function that gets array from LS
    // loops over that array, adds each city to list
    // make an element, make an li adding the text
    // append the li to ul
    // li.text()
    // another function that updates everytime I hit search, 2 functions needed (save to local storage, load from local storage)


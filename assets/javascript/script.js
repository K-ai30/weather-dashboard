$(document).ready(function(){
    // Identify variables to target
    var searchBtn = document.querySelector("#search");
    var currentDate = moment().format('l');
    
    $(".date col-6").text(currentDate);
    console.log("date working");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    + "b9da2b7e40a98e59cb40534717905908";
})

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {

// }
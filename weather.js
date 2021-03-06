let cities = [];

//clicking search

$("#searchBtn").on("click", function () {

    //creating button 
    var cityName = $("#searchBar").val();

    $("searchForCities").append("#viewCities");
    cities.push(cityName);
    renderCities();
    // call API 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var temperature = response.main.temp
        var humidity = response.main.humidity
        var name = response.name
        var windSpeed = response.wind.speed
        var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
        var d = new Date();
        var year = d.getFullYear();
        var day = d.getDate();
        var month = d.getMonth() + 1;


        $("#nameOfCity").empty().append(name + " (" + month + "/" + day + "/" + year + ")");
        $("#theTemp").empty().append("Temperature: " + temperature + " F°");
        $("#humidity").empty().append("Humidity: " + humidity + "%");
        $("#windSpeed").empty().append("Wind: " + windSpeed + " mph");
        $("#longitude").empty().append(longitude);
        $("#latitude").empty().append(latitude);

        otherAPI();

    })

});
renderCities();

//when a button is clicked

//enter key searches 
$("#searchBar").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#searchBtn").click();
    }
});
//adds cities to array
function renderCities() {

    $("#viewCities").empty();

    for (var i = 0; i < cities.length; i++) {
        var c = $("<button>");
        c.addClass("cityBtn col-12");
        c.attr("data-name", cities[i]);
        c.text(cities[i]);
        $("#viewCities").append(c);
    }
};

// second API function
function otherAPI() {
    var lat = $("#latitude").text();
    var lon = $("#longitude").text();
    var d = new Date();
    var oneDay = d.getDate() + 1;
    var twoDay = d.getDate() + 2;
    var threeDay = d.getDate() + 3;
    var fourDay = d.getDate() + 4;
    var fiveDay = d.getDate() + 5;
    var month = d.getMonth() + 1;
    var year = d.getFullYear();


    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var uvi = response.current.uvi

        var oneDayTemp = response.daily[1].temp.day
        var twoDayTemp = response.daily[2].temp.day
        var threeDayTemp = response.daily[3].temp.day
        var fourDayTemp = response.daily[4].temp.day
        var fiveDayTemp = response.daily[5].temp.day
        var oneDayHumidity = response.daily[1].humidity
        var twoDayHumidity = response.daily[2].humidity
        var threeDayHumidity = response.daily[3].humidity
        var fourDayHumidity = response.daily[4].humidity
        var fiveDayHumidity = response.daily[5].humidity
        var icon = response.daily[0].weather[0].icon 
        var iconOne = response.daily[1].weather[0].icon  
        var iconTwo = response.daily[2].weather[0].icon 
        var iconThree = response.daily[3].weather[0].icon 
        var iconFour = response.daily[4].weather[0].icon 
        var iconFive = response.daily[5].weather[0].icon 

        console.log(icon);

        var iconLinkCurrent = "https://openweathermap.org/img/wn/" + icon + ".png"
        var iconLinkOne = "https://openweathermap.org/img/wn/" + iconOne + ".png"
        var iconLinkTwo = "https://openweathermap.org/img/wn/" + iconTwo + ".png"
        var iconLinkThree = "https://openweathermap.org/img/wn/" + iconThree + ".png"
        var iconLinkFour = "https://openweathermap.org/img/wn/" + iconFour + ".png"
        var iconLinkFive = "https://openweathermap.org/img/wn/" + iconFive + ".png"

        var imageCurrent = $("<img>").attr("src", iconLinkCurrent);
        var imageOne = $("<img>").attr("src", iconLinkOne);
        var imageTwo = $("<img>").attr("src", iconLinkTwo); 
        var imageThree = $("<img>").attr("src", iconLinkThree);
        var imageFour = $("<img>").attr("src", iconLinkFour); 
        var imageFive = $("<img>").attr("src", iconLinkFive);

        
        $("#iconHolder").empty().append(imageCurrent); 
        $("#iconHolderOne").empty().append(imageOne); 
        $("#iconHolderTwo").empty().append(imageTwo);
        $("#iconHolderThree").empty().append(imageThree); 
        $("#iconHolderFour").empty().append(imageFour); 
        $("#iconHolderFive").empty().append(imageFive);

        $("#uvIndex").empty().append("UV Index: " + uvi);

        $(".oneDayLater").empty().append("(" + month + "/" + oneDay + "/" + year + ")")
        $(".twoDaysLater").empty().append("(" + month + "/" + twoDay + "/" + year + ")")
        $(".threeDaysLater").empty().append("(" + month + "/" + threeDay + "/" + year + ")")
        $(".fourDaysLater").empty().append("(" + month + "/" + fourDay + "/" + year + ")")
        $(".fiveDaysLater").empty().append("(" + month + "/" + fiveDay + "/" + year + ")")

        $(".oneDayTemp").empty().append(oneDayTemp + " F°")
        $(".twoDayTemp").empty().append(twoDayTemp + " F°")
        $(".threeDayTemp").empty().append(threeDayTemp + " F°")
        $(".fourDayTemp").empty().append(fourDayTemp + " F°")
        $(".fiveDayTemp").empty().append(fiveDayTemp + " F°")

        $(".oneDayHumidity").empty().append(oneDayHumidity + "%")
        $(".twoDayHumidity").empty().append(twoDayHumidity + "%")
        $(".threeDayHumidity").empty().append(threeDayHumidity + "%")
        $(".fourDayHumidity").empty().append(fourDayHumidity + "%")
        $(".fiveDayHumidity").empty().append(fiveDayHumidity + "%")

        if (month == [4, 6, 9, 11] && day > 30) {
            month + 1;
            day - 30;
        }
        if (month == [1, 3, 5, 7, 8, 10] && day > 31) {
            month + 1;
            day - 31;
        }
        if (month === 2 && day > 28) {
            month + 1;
            day - 28;
        }
        if (month === 12 && day > 31) {
            month - 11;
            day - 31;
            year + 1;
        }
        if (year %= 4 && month === 2 && day > 29) {
            month + 1;
            day - 29;
        }
    })

}
 

let weather = {
    api_key = e691c8a26ea2400848c09b3c99ba1117,
    fetchWeather: function (city){
        fetch("api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.api_key
        ).then((responce) => response.json())
        .then((data) => console.log(data
            ))
    }

};
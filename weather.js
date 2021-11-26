let weather = {
api_key: "e691c8a26ea2400848c09b3c99ba1117",
fetchWeather: function (city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    this.api_key
    ).then((response) => {
        if (response.status != 200){
            alert("Error could not find location")
        }
        else{
            return response.json()
        }
        
    })
    .then((data) => this.display(data));
},
display: function(data){
    const { name } = data;
    const { temp, humidity, feels_like, temp_min, temp_max} = data.main;
    const {icon , description} = data.weather[0];
    const { visibility} = data;
    const { speed } = data.wind
    
    document.getElementById('visibility').innerHTML = visibility/1000
    document.getElementById('area').innerHTML = name
    document.getElementById('description').innerHTML = description
    document.getElementById('temp').innerHTML = Math.round(temp) + "°C"
    document.getElementById('high_low').innerHTML = `H: ${Math.round(temp_max)}°C &emsp; L: ${Math.round(temp_min)}°C`
    document.getElementById('humidity').innerHTML = humidity
    document.getElementById('feels_like').innerHTML = Math.round(feels_like)
    document.getElementById('winds').innerHTML = speed*3600/1000
    document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + icon.replace("n", "d") + ".png";
},
search: function(){
    var city = document.getElementById("search").value;
    this.fetchWeather(city)
    document.getElementById("search").value = null;
}

};

document.getElementById("search-btn").addEventListener('click', () => {
    weather.search()
});
document.getElementById("search").addEventListener('keyup', (event) => {
    if(event.key == "Enter"){
        weather.search()
    }
})

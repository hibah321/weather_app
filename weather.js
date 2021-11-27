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
    
    document.getElementById('visibility').innerHTML = Math.round(visibility/1000)
    document.getElementById('area').innerHTML = name
    document.getElementById('description').innerHTML = description
    document.getElementById('temp').innerHTML = Math.round(temp) + "°C"
    document.getElementById('high_low').innerHTML = `H: ${Math.round(temp_max)}°C &emsp; L: ${Math.round(temp_min)}°C`
    document.getElementById('humidity').innerHTML = Math.round(humidity);
    document.getElementById('feels_like').innerHTML = Math.round(feels_like)
    document.getElementById('winds').innerHTML = Math.round(speed*3600/1000);
    document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + icon.replace("n", "d") + ".png";
},
search: function(){
    var city = document.getElementById("search").value;
    this.fetchWeather(city)
    document.getElementById("search").value = null;
}

};

let geo_code = {
    reverse_geo: function(latitude, longitude){
        var api_key = 'aaa63add68cc43dabab1186566aa9a93'
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
      
        var request_url = api_url
          + '?'
          + 'key=' + api_key
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';
      
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
          // see full list of possible response codes:
          // https://opencagedata.com/api#codes
      
          if (request.status === 200){ 
            // Success!
            var data = JSON.parse(request.responseText);
            alert(data.results[0].formatted); // print the location
      
          } else if (request.status <= 500){ 
            // We reached our target server, but it returned an error
                                 
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");        
        };
      
        request.send();
    }
}


document.getElementById("search-btn").addEventListener('click', () => {
    weather.search()
});
document.getElementById("search").addEventListener('keyup', (event) => {
    if(event.key == "Enter"){
        weather.search()
    }
})

var cityn = document.getElementById("city-count");
var city = document.getElementById("city");
var staten = document.getElementById("state-count");
var state = document.getElementById("state");
var countryn = document.getElementById("country-count");
var country = document.getElementById("country");

function getGeolocation(){
    //console.log("Button Pressed!");
    console.log("Button Pressed asdf");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("success");
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    var request = new XMLHttpRequest()
    reqURL = 'https://api.opencagedata.com/geocode/v1/json?q='+position.coords.latitude+'+'+position.coords.longitude+'&key=1025750b24b14aacb06568a47c1764f2'
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', reqURL, true)
    request.onload = function() {
        console.log("JSON Parsing started")
        var data = JSON.parse(this.response);
        var temp_country = data['results'][0]['components']['country'];
        var temp_state = data['results'][0]['components']['state'];
        var temp_city = data['results'][0]['components']['state_district'];
        city.innerHTML = temp_city;
        state.innerHTML = temp_state;
        country.innerHTML = temp_country;
    }
    request.send()
    getNumbers(temp_city,temp_state,temp_country);
}
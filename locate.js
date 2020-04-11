var cityn = document.getElementById("city-count");
var city = document.getElementById("city");
var staten = document.getElementById("state-count");
var state = document.getElementById("state");
var countryn = document.getElementById("country-count");
var country = document.getElementById("country");


function getNumbers(city, state){
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.covid19india.org/data.json', true)
    request.onload = function() {
        console.log("Getting numbers...")
        var data = JSON.parse(this.response);
        countryn.innerHTML = data['cases_time_series'].reverse()[0].totalconfirmed;
        countryn.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        getMoreNumbers(city, state)
    }
    request.send()
}

function getMoreNumbers(city, state){
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.covid19india.org/state_district_wise.json', true)
    request.onload = function() {
        console.log("Getting more numbers...")
        var total_staten = 0;
        var data = JSON.parse(this.response);
        var temp_cityn = data[state]['districtData'][city]['confirmed'];
        for (x in data[state]['districtData']){
            total_staten+=data[state]['districtData'][x]['confirmed'];
        }
        
        
        
        
        cityn.innerHTML = temp_cityn;
        cityn.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        staten.innerHTML = total_staten;
        staten.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        //countryn.innerHTML = data['cases_time_series'].reverse()[0].totalconfirmed;
    }
    request.send()
}

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
        city.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        state.innerHTML = temp_state;
        state.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        country.innerHTML = temp_country;
        country.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        getNumbers(temp_city,temp_state);
    }
    request.send()
    
}

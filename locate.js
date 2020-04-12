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
        var data = JSON.parse(this.response);
        countryn.innerHTML = data['statewise'][0].active;
        for (x in data['statewise']){
            if(data['statewise'][x]['state']==state){
                staten.innerHTML = data['statewise'][x]['active'];
            }
        }

        countryn.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        countryn.className = 'count';
        staten.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        staten.className = 'count';
        getMoreNumbers(city, state)
    }
    request.send()
}

function getMoreNumbers(city, state){
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.covid19india.org/state_district_wise.json', true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        var temp_cityn = data[state]['districtData'][city]['confirmed'];
        cityn.innerHTML = temp_cityn;
        if(cityn.innerHTML==undefined){
            cityn.style.display = "none";
            city.style.display = "none";
        }
        cityn.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        cityn.className = 'count';
        animate();
    }
    request.send();
}

function getGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function animate(){
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

function showPosition(position) {
    var request = new XMLHttpRequest()
    reqURL = 'https://api.opencagedata.com/geocode/v1/json?q='+position.coords.latitude+'+'+position.coords.longitude+'&key=1025750b24b14aacb06568a47c1764f2'
    request.open('GET', reqURL, true)
    request.onload = function() {
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

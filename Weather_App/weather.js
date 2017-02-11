var api_key = "dd353ef18afc8f1555206d1c8a03dc9f";
/*
Student Name: Vij Madhav  
Student ID: 1001440170
Project Name:   Project1- A Weather Web Application
Due Date:   10/19/2016
Last Edited: 10/16/2016
*/
function sendRequest () {
    var xhr = new XMLHttpRequest();
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json"+"&units=imperial", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var city = json.name;
            var country = json.sys.country;
            var description = json.weather[0].description;
            var geoLon = json.coord.lon;
            var geoLat = json.coord.lat;
            var sunriseUnix = json.sys.sunrise;
            var sunsetUnix = json.sys.sunset;
            var sunrise = timeConvert(sunriseUnix);
            var sunset = timeConvert(sunsetUnix);
            var pressure = json.main.pressure;
            var humidity = json.main.humidity;
            var temperature = json.main.temp;
            var min_temp = json.main.temp_min;
            var max_temp = json.main.temp_max;
            var cloud = json.clouds.all;
            var visible = visibleConvert();
            var information = informUser();



            function timeConvert (unix){
                var date = new Date(unix*1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var formattedTime = hours + ':' + minutes.substr(-2);
                return formattedTime;
            }

            function visibleConvert(){
                var visibility;
                if (json.weather[0].main== "Clear") {
                    visibility = "Good Visiblity";
                } 
                else if(json.weather[0].main == "Rain" || json.weather[0].main == "Snow"){
                    visibility ="Partial visibility";
                }
                else
                    visibility = "Low visibility";
                return visibility;
            }

            function informUser(){
                var inform;
                if (json.weather[0].main == "Rain") {
                    inform = "Bring an Umbrella";
                }
                else if (json.weather[0].main == "Snow") {
                    inform = "Bring a coat";
                }
                else if(json.weather[0].main== "Clear") {
                    inform = "";
                }
                else
                    inform = "Stay Home";
                return inform;
            }
            

            var id = JSON.stringify(json.weather[0].id,undefined,2);
            
            var info;
            if(id == id.match(/2[0-9][0-9]+/g)){
                info="Thunderstorm expected, bring Raincoat and Umbrella";
            }
            else if (id == id.match(/3[0-9][0-9]+/g)) {
                info="Drizzle expected, better carry an umbrella";
            }
            else if(id == id.match(/5[0-9][0-9]+/g)){
                info = "Rain expected, bring umbrella";
            }
            else if (id == id.match(/6[0-9][0-9]+/g)) {
                info = "Snow expected, bring coat and hat";
            }
            else if(id==id.match(/8[0-9][0-9]+/g)){
                info = "Good weather, Enjoy!";
            }
            else if (id == id.match(/90[0-9]+/g)) {
                info = "Extreme weather, Stay at Home";
            }
            else{
                info = "How are you?";
            }
            

            document.getElementById("city").innerHTML = city+", "+country;
            document.getElementById("desc").innerHTML = description;
            document.getElementById("geoLon").innerHTML = geoLon;
            document.getElementById("geoLat").innerHTML = geoLat;
            document.getElementById("sunset").innerHTML = sunset;
            document.getElementById("sunrise").innerHTML = sunrise;
            document.getElementById("pressure").innerHTML = pressure;
            document.getElementById("humidity").innerHTML = humidity;
            document.getElementById("temperature").innerHTML = temperature;
            document.getElementById("min_temp").innerHTML = min_temp;
            document.getElementById("max_temp").innerHTML = max_temp;
            document.getElementById("cloud").innerHTML = cloud;
            document.getElementById("visible").innerHTML = visible;
            document.getElementById("info").innerHTML = info;

        }
    };
    xhr.send(null);
}
/*
display the city name,
 its geo coordinates, 
 time of sunset,
  sunrise,
   pressure, 
   humidity,
    temperature, 
    min temperature and max temperature,
     visibility, 
     clouds.*/
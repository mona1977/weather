//Fatch Weather and time from array list
var http = require('http');
var https = require('https');

var APP_ID_KEY = '2abcv98736f55fda190e19b28595525';
function getWithCoord(latitude,longitude)
{
	if(!latitude instanceof Number || !longitude instanceof Number){
		console.error("Please pass numbers as arguments");
	}
	else
		get("lat=" + latitude + "&lon=" , longitude);
}
function get(query)
{
	//GET request with searched query on API
	var request = http.get('http://api.openweathermap.org/data/2.5/weather?' 
		+ query + '&appid=' + APP_ID_KEY + '&units=metric',function(response){
		
		var body = "";
		//Collecting the data in body variable
		response.on('data',function(chunk){
			//Fetch data
			body += chunk;
		});
		response.on('end',function(data){

			//Check request success status code
			if(response.statusCode == 200){
				try{
					//Parse Data
					var jsondata = JSON.parse(body);
					if(jsondata["cod"] == 200){
						//Read data
						displayWeather(jsondata);
					}
					else{
						console.error(jsondata.cod + " " + jsondata.message);
					}
				}catch(error){
					console.error("No such parameter");
				}
			}
			else{
				console.error("No data found for current request");
			}
		});
	});
	
	request.on('error',function(error){
		console.error(error.message);
	});
}
function displayWeather(response)
{
	var tempMsg = "Your City: " + response.name;
	tempMsg += "\nCurrent Temp: " + Math.round(response.main.temp) + "°C"; 
	tempMsg += "\nMin Temp: " + Math.round(response.main.temp_min) + "°C";
	tempMsg += "\nMax Temp: " + Math.round(response.main.temp_max) + "°C";
	tempMsg += "\nDescription: " + response.weather[0].description;
	console.log(tempMsg);
}
module.exports.get = get;
module.exports.getCoord = getWithCoord;
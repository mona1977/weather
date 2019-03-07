var weather = require('./getWeather');
if(process.argv.length > 2){
	if(process.argv.length>3){
		weather.getCoord(process.argv[2],process.argv[3]);
	}
	else{
		if(parseInt(process.argv[2]))
			weather.get('zip=' + process.argv[2]);
		else
			weather.get("q=" + process.argv[2]);
	}
}
else{
	console.error("Please pass city/zipcode/geo-coordinates as argument");
}

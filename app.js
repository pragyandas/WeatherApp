var express = require('express');
var bodyParser = require('body-parser');
var weather_1 = require('./weather');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var weatherData = [];
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', express.static('public'));
server.listen(app.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at port %s', app.get('port'));
});
io.on('connection', function (socket) {
    console.log('Connection Successful with id: ' + socket.id);
    var weather = new weather_1.Weather();
    if (weatherData.length > 0) {
        socket.emit('weatherData', weatherData);
    }
    weather.weatherDataSubject.subscribe(function (result) {
        var cities = Object.keys(result), mapData = [];
        cities.forEach(function (city) {
            mapData.push({ city: city, latitude: result[city].latitude, longitude: result[city].longitude, weather: result[city].currently });
        });
        weatherData = mapData.map(function (d) {
            return {
                city: d.city,
                position: {
                    lat: d.latitude,
                    lon: d.longitude
                },
                weather: {
                    temperature: d.weather.temperature,
                    icon: 'wi-forecast-io-' + d.weather.icon,
                    summary: d.weather.summary
                }
            };
        });
        socket.emit('weatherData', weatherData);
        console.log('weatherDataEmitted');
    }, function (error) {
        console.error(error);
    });
    socket.on('getCityDetails', function (city) {
        weather.getWeatherDetails(city);
        weather.weatherDetailSubject.subscribe(function (result) {
            socket.emit('cityWeatherDetails', result);
            console.log('weatherDetailsEmitted');
        }, function (error) {
            console.error(error);
        });
        weather.weatherForcastSubject.subscribe(function (result) {
            socket.emit('cityForcastDetails', result);
            console.log('weatherForcastEmitted');
        }, function (error) {
            console.error(error);
        });
    });
});

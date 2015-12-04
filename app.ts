var express = require('express');
var bodyParser = require('body-parser');
import {Weather, IWeather} from './weather';
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var weatherData: any = [];
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('public'));

server.listen(app.get('port'), () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at port %s', app.get('port'));
});


io.on('connection', (socket) => {
    console.log('Connection Successful with id: ' + socket.id);
    var weather = new Weather();
    if (weatherData.length > 0) {
        socket.emit('weatherData', weatherData);
    }
    weather.weatherDataSubject.subscribe((result) => {
        var cities = Object.keys(result), mapData: any[] = [];
        cities.forEach((city) => {
            mapData.push({ city: city, latitude: result[city].latitude, longitude: result[city].longitude, weather: result[city].currently });
        });
        weatherData = mapData.map((d) => {
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
    }, (error) => {
        console.error(error);
    });

    socket.on('getCityDetails', (city) => {
        weather.getWeatherDetails(city);
        weather.weatherDetailSubject.subscribe((result) => {
            socket.emit('cityWeatherDetails', result);
            console.log('weatherDetailsEmitted');
        }, (error) => {
            console.error(error);
        });
        weather.weatherForcastSubject.subscribe((result) => {
            socket.emit('cityForcastDetails', result);
            console.log('weatherForcastEmitted');
        }, (error) => {
            console.error(error);
        });
    });
});

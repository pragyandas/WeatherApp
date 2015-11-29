var express = require('express');
var bodyParser = require('body-parser');
var weatherDataSource = require('./weather');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var weatherData:any[]=[];

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

weatherDataSource.subscribe((result) => {
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
    io.sockets.emit('weatherData', weatherData);
    console.log('weatherDataEmitted');
}, (error) => {
    console.error(error);
});


io.on('connection', (socket) => {
    if(weatherData.length>0){
      socket.emit('weatherData',weatherData);
      console.log('weatherDataEmitted');
    }
});

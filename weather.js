var Firebase = require("firebase");
var Rx = require('@reactivex/rxjs');
var Weather = (function () {
    function Weather() {
        var _this = this;
        this.weatherDataSubject = new Rx.Subject();
        this.weatherDetailSubject = new Rx.Subject();
        this.weatherForcastSubject = new Rx.Subject();
        this.getWeatherDetails = function (city) {
            _this.firebase.child('/' + city + '/currently').on("value", function (result) {
                _this.weatherDetailSubject.next(result.val());
            });
            _this.firebase.child('/' + city + '/daily/data').on("value", function (result) {
                _this.weatherForcastSubject.next(result.val());
            });
        };
        this.firebase = new Firebase('https://publicdata-weather.firebaseio.com');
        this.firebase.on("value", function (result) {
            _this.weatherDataSubject.next(result.val());
        });
    }
    return Weather;
})();
exports.Weather = Weather;

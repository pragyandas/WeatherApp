var Firebase = require("firebase");
var EventEmitter = require("events").EventEmitter;
var Rx = require('@reactivex/rxjs');
var firebase = new Firebase('https://publicdata-weather.firebaseio.com');
var weatherDataSubject = new Rx.Subject();
var eventEmitter = new EventEmitter();
var weatherDataSource = Rx.Observable.fromEvent(eventEmitter, 'mapdata');
firebase.on("value", function (result) {
    eventEmitter.emit('mapdata', result.val());
});
weatherDataSource.subscribe(weatherDataSubject);
module.exports = weatherDataSubject;

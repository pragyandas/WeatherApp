var Firebase = require("firebase");
var EventEmitter = require("events").EventEmitter;
import * as Rx from '@reactivex/rxjs';

var firebase = new Firebase('https://publicdata-weather.firebaseio.com');
var weatherDataSubject:Rx.Subject<any> = new Rx.Subject();
var eventEmitter = new EventEmitter();
var weatherDataSource:Rx.Observable<any> = Rx.Observable.fromEvent(eventEmitter, 'mapdata');
firebase.on("value", (result) => {
    eventEmitter.emit('mapdata', result.val());
});
weatherDataSource.subscribe(weatherDataSubject);
module.exports = weatherDataSubject;

var Firebase = require("firebase");
import * as Rx from '@reactivex/rxjs';

export interface IWeather{
  weatherDataSubject:Rx.Subject<any>,
  weatherDetailSubject:Rx.Subject<any>,
  weatherForcastSubject:Rx.Subject<any>,
  getWeatherDetails:(string)=>void
}

export class Weather implements IWeather{
  constructor(){
    this.firebase = new Firebase('https://publicdata-weather.firebaseio.com');
    this.firebase.on("value", (result) => {
        this.weatherDataSubject.next(result.val());
    });
  }
  firebase:any;
  weatherDataSubject:Rx.Subject<any>=new Rx.Subject<any>();
  weatherDetailSubject:Rx.Subject<any>=new Rx.Subject<any>();
  weatherForcastSubject:Rx.Subject<any>=new Rx.Subject<any>();
  getWeatherDetails=(city: string) : void =>{
    this.firebase.child('/'+city+'/currently').on("value",(result)=>{
      this.weatherDetailSubject.next(result.val());
    });
    this.firebase.child('/'+city+'/daily/data').on("value",(result)=>{
      this.weatherForcastSubject.next(result.val());
    });
  }
}

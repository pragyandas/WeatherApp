import {Http,Headers} from 'angular2/http';
import {Injectable} from 'angular2/angular2';
import * as Rx from '@reactivex/rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WeatherService{
  constructor(){
    this.socket=io.connect(this.url);
    this.socket.on('weatherData',(data)=>{
      this.weatherDataSubject.next(data);
    });
    this.socket.on('cityWeatherDetails',(data)=>{
      this.wetherDetailsSubject.next(data);
    });
    this.socket.on('cityForcastDetails',(data)=>{
      this.weatherForcastSubject.next(data);
    });
  }
  private socket:SocketIOClient.Socket;
  getWeatherDetails=function(city:string){
    this.socket.emit('getCityDetails',city);
  }
  url:string="http://localhost:3000";
  weatherDataSubject:Rx.Subject<any>=new Rx.Subject<any>();
  wetherDetailsSubject:Rx.Subject<any>=new Rx.Subject<any>();
  weatherForcastSubject:Rx.Subject<any>=new Rx.Subject<any>();


}

import {Http,Headers} from 'angular2/http';
import {Injectable} from 'angular2/angular2';
import * as Rx from '@reactivex/rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WeatherService{
  constructor(){
    var socket:SocketIOClient.Socket=io.connect(this.url);
    socket.on('weatherData',(data)=>{
      this.weatherDataSubject.next(data);
    });
  }

  url:string="http://localhost:3000";
  weatherDataSubject:Rx.Subject<any>=new Rx.Subject<any>();
  wetherDetailsSubject:Rx.Subject<any>=new Rx.Subject<any>();
  weatherForcastSubject:Rx.Subject<any>=new Rx.Subject<any>();


}

import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WeatherService} from './weatherService';
import {DrawMap} from './utility/drawMap';
import {WeatherData} from './models';

@Component({
  selector: 'weather-forcast',
  templateUrl: '../templates/forcastTemplate.html',
  directives: [CORE_DIRECTIVES],
  providers: [WeatherService],
  styleUrls: ['../styles/forcastStyle.css']
})
export class WeatherForcast {
    constructor(private weatherService: WeatherService) {
      weatherService.weatherForcastSubject.subscribe((details) => {
        console.log(details);
        details.forEach(d=>{
            //var date = new Date(d.sunriseTime);
            //d.sunriseTime = date.getHours() + ":" + date.getMinutes();

        });
        this.details = details;
      })
    }
    details: any;
}

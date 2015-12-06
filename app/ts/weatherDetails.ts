import {Component,CORE_DIRECTIVES} from 'angular2/angular2';
import {WeatherService} from './weatherService';
import {DrawMap} from './utility/drawMap';
import {WeatherData} from './models';

@Component({
  selector: 'weather-details',
  templateUrl: '../templates/detailsTemplate.html',
  directives: [CORE_DIRECTIVES],
  providers: [WeatherService],
  styleUrls: ['../styles/detailsStyle.css']
})
export class WeatherDetails{
  constructor(private weatherService:WeatherService){
    DrawMap.clickSubject.subscribe((city)=>{
      weatherService.getWeatherDetails(city);
    })
    weatherService.wetherDetailsSubject.subscribe((details)=>{
      this.details=details;
      console.log(details);
    })
  }
  toggle=function(){
    console.log('Toggle');
  }
  details:any;
}

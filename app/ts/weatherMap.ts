import {Component,FORM_DIRECTIVES, CORE_DIRECTIVES,AfterViewInit} from 'angular2/angular2';
import {WeatherService} from './weatherService';
import {Draw} from './utility/drawMap';
import {WeatherData} from './models';

@Component({
  selector: 'weather-map',
  templateUrl: '../templates/appTemplate.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [WeatherService],
  styleUrls: ['../styles/appStyle.css']
})
export class WeatherMap implements AfterViewInit{
  constructor(private weatherService:WeatherService){
  }
  afterViewInit(){
    this.weatherService.weatherDataSubject.subscribe((data:WeatherData[])=>{
      this.data=data;
      Draw.drawMap(this.id,data);
    });
  }
  data:any[]
  id:string='mapContainer'
}

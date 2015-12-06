import {Component,FORM_DIRECTIVES, CORE_DIRECTIVES,AfterViewInit} from 'angular2/angular2';
import {WeatherService} from './weatherService';
import {DrawMap} from './utility/drawMap';
import {WeatherData} from './models';

@Component({
  selector: 'weather-map',
  templateUrl: '../templates/mapTemplate.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [WeatherService],
  styleUrls: ['../styles/mapStyle.css']
})
export class WeatherMap implements AfterViewInit{
  constructor(private weatherService:WeatherService){
  }
  afterViewInit(){
    this.weatherService.weatherDataSubject.subscribe((data:WeatherData[])=>{
      this.data=data;
      DrawMap.drawMap(this.id,data);
    });
  }
  data:any[]
  id:string='mapContainer'
}

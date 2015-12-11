import {Component} from 'angular2/angular2';
import {WeatherMap} from './weatherMap.ts';
import {WeatherDetails} from './weatherDetails.ts';
import {WeatherForcast} from './weatherForcast';
import {WeatherService} from './weatherService';

@Component({
  selector: 'weather-app',
  templateUrl:'../templates/appTemplate.html',
  directives: [WeatherMap,WeatherDetails, WeatherForcast],
  styleUrls: ['../styles/appStyle.css']
})
export class WeatherApp {
}

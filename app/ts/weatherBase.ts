import {Component} from 'angular2/angular2';
import {WeatherMap} from './weatherMap.ts';
import {WeatherDetails} from './weatherDetails.ts';
import {WeatherService} from './weatherService';

@Component({
  selector: 'weather-app',
  templateUrl:'../templates/appTemplate.html',
  directives: [WeatherMap,WeatherDetails],
  styleUrls: ['../styles/appStyle.css']
})
export class WeatherApp {
}

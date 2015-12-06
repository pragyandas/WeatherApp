import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
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
export class WeatherDetails {
  constructor(private weatherService: WeatherService) {
    DrawMap.locationSubject.subscribe((city) => {
      this.city = city;
      weatherService.getWeatherDetails(city);
    });
    weatherService.wetherDetailsSubject.subscribe((details) => {
      this.details = details;
      this.icon = this.details.icon;
      delete this.details.icon;
      var date = new Date(this.details.time * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      this.details.time=hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.detailKeys = Object.keys(this.details);
      this.temperature = Math.round(this.details.temperature);
    })
  }
  toggle = function() {
    this.toggleDetails = !this.toggleDetails;
  }
  toggleDetails: boolean = true;
  icon: string;
  detailKeys: string[];
  temperature: number;
  city: string;
  details: any;
}

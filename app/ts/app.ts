import {bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {WeatherService} from './weatherService';
import {WeatherMap} from './weatherMap';
bootstrap(WeatherMap, [HTTP_PROVIDERS, WeatherService]);

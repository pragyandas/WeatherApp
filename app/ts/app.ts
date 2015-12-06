import {bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {WeatherService} from './weatherService';
import {WeatherApp} from './weatherBase';
bootstrap(WeatherApp, [HTTP_PROVIDERS, WeatherService]);

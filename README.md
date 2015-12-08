# WeatherApp

Real-Time(well almost...) Weather Application written in TypeScript featuring Firebase, Express, Socket.io, RxJs (client as well as server), Angular2.0 and D3 using 'Firebase Data Sets: Weather'

#### Please note Angular 2.0 is in Alpha. This repo uses angular2 2.0.0-alpha.45

### Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

##How to Start

Note that this project requires node v4.x.x or higher and npm 3.x.x.
This project needs webpack for module bundling.

###Installing Dependencies

Install the following if not installed.
* $ npm install webpack -g 
* $ npm install typescript -g

###Clone and get started

* $ git clone https://github.com/pragyandas/WeatherApp.git
* $ cd WeatherApp

This project is completely written in typescript, please follow the compilation steps.
###Compilation steps

* $ tsc
* $ cd app
* $ webpack

###Starting the Application

* $ npm start

###Using tsd
```
npm install --global tsd
```
Using tsd will help in auto-complete and refactoring. 

###Using a TypeScript Aware Editor

* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)

For server side [tsconfig.json](https://github.com/Microsoft/typescript/wiki/tsconfig.json) auto-compile has not been disabled which enables the compilation of TypeScript on save in these editors. 

# License

MIT

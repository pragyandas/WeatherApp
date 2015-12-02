import * as Rx from '@reactivex/rxjs';
import * as d3 from 'd3';
var topojson = require('topojson');
import {WeatherData} from '../models';

export class Draw {
    private static height: number;
    private static width: number;
    private static svg: d3.Selection<any>;
    public static drawMap(id: string, data: WeatherData[]) {
        if (!this.svg) {
            this.width = document.getElementById(id).offsetWidth;
            this.height = document.getElementById(id).offsetHeight;
            var scale = 0.25 * this.height;

            var projection = d3.geo.albersUsa()
                .scale(1000)
                .translate([this.width / 2, this.height / 2]);


            var path = d3.geo.path()
                .projection(projection);

            var svg = d3.select("#" + id).append("svg")
                .attr("width", this.width)
                .attr("height", this.height)

            this.svg = svg;

            d3.json("/assets/us.json", (error, us) => {
                if (error) throw error;

                svg.append("g")
                    .attr("id", id + "_svg")
                    .attr("class", "land")
                    .selectAll("path")
                    .data(topojson.feature(us, us.objects.states).features)
                    .enter().append("path")
                    .attr("d", path);


                svg.insert("path", ".graticule")
                    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                    .attr("class", "state-boundary")
                    .attr("d", path);

                this.drawLocations(id, data);
            })
        }
        else {
            this.drawLocations(id, data);
        }
    }
    private static drawLocations(id: string, data: WeatherData[]) {
        var projection = d3.geo.albersUsa()
            .scale(1000)
            .translate([this.width / 2, this.height / 2]);
        var g = this.svg.select("#" + id + "_svg");
        g.selectAll('.marker')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'marker')
            .attr("cx", (d) => {
                return projection([d.position.lon, d.position.lat])[0];
            })
            .attr("cy", (d) => {
                return projection([d.position.lon, d.position.lat])[1];
            })
            .attr("r", 4)
            .style('fill', '#0000ff')
            .on('mouseover', (d) => {
                //this.drawLocationSvg(event, d);
            });

        g.selectAll('.temperature')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'temperature')
            .attr('rx',5)
            .attr('ry',5)
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0]-50;
            })
            .attr("y", (d) => {
                return projection([d.position.lon, d.position.lat])[1]-30;
            })
            .attr('width',(d) => {
                return 50;
            })
            .attr('height',(d) => {
                return 30;
            })
            .style('fill', '#00ff00')
            .append('text')
            .text((d)=>{
              return d.weather.temperature;
            })
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0]-50;
            })
            .attr("y", (d) => {
                return projection([d.position.lon, d.position.lat])[1]-30;
            });
    }
    // private static drawLocationSvg(e: Event, data: WeatherData) {
    //     // console.log(e.target);
    //     // console.log(data.city + '-' +data.weather.temperature);
    //     //var city=d3.select(e.target);
    //     var promise = new Promise((resolve, reject) => {
    //         d3.xml("/assets/location.svg", "image/svg+xml", (error, xml) => {
    //             if (error) reject(error);
    //             resolve(xml.documentElement);
    //         });
    //     });
    //
    //     promise.then((svg) => {
    //         document.body.appendChild(<Node>svg);
    //         // d3.select('#location-pointer')
    //     }, (err) => {
    //         console.error(err);
    //     })
    //
    // }
}

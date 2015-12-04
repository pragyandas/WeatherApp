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

        var circleGroup = g.selectAll('.marker')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'circleGroup');

        circleGroup
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
            .style('cursor', 'pointer')
            .on('mouseover', function(d) {
                d3.select('#' + d.city)
                    .attr('display', 'block');
                d3.select('#' + d.city + '_text')
                    .attr('display', 'block');
            })
            .on('mouseout', function(d) {
                d3.select('#' + d.city)
                    .attr('display', 'none');
                d3.select('#' + d.city + '_text')
                    .attr('display', 'none');
            });

        circleGroup
            .append('rect')
            .attr('class', 'temperature')
            .attr('rx', 5)
            .attr('ry', 5)
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 100;
            })
            .attr("y", (d) => {
                return projection([d.position.lon, d.position.lat])[1] - 70;
            })
            .attr('width', (d) => {
                return 100;
            })
            .attr('height', (d) => {
                return 70;
            })
            .attr('id', (d) => {
                return d.city;
            })
            .style('fill', '#4b4b4b')
            .attr('display', 'none');

        var text = circleGroup
            .append('text')
            .attr("y", (d) => {
                return projection([d.position.lon, d.position.lat])[1] - 50;
            })
            .attr('id', function(d) {
                return d.city + '_text';
            })
            .attr('display', 'none')
            .style('fill', '#fff');



        text.append('tspan')
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 90;
            })
            .text((d) => {
                return d.city.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
            })
            .style("font-size",'16')
            .style("font-weight","bold");

        text.append('tspan')
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 90;
            })
            .text((d) => {
                return d.weather.temperature
            })
            .style("font-size",'14')
            .attr('dy', '20');

        text.append('tspan')
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 50;
            })
            .text((d) => {
                return String.fromCharCode(248);
            })
            .style("font-size",'14')
            .style("baseline-shift", "super");

        text.append('tspan')
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 40;
            })
            .style("font-size",'14')
            .text('F');

        text.append('tspan')
            .attr("x", (d) => {
                return projection([d.position.lon, d.position.lat])[0] - 90;
            })
            .text((d) => {
                return d.weather.summary;
            })
            .style("font-size",'12')
            .attr('dy', '20');
    }
}

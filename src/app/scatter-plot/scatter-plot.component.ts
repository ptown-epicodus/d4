import { Component, OnInit, Input } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';
import { SEASONS } from '../bobross_data';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})

export class ScatterPlotComponent implements OnInit {
  @Input() SEASONS: any;
  seasons = SEASONS;
  private d3: D3;
  private w = 500;
  private h = 500;
  svg: any;

  private dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];
  parentArray = [];

  constructor(d3Service: D3Service) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    // console.log(this.seasons.season_1.bushes);
    // console.log(this.seasons.season_1.cabin);
    // console.log(Object.keys(this.seasons).length);

    // console.log(this.seasons["season_1"].bushes);
    let d3 = this.d3;

    this.svg = this.d3 //select div
      .select("#bRoss")
      .append("svg")
      .attr("width", this.w)
      .attr("height", this.h);
    this.getData();
    this.drawScatterPlot();
  }

  getData() {
    for (var i = 1; i <= Object.keys(this.seasons).length; i++) {
      var childArray = [];
      var seasonString: string = "season_" + i;
      let result1 = this.seasons[seasonString].bushes;
      let result2 = this.seasons[seasonString].cabin;
      childArray.push(result1);
      childArray.push(result2);
      this.parentArray.push(childArray);
    }
    console.log(this.parentArray);
  }

  drawScatterPlot() {
    let xValues = this.dataset
      .map(function(el) {
        return el[0];
      })
      .sort(function(a,b) {
        return b-a;
      });

    let yValues = this.dataset
      .map(function(el) {
        return el[1];
      })
      .sort(function(a,b) {
        return b-a;
      });

    let maxX = xValues[0];
    let maxY = yValues[0];
    let padding = 30;

    let xScale = this.d3
      .scaleLinear()
      .domain([0, maxX])
      .range([padding, this.w - padding * 2]);

    let yScale = this.d3
      .scaleLinear()
      .domain([0, maxY])
      .range([this.h - padding, padding]);

    let rScale = this.d3
      .scaleLinear()
      .domain([0, maxY])
      .range([2, 5]);


    let xAxis = this.d3
      .axisBottom(xScale)
      .ticks(5);

    let yAxis = this.d3
      .axisLeft(yScale)
      .ticks(5);

    let circles = this.svg //select circles
      .selectAll("circle")
      .data(this.dataset);

    circles.exit().remove(); //removes elements that do not have data

    circles //draw circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("cx", function(d) {
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return yScale(d[1]);
      })
      .attr("r", function(d) {
        return rScale(d[1]);
      });

    let text = this.svg //select and append text
      .selectAll("text")
      .data(this.dataset);

    text.exit().remove(); //removes elements that do not have data

    text
      .enter()
      .append("text")
      .text(function(d) {
        return d[0] + "," + d[1];
      })
      .merge(text) //?
      .attr("x", function(d) {
        return xScale(d[0]);
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "red");

    this.svg //group by xAxis
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (this.h - padding) + ")")
      .call(xAxis);

    this.svg //group by yAxis
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);
  }
}

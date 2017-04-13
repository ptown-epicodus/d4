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
  private w = 750;
  private h = 750;
  svg: any;

  parentArray = [];
  firstSubject = "bushes";
  secondSubject = "cabin";

  constructor(d3Service: D3Service) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
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
      let result1 = this.seasons[seasonString][this.firstSubject];
      let result2 = this.seasons[seasonString][this.secondSubject];
      childArray.push(result1);
      childArray.push(result2);
      this.parentArray.push(childArray);
    }
  }

  drawScatterPlot() {
    let xValues = this.parentArray
      .map(function(el) {
        return el[0];
      })
      .sort(function(a,b) {
        return b-a;
      });

    let yValues = this.parentArray
      .map(function(el) {
        return el[1];
      })
      .sort(function(a,b) {
        return b-a;
      });

    let maxX = xValues[0];
    let maxY = yValues[0];
    let padding = 40;

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
      .data(this.parentArray);

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
        return 5;
      });

    let text = this.svg //select and append text
      .selectAll("text")
      .data(this.parentArray);

    // let div = this.d3.select("#bRoss").append("div")
    //   .attr("class", "tooltip")
    //   .style("opacity", 0);

    text.exit().remove(); //removes elements that do not have data

    text
      .enter()
      .append("text")
      .merge(text)
      // .on("mouseover", function(d, i) {
      //   div.transition()
      //   .duration(200)
      //   .style("opacity", .9);
      //   div.html("S" + i);
      // })
      .text(function(d,i) {
        return ('S ' + i);
      })
      .attr("x", function(d) {
        return xScale(d[0]);
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "red");

    this.svg //removes elements that do not have data
      .selectAll(".axis")
      .remove();

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

    this.svg //text label for the x axis
      .append("text")
      .attr("x", 435 )
      .attr("y", 895 )
      .style("text-anchor", "middle")
      .text(this.firstSubject);

    this.svg //text label for y axis
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 1)
      .attr("x",0 - (this.h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.secondSubject);
  }



  changeFirstSubject(optionFromMenu) {
    this.firstSubject = optionFromMenu;
    console.log(this.firstSubject);
    this.parentArray = [];
    this.getData();
    this.drawScatterPlot();
  }

  changeSecondSubject(optionFromMenu) {
    this.secondSubject = optionFromMenu;
    console.log(this.secondSubject);
    this.parentArray = [];
    this.getData();
    this.drawScatterPlot();
  }




}

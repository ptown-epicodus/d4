import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

@Component({
  selector: 'app-tsv-practice',
  templateUrl: './tsv-practice.component.html',
  styleUrls: ['./tsv-practice.component.css']
})
export class TsvPracticeComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  public data: any[];

  constructor(d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    var d3 = this.d3;
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.parseData();

    // Compute the scales’ domains.
    x.domain(d3.extent(this.data, function(d) { return d.x; })).nice();
    y.domain(d3.extent(this.data, function(d) { return d.y; })).nice();

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    // Add the points!
    svg.selectAll(".point")
        .data(this.data)
        .enter().append("circle")
        .attr("class", "point")
        .attr("r", 4.5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); });
  }

  parseData() {
    var tsvData = "x\ty\n5\t90\n25\t30\n45\t50\n65\t55\n85\t25";

    this.data = this.d3.tsvParse(tsvData);

    // Coerce the data to numbers.
    this.data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
    });
    console.log(this.data);

  }

}

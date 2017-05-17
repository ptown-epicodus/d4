import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// data
import { TSV_DATA, movies } from '../tsv_data';


@Component({
  selector: 'app-tsv-practice',
  templateUrl: './tsv-practice.component.html',
  styleUrls: ['./tsv-practice.component.css']
})
export class TsvPracticeComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private data: any[];
  private movieData: any[];

  constructor(d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    var d3 = this.d3;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // setup scales
    var xScale = d3.scaleLinear()
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .range([height, 0]);

    // init SVG for scatter plot
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.parseData();

    // Compute the scales’ domains.
    xScale.domain(d3.extent(this.data, function(d) { return d.x; })).nice();
    yScale.domain(d3.extent(this.data, function(d) { return d.y; })).nice();

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    // Add the points!
    svg.selectAll(".point")
        .data(this.data)
        .enter().append("circle")
        .attr("class", "point")
        .attr("r", 4.5)
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); });

    var movies = this.movieData;
    // init table for movie data
    var table = d3.select('body').append('table');

    // create row for each element
    var tr = table.selectAll('tr')
        .data(movies).enter()
        .append('tr');

    // write cells
    tr.append('td')
      .attr('class', 'title')
      .html(function(m) { return m.title; });
    tr.append('td')
      .attr('class', 'center')
      .html(function(m) { return m.year; });
    tr.append('td').html(function(m) { return m.length; });
    tr.append('td')
      .attr('class', 'num')
      .html(function(m) { return m.budget; });
    tr.append('td').html(function(m) { return m.rating; });

    var columns = [
      { head: 'Movie title', cl: 'title',
        html: function(row) { return row.title; } },
      { head: 'Year', cl: 'center',
        html: function(row) { return row.year; } },
      { head: 'Length', cl: 'center',
        html: function(row) { return row.length; } },
      { head: 'Budget', cl: 'num',
        html: function(row) { return row.budget; } },
      { head: 'Rating', cl: 'num',
        html: function(row) { return row.rating; } }
    ];

    // create column headers
    table.append('thead').append('tr')
         .selectAll('th')
         .data(columns).enter()
         .append('th')
         .attr('class', function(d) { return d.cl; })
         .text(function(d) { return d.head; });

  //  table.append('tbody')
  //       .selectAll('tr')
  //       .data(movies).enter()
  //       .append('tr')
  //       .selectAll('td')
  //       .data(function(row, i) {
  //           // evaluate column objects against the current row
  //           return columns.map(function(c) {
  //               var cell = {};
  //               d3.keys(c).forEach(function(k) {
  //                   cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
  //               });
  //               return cell;
  //           });
  //       }).enter()
  //       .append('td')
        // .html(function(d) { return d.html; })
        // .attr('class', function(d) { return d.cl; });
  }

  parseData() {
    this.data = this.d3.tsvParse(TSV_DATA);
    this.movieData = movies;

    // Coerce the data to numbers.
    this.data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
    });
  }

}

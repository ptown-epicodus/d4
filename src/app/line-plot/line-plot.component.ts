import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

@Component({
  selector: 'app-line-plot',
  templateUrl: './line-plot.component.html',
  styleUrls: ['./line-plot.component.css']
})
export class LinePlotComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference

  data: number[][] = [
      [1,2],
      [3,4],
      [5,6],
      [7,8],
      [9,10]
  ];
  data2: number[][] = [
      [1,2],
      [2,4],
      [3,6],
      [4,8],
      [5,10]
  ];
  width: number; // These are gobal values used to scale the component
  height: number; // These are gobal values used to scale the component
  selection: any;


  constructor(d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    // this creates an svg element in the template and saves the reference for future use by display functions
    var w = 500,
        h = 500;
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    this.width = w - margin.left - margin.right;
    this.height = h - margin.top - margin.bottom;

    this.selection = this.d3.select('body')
                            .append('svg')
                            .attr("width", this.width + margin.left + margin.right)
                            .attr("height", this.height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                  "translate(" + margin.left + "," + margin.top + ")");



    this.drawLine(this.width, this.height)  // call the draw function to create the inital state of the visualization
  }

  drawButtonClicked() {
    this.drawLine(this.width, this.height);
  }

  drawLine(width, height) {
    // this is the key portion that lets this function correctly draw the element as the data is updated.  This takes our selection property then selects the elements within it that we will act on ('rect' in this case), and joins the data.  The reference to this data join is then stored in the join variable.
    let join = this.selection.selectAll('path').data([this.data, this.data2]);

    let xScale = this.d3.scaleLinear()
              .domain([0, this.d3.max(this.data, function(d: number[]) { return d[0]; })])
              .range([0, width]);

    let yScale = this.d3.scaleLinear()
              .domain([0, this.d3.max(this.data, function(d: number[]) { return d[1]; })])
              .range([height, 0]);


    let drawLine = this.d3.line()
                          .x(function(d) {return xScale(d[0]); })
                          .y(function(d) {return yScale(d[1]); });


    join.exit().remove(); //removes extraneous elements that do not have data

    join.enter()
      .append('path') // this adds new elements for data that had no place to go
      .merge(join) // puts the update and enter sections of the join together so that all following methods will act on all elements.
      .transition() // Sets the default transition as display changes, and then modifies attributes of all elements in the join.
      .attr('d', drawLine)
      .attr('class', 'line')

    // Add the X Axis
    this.selection.append("g")
                  .attr("transform", "translate(0," + this.height + ")")
                  .call(this.d3.axisBottom(xScale));

    // Add the Y Axis
    this.selection.append("g")
                  .call(this.d3.axisLeft(yScale));

  }


}

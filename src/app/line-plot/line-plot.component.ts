import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

import { SEASONS, PICTURE_FEATURES } from '../bobross_data';

@Component({
  selector: 'app-line-plot',
  templateUrl: './line-plot.component.html',
  styleUrls: ['./line-plot.component.css']
})
export class LinePlotComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference

  private lineData: any[][][];
  width: number; // These are gobal values used to scale the component
  height: number; // These are gobal values used to scale the component
  selection: any;
  private pictureFeatures: string[] = PICTURE_FEATURES;
  private featuresShowing: boolean[] =[];


  constructor(d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.parseData();
    for (var i = 0; i < this.pictureFeatures.length; i++) {
      this.featuresShowing[i] = (i < 5); // start with only first 5 features showing
    }
    // this creates an svg element in the template and saves the reference for future use by display functions
    var w = 700,
        h = 500;
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    this.width = w - margin.left - margin.right;
    this.height = h - margin.top - margin.bottom;

    this.selection = this.d3.select('#line-plot')
                            .append('svg')
                            .attr("width", this.width + margin.left + margin.right)
                            .attr("height", this.height + margin.top + margin.bottom)
                            .append("g")
                            .attr("id", "global-g")
                            .attr("transform",
                                  "translate(" + margin.left + "," + margin.top + ")");



    this.drawLine(this.width, this.height)  // call the draw function to create the inital state of the visualization
  }

  drawButtonClicked() {
    this.drawLine(this.width, this.height);
  }

  drawLine(width, height) {
    let d3 = this.d3;
    let lineData =
    this.lineData.filter((el, index) => {
      return this.featuresShowing[index];
    });
    // this is the key portion that lets this function correctly draw the element as the data is updated.  This takes our selection property then selects the elements within it that we will act on ('rect' in this case), and joins the data.  The reference to this data join is then stored in the join variable.
    let join = this.selection.selectAll('path.line').data(lineData);

    let xScale = d3.scaleLinear()
              .domain([0, d3.max(this.lineData, function(d: any[][]) { return d3.max(d, function(e: number[]) { return e[0]; }); })])
              .range([0, width]);

    let yScale = d3.scaleLinear()
              .domain([0, d3.max(this.lineData, function(d: any[][]) { return d3.max(d, function(e: number[]) { return e[1]; }); })])
              .range([height, 0]);


    let drawLine = d3.line()
                          .x(function(d) {return xScale(d[0]); })
                          .y(function(d) {return yScale(d[1]); });

    let tooltip = d3.select("body").append("div")
                                   .attr("class", "line-tooltip")
                                   .style("position", "absolute")
                                   .style("visibility", "hidden")
                                   .style("z-index", "10")
                                   .text("tooltip");


    join.exit().remove(); //removes extraneous elements that do not have data

    join.enter()
      .append('path') // this adds new elements for data that had no place to go
      .merge(join) // puts the update and enter sections of the join together so that all following methods will act on all elements.
      .on("mouseover", function(d) { return tooltip.style("visibility", "visible")
                                                   .text(d.feature);
      })
      .on("mousemove", function() { return tooltip.style("top",  (d3.event.pageY-10)+"px")
                                                  .style("left", (d3.event.pageX+10)+"px");
      })
      .on("mouseout", function() { return tooltip.style("visibility", "hidden"); })
      .transition() // Sets the default transition as display changes, and then modifies attributes of all elements in the join.
      .attr('d', drawLine)
      .attr('class', function(d, i) {
        return 'line line-' + d.feature;
      });


    this.selection.selectAll(".axis")
                  .remove();

    // Add the X Axis
    this.selection.append("g")
                  .attr("transform", "translate(0," + this.height + ")")
                  .attr("class", "axis")
                  .call(d3.axisBottom(xScale));

    // Add the Y Axis
    this.selection.append("g")
                  .attr("class", "axis")
                  .call(d3.axisLeft(yScale));

  }

  parseData() {
    var data = {};
    var lineData = [];
    for(var i = 0; i < PICTURE_FEATURES.length; i++) {
      data[PICTURE_FEATURES[i]] = [];
    }
    var numSeasons:number = 30;

    for(var i = 0; i < numSeasons; i++) {
      var seasonName:string = 'season_' + (i+1);
      for(var j = 0; j < PICTURE_FEATURES.length; j++) {
        var propertyName:string = PICTURE_FEATURES[j];
        data[propertyName][i] = [i+1, SEASONS[seasonName][propertyName]];
      }
    }

    var numFeaturesToPlot: number = PICTURE_FEATURES.length;
    for(var i = 0; i < numFeaturesToPlot; i++) {
      lineData[i] = data[PICTURE_FEATURES[i]];
    }
    for(var i = 0; i < numFeaturesToPlot; i++) {
      lineData[i]['feature'] = PICTURE_FEATURES[i];
    }
    this.lineData = lineData;
    console.log(lineData);
  }

  toggleFeature(index: number) {
    this.featuresShowing[index] = ! this.featuresShowing[index];
  }


}

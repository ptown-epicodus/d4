import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis} from 'd3-ng2-service';
import { SEASONS } from '../bobross_data';

@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: ['./bar-plot.component.css']
})
export class BarPlotComponent implements OnInit {
  season: any;
  bushes = "bushes";
  selection: any;


  private d3: D3;
private parentNativeElement: any;

constructor(element: ElementRef, d3Service: D3Service) {
  this.d3 = d3Service.getD3();
  this.parentNativeElement = element.nativeElement;
}

ngOnInit() {
  // bobros.season_1 is gonna be the selection of the user
  this.season = SEASONS.season_2;
  this.selection = this.d3.select(".show-data-4")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
}


/////////////  D3   ////////////////////////
showData() {
  console.log(typeof(SEASONS.season_1.bushes));

  let d3 = this.d3;
  let parentNativeElement: any = this.parentNativeElement;
  let d3ParentElement: Selection<any, any, any, any>;

  if (this.parentNativeElement !== null) {
    d3ParentElement = this.d3.select(this.parentNativeElement);



    let h: number = 370; // height
    let w: number = 500; // Width

    let barPadding: number = 2;

//////ARRAY ALL PAINT ATRIBUTES//////////////////////
    let totalArray: any [] = [];


///////////////////MOUNTAINS/////////////////////////
    let hasMountains: any []= [];

    let counterMountain:number = 0;
       counterMountain += this.season[this.bushes];
    hasMountains.push(counterMountain);
    totalArray.push(counterMountain);

///////////////OCEANS//////////////////////////////////
      let hasOcean: any[] = [];
      let counterOcean:number = 0;
        counterOcean += this.season.lake;
      hasOcean.push(counterOcean);
      totalArray.push(counterOcean);

//////////////////////TREES////////////////////////////
      let hasTrees: any[] = [];
      let counterTrees:number = 0;
        counterTrees += this.season.snow;
      hasTrees.push(counterTrees);
      totalArray.push(counterTrees);

//////////////////////Sun////////////////////////////
      let hasSuns: any[] = [];
      let counterSuns:number = 0;
        counterSuns += this.season.lake ;
      hasTrees.push(counterSuns);
      totalArray.push(counterSuns);

///////////////////totalArray//////////////////////////

    console.log(totalArray);

    let join = this.selection.selectAll("rect")
          .data(totalArray)

          join.exit().remove();

    join.enter()
          .append("rect")
          .merge(join)
          .transition()
          .attr("x", function(d:any, i:any) {
            return i * (w / totalArray.length);
          })
          .attr("y", function(d:any) {
            return h - (d);
          })
          .attr("width", w / totalArray.length - barPadding)
          .attr("height", function(d:any) {
            return d;
          })
          .attr("fill", function(d:any) {
            return "green";
          });



          let padding = 30;
          let yScale = d3.scaleLinear()
                .domain([0, d3.max(totalArray, function(d) { return d; })])
                .range([h - padding, padding]);


          let xScale = d3.scaleLinear()
                .domain([0, totalArray.length])
                .range([padding, w - 10]);

          let xAxis = this.d3.axisBottom(xScale)
                     .ticks(5);

          let yAxis = this.d3.axisLeft(yScale);


          this.selection.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

          this.selection.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(" + padding + ",0)")
              .call(yAxis);
            }
          }
        }

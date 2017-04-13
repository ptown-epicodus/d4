
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

  showSeason(season){
    this.season = SEASONS["season_" + season];
    return this.showData();
  }

  ngOnInit() {
    this.selection = this.d3.select(".show-data-4")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500);
  }


  /////////////  D3   ////////////////////////
  showData() {

    let d3 = this.d3;
    let parentNativeElement: any = this.parentNativeElement;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);





      //////ARRAY ALL PAINT ATRIBUTES//////////////////////
      let totalArray: any [] = [];


      ///////////////////bushes/////////////////////////
      let counterMountain:number = 0;
      counterMountain += this.season.bushes;
      totalArray.push(counterMountain);

      ///////////////lake//////////////////////////////////
      let counterOcean:number = 0;
      counterOcean += this.season.lake;
      totalArray.push(counterOcean);

      //////////////////////snow////////////////////////////
      let counterTrees:number = 0;
      counterTrees += this.season.snow;
      totalArray.push(counterTrees);

      //////////////////////clouds////////////////////////////
      let counterSuns:number = 0;
      counterSuns += this.season.clouds ;
      totalArray.push(counterSuns);

      //////////////////////river////////////////////////////
      let counterRiver:number = 0;
      counterRiver += this.season.river;
      totalArray.push(counterRiver);

      //////////////////////grass////////////////////////////
      let counterGrass:number = 0;
      counterGrass += this.season.grass;
      totalArray.push(counterGrass);

      //////////////////////winter////////////////////////////
      let counterWinter:number = 0;
      counterWinter += this.season.winter;
      totalArray.push(counterWinter);

      //////////////////////waves////////////////////////////
      let counterWaves:number = 0;
      counterWaves += this.season.waves;
      totalArray.push(counterWaves);

      //////////////////////cactus////////////////////////////
      let counterCactus:number = 0;
      counterCactus += this.season.cactus;
      totalArray.push(counterCactus);

      //////////////////////conifer////////////////////////////
      let counterConifer:number = 0;
      counterConifer += this.season.conifer;
      totalArray.push(counterConifer);

      //////////////////////cumulus////////////////////////////
      let counterCumulus:number = 0;
      counterCumulus += this.season.cumulus;
      totalArray.push(counterCumulus);

      //////////////////////decidious////////////////////////////
      let counterDecidious:number = 0;
      counterDecidious += this.season.decidious;
      totalArray.push(counterDecidious);


      ///////////////////totalArray//////////////////////////

      console.log(totalArray);


      let h: number = 500; // height
      let w: number = 800; // Width

      let barPadding: number = 1;
      let padding = 25;

      let yScale = d3.scaleLinear()
      .domain([0, d3.max(totalArray, function(d) { return d; })])
      .range([padding,h- padding]);

      let yScaleInvert = d3.scaleLinear()
      .domain([0, d3.max(totalArray, function(d) { return d; })])
      .range([h-padding, padding]);


      let xScale = d3.scaleLinear()
      .domain([0, totalArray.length])
      .range([padding, w - padding ]);

      let barWidth = (w- 2*padding) / totalArray.length;

      let join = this.selection.selectAll("rect")
      .data(totalArray)

      join.exit().remove();

      join.enter()
      .append("rect")
      .merge(join)
      .transition()
      .attr("x", function(d:any, i:any) {
        return i * (barWidth) + padding +2;
      })
      .attr("y", function(d:any) {
        return  yScaleInvert(d);
      })
      .attr("width", barWidth-2)
      .attr("height", function(d:any) {
        return yScale(d)-padding ;
      })
      .attr("fill", function(d) {
        return "rgb(73, 82, " + (d * 10) + ")";
      });


let textJoin = this.selection.selectAll("text")
                              .data(totalArray);
textJoin
      .enter()
      .append("text")
      .merge(textJoin)
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return i * (barWidth) + padding *2;
      })
      .attr("y", function(d) {
      return h - yScale(d) + 15;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr( "transform" , function(d,i) {
        return "rotate(90 "+ (i * (barWidth) + padding *2) + "," + (h - yScale(d) + 15) + ")"
      })
      .attr("fill", "rgb(236, 225, 231)")

      let xAxis = this.d3.axisBottom(xScale)
      .ticks(5);

      let yAxis = this.d3.axisLeft(yScaleInvert);

      this.selection.selectAll('.axis').remove();

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

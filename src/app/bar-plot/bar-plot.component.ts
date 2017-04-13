
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
  selection: any;
  userSelection;


  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  showSeason(seasonNumber){
    this.userSelection = seasonNumber;
    this.season = SEASONS["season_" + seasonNumber];
    return this.showData();
  }

  ngOnInit() {
    this.selection = this.d3.select(".show-data-4")
    .append("svg")
    .attr("width", 1150)
    .attr("height", 500);
    this.userSelection = 1;
    this.season = SEASONS.season_1;
    console.log(this.season);
    return this.showData();
  }


  /////////////  D3   ////////////////////////
  showData() {

    let d3 = this.d3;
    let parentNativeElement: any = this.parentNativeElement;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);

      //////ARRAY ALL PAINT ATRIBUTES//////////////////////
      let totalArray = [];


      ///////////////////bushes/////////////////////////
      let counterBushes = [0, 'bushes'];
      counterBushes[0] += this.season.bushes;
      totalArray.push(counterBushes);


      ///////////////lake//////////////////////////////////
      let counterLake = [0, 'lake'];
      counterLake[0] += this.season.lake;
      totalArray.push(counterLake);

      //////////////////////snow////////////////////////////

      let counterTrees= [0, 'snow'];
      counterTrees[0] += this.season.snow;
      totalArray.push(counterTrees);

      //////////////////////clouds////////////////////////////
      let counterSuns= [0, 'clouds'];
      counterSuns[0] += this.season.clouds ;
      totalArray.push(counterSuns);

      //////////////////////river////////////////////////////
      let counterRiver= [0, 'river'];
      counterRiver[0] += this.season.river;
      totalArray.push(counterRiver);

      //////////////////////grass////////////////////////////
      let counterGrass= [0, 'grass'];
      counterGrass[0] += this.season.grass;
      totalArray.push(counterGrass);

      //////////////////////winter////////////////////////////
      let counterWinter= [0, 'winter'];
      counterWinter[0] += this.season.winter;
      totalArray.push(counterWinter);

      //////////////////////waves////////////////////////////
      let counterWaves= [0, 'waves'];
      counterWaves[0] += this.season.waves;
      totalArray.push(counterWaves);

      //////////////////////cactus////////////////////////////
      let counterCactus= [0, 'cactus'];
      counterCactus[0] += this.season.cactus;
      totalArray.push(counterCactus);

      //////////////////////conifer////////////////////////////
      let counterConifer= [0, 'conifer'];
      counterConifer[0] += this.season.conifer;
      totalArray.push(counterConifer);

      //////////////////////cumulus////////////////////////////
      let counterCumulus= [0, 'cumulus'];
      counterCumulus[0] += this.season.cumulus;
      totalArray.push(counterCumulus);

      //////////////////////decidious////////////////////////////
      let counterDecidious= [0, 'decidious'];
      counterDecidious[0] += this.season.decidious;
      totalArray.push(counterDecidious);

      ///////////////////totalArray//////////////////////////

      console.log(totalArray);

      let h: number = 500; // height
      let w: number = 1150; // Width

      let barPadding: number = 1;
      let padding = 25;

      let yScale = d3.scaleLinear()
      .domain([0, d3.max(totalArray, function(d) { return d[0]; })])
      .range([padding,h- padding]);

      let yScaleInvert = d3.scaleLinear()
      .domain([0, d3.max(totalArray, function(d) { return d[0]; })])
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
        return  yScaleInvert(d[0]);
      })
      .attr("width", barWidth-2)
      .attr("height", function(d:any) {
        return yScale(d[0])-padding ;
      })
      .attr("fill", function(d) {
        return "rgb(73, 82, " + (d[0] * 10) + ")";
      });


let textJoin = this.selection.selectAll("text")
                              .data(totalArray);
textJoin
      .enter()
      .append("text")
      .merge(textJoin)
      .text(function(d) {

        return d[1];
      })
      .attr("x", function(d, i) {
        return i * (barWidth) + padding *2;
      })
      .attr("y", function(d) {
      return h - yScale(d[0]) + 15;
      })
      .attr("font-family", "Gloria Hallelujah")
      .attr("font-size", "14px")
      // .attr( "transform" , function(d,i) {
      //   return "rotate(90 "+ (i * (barWidth) + padding *2) + "," + (h - yScale(d) + 15) + ")"
      // })
      .attr("fill", "#ededed")

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

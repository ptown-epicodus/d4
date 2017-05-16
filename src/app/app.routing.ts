import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { BarPlotComponent } from './bar-plot/bar-plot.component';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { HomeComponent } from './home/home.component';
import { TsvPracticeComponent } from './tsv-practice/tsv-practice.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'scatter',
    component: ScatterPlotComponent
  },
  {
    path: 'line',
    component: LinePlotComponent
  },
  {
    path: 'bar',
    component: BarPlotComponent
  },
  {
    path: 'tsv',
    component: TsvPracticeComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

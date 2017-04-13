import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { BarPlotComponent } from './bar-plot/bar-plot.component';
import { LinePlotComponent } from './line-plot/line-plot.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ScatterPlotComponent
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
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

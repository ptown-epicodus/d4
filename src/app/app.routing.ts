import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ExampleComponent
  },
  {
    path: 'scatter',
    component: ScatterPlotComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

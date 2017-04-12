import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component'

const appRoutes: Routes = [
  {
    path: '',
    component: ExampleComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

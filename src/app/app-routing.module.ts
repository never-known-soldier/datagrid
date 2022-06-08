import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridListComponent } from './pages/grid/grid.component';

const routes: Routes = [
  {
    path: 'grid',
    component: GridListComponent,
  },
  {
    path: '**',
    redirectTo: 'grid'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

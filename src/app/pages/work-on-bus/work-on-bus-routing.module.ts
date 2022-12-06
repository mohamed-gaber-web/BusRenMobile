import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOnBusPage } from './work-on-bus.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOnBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOnBusPageRoutingModule {}

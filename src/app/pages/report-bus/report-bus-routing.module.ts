import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportBusPage } from './report-bus.page';

const routes: Routes = [
  {
    path: '',
    component: ReportBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportBusPageRoutingModule {}

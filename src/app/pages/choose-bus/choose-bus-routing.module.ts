import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseBusPage } from './choose-bus.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseBusPageRoutingModule {}

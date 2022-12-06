import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginButtonScreenPage } from './login-button-screen.page';

const routes: Routes = [
  {
    path: '',
    component: LoginButtonScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginButtonScreenPageRoutingModule {}

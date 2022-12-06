import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginButtonScreenPageRoutingModule } from './login-button-screen-routing.module';

import { LoginButtonScreenPage } from './login-button-screen.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginButtonScreenPageRoutingModule,
    SharedModule,
  ],
  declarations: [LoginButtonScreenPage]
})
export class LoginButtonScreenPageModule {}

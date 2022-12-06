import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBusPageRoutingModule } from './add-bus-routing.module';

import { AddBusPage } from './add-bus.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddBusPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgOtpInputModule
  ],
  declarations: [AddBusPage]
})
export class AddBusPageModule {}

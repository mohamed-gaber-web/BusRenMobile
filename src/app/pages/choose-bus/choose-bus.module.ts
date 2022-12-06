import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseBusPageRoutingModule } from './choose-bus-routing.module';

import { ChooseBusPage } from './choose-bus.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ChooseBusPageRoutingModule,
    SharedModule,
    NgOtpInputModule,
    NgxPaginationModule
  ],
  declarations: [ChooseBusPage]
})
export class ChooseBusPageModule {}

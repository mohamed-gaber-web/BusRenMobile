import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllEmpolyeePageRoutingModule } from './all-empolyee-routing.module';

import { AllEmpolyeePage } from './all-empolyee.page';
import { NgOtpInputModule } from  'ng-otp-input';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllEmpolyeePageRoutingModule,
    NgOtpInputModule,
    SharedModule
  ],
  declarations: [AllEmpolyeePage]
})
export class AllEmpolyeePageModule {}

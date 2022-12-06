import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAttendancePageRoutingModule } from './manage-attendance-routing.module';

import { ManageAttendancePage } from './manage-attendance.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAttendancePageRoutingModule,
    SharedModule,
    NgOtpInputModule
  ],
  declarations: [ManageAttendancePage]
})
export class ManageAttendancePageModule {}

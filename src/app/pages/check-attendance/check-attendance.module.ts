import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckAttendancePageRoutingModule } from './check-attendance-routing.module';

import { CheckAttendancePage } from './check-attendance.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckAttendancePageRoutingModule,
    SharedModule,
    NgOtpInputModule
  ],
  declarations: [CheckAttendancePage]
})
export class CheckAttendancePageModule {}

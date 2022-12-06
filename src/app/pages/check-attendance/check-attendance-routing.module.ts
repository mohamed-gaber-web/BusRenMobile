import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckAttendancePage } from './check-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: CheckAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckAttendancePageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInGuard } from '../shared/guards/check-in.guard';
import { ReportListResolver } from '../shared/guards/reportList.resolve';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'login-button-screen',
        loadChildren: () => import('../pages/login-button-screen/login-button-screen.module').then( m => m.LoginButtonScreenPageModule)
      },
      {
        path: 'manage-attendance',
        loadChildren: () => import('../pages/manage-attendance/manage-attendance.module').then( m => m.ManageAttendancePageModule)
      },
      {
        path: 'check-attendance',
        loadChildren: () => import('../pages/check-attendance/check-attendance.module').then( m => m.CheckAttendancePageModule)
      },
      {
        path: 'add-bus',
        loadChildren: () => import('../pages/add-bus/add-bus.module').then( m => m.AddBusPageModule),
        canActivate: [CheckInGuard]
      },
      {
        path: 'choose-bus',
        loadChildren: () => import('../pages/choose-bus/choose-bus.module').then( m => m.ChooseBusPageModule),
        canActivate: [CheckInGuard]
      },
      {
        path: 'work-on-bus',
        loadChildren: () => import('../pages/work-on-bus/work-on-bus.module').then( m => m.WorkOnBusPageModule)
      },
      {
        path: 'report-bus',
        loadChildren: () => import('../pages/report-bus/report-bus.module').then( m => m.ReportBusPageModule),
        resolve: {reportList: ReportListResolver}
      },
      {
        path: 'all-employee',
        loadChildren: () => import('../pages/all-empolyee/all-empolyee.module').then( m => m.AllEmpolyeePageModule),
        resolve: {reportList: ReportListResolver}
      },
      {
        path: '',
        redirectTo: 'login-button-screen',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: 'login-button-screen',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

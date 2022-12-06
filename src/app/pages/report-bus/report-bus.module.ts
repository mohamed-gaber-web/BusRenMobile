import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportBusPageRoutingModule } from './report-bus-routing.module';

import { ReportBusPage } from './report-bus.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportBusPageRoutingModule,
    SharedModule
  ],
  declarations: [ReportBusPage]
})
export class ReportBusPageModule {}

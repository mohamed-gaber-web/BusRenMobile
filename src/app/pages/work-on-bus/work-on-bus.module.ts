import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOnBusPageRoutingModule } from './work-on-bus-routing.module';

import { WorkOnBusPage } from './work-on-bus.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    WorkOnBusPageRoutingModule,
    SharedModule
  ],
  declarations: [WorkOnBusPage]
})
export class WorkOnBusPageModule {}

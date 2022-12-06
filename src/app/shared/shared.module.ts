import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        // BrowserModule,
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    exports: [HeaderComponent]
})
export class SharedModule{}

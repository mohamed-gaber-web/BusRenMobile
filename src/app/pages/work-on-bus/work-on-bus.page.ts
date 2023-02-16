import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { busDetails, getAllGarage, workOnBusDone } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-work-on-bus',
  templateUrl: './work-on-bus.page.html',
})
export class WorkOnBusPage implements OnInit {

  workOnBusForm: FormGroup;
  category: FormControl;
  garage: FormControl;
  company: FormControl;
  pinCode: string;
  busId: string;
  busDetails: any;
  garageId: string;
  busNumber: number;
  sub: Subscription[] = [];

  constructor(
    private dataService: DataService, 
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
    ) { 
        this.getBusDetails();
    }

  ngOnInit() {
    this.getBusDetails();
    this.initFormControl();
    this.createForm();
  }

  getBusDetails() {
    this.route.queryParams.subscribe(queryParams => {
    this.busId = queryParams['busId'];
    this.pinCode = queryParams['pinCode']
    });

    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', this.busId);
    queryParams = queryParams.set('pinCode', this.pinCode);

    this.sub.push(
    this.dataService.get(`${busDetails}`, {params: queryParams})
    .subscribe(async(response) => {
      if(response['success'] === true) {
        console.log('bus detailssssssssssss', response)
        this.busDetails = response['result'];
        this.busNumber = this.busDetails.busNumber;
      } else {
        // wrong Employee 
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        this.router.navigate(['choose-bus']);
      }
    })
    );

  }

  // ** init form controls
  initFormControl() {
    this.garage = new FormControl('', Validators.required);
    this.company = new FormControl('', Validators.required);
  }

  // ** create form
  createForm() {
    this.workOnBusForm = new FormGroup({
      garage: this.garage,
      company: this.company
    });
  }

  doneWorkOnBus() {
    this.dataService.put(`${workOnBusDone}`, { pinCode: this.pinCode, busId: this.busId })
    .subscribe(async(res) => {
      if(res['success'] === true) {
        this.router.navigate(['choose-bus'])
      } else {
        // wrong Employee 
        const toast = await this.toastController.create({
          message: res['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
      }
    })
  }

  goToReportBus() {
    this.router.navigate(['report-bus'], {queryParams: {busNumber: this.busNumber, busId: this.busId, pinCode: this.pinCode}})
  }

  // ionViewDidLeave() {
  //   console.log('leaving screen ');
  // }

  ionViewWillEnter() {
    this.getBusDetails();
    console.log('ionViewWillEnter ')
  }

  ngOnDestroy() {
    this.sub.forEach(e => e.unsubscribe())
  }


}

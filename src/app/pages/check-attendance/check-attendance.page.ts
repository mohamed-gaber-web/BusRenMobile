import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { backToWork, checkAttendance, checkoutAttendance, getBreakTime, getEmployeeByPinCode, takeBreakTime, todayAttendance } from 'src/app/shared/constants/api.constants';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.page.html',
})
export class CheckAttendancePage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal: IonModal;

  employByPinCode: any;
  sub: Subscription[] = [];
  pinCode: string;
  pinCodeEmployee: string;
  checkIn: boolean;
  isTakeBreak: boolean;
  isTakeBreakLocal: boolean;
  takeFromTime: any;

  constructor(
    private dataService: DataService,
    public toastController: ToastController,
    ) { 
      this.employByPinCode = localStorage.getItem('employee');
    }

  ngOnInit() {
    // if(JSON.parse(localStorage.getItem('employee'))) {
    //   this.employByPinCode = JSON.parse(localStorage.getItem('employee'));
    // }
    this.dataService.employeeByPinCode.subscribe(response => {
      console.log(response)
      this.employByPinCode = response
    });
    
    this.getBreakTime();
    this.getTodayAttendance();
    // check in value
    this.checkIn = JSON.parse(localStorage.getItem('checkIn'))
  }

  onOtpChange(event) {
    this.pinCode = event.toString();
  }

  // get attendance
  getTodayAttendance() {
    let picCode = localStorage.getItem('pinCode');
    let queryParams = new HttpParams();
    queryParams = queryParams.set('pinCode', picCode);
    this.dataService.get(`${todayAttendance}`, {params: queryParams})
     .subscribe(response => {
      console.log('check in today attendance', response)
      if(response['result'] !== null) {
        this.checkIn = true;
        localStorage.setItem('checkIn', JSON.stringify(true));

      } else {
        this.checkIn = false;
        localStorage.setItem('checkIn', JSON.stringify(false));

      }
     })
  }

  // create Take break FN
  takeBreakFN() {
    this.dataService.post(`${takeBreakTime}`, {pinCode: this.pinCode})
    .subscribe(async (response) => {
      console.log('take break', response)
      if(response['success'] === true) {
        this.isTakeBreak = true;
        localStorage.setItem('isTakeTime', JSON.stringify(true));
        this.getBreakTime();
      } else {
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        localStorage.setItem('isTakeTime', JSON.stringify(true));

      }
    })
  }

  getBreakTime() {
    let queryParams = new HttpParams();
    let pinCodeStorage = localStorage.getItem('pinCode');
    queryParams = queryParams.set('pinCode', pinCodeStorage);
    this.dataService.get(`${getBreakTime}`, {params: queryParams})
    .subscribe(response => {
      console.log('get time break', response, this.pinCodeEmployee)
      if(response['success'] === true) {
        this.takeFromTime = response['result'];
      }
    })
  }

  // Back to work
  backToWork() {
    let backToWorkPinCode = localStorage.getItem('pinCode');
    this.dataService.post(`${backToWork}`, {pinCode: backToWorkPinCode})
    .subscribe(async (response) => {
      console.log('back to work', response)
      if(response['success'] === true) {
        localStorage.removeItem('isTakeTime');
        this.isTakeBreak = null;
      } 
      else {
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        localStorage.setItem('isTakeTime', JSON.stringify(true));
      }
    })
  }

  // check attendance
  checkAttendance() {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    this.dataService.post(`${checkAttendance}`, {pinCode: this.pinCode}, {headers})
      .subscribe(async (response) => {
        console.log('create check in', response)
       if(response['success'] === true) {
        // success pinCode
        this.checkIn = true;
        localStorage.setItem('checkIn', JSON.stringify(true));
        if(localStorage.getItem(this.pinCode)) {
          localStorage.setItem('pinCode', JSON.stringify(this.pinCode));
        }
       } 
       else if(response['arrayMessage'][0] === 'You Already Check In') {
        // You Already Check In
        console.log('checked in')
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
         this.checkIn = true;
         localStorage.setItem('checkIn', JSON.stringify(true));
         if(localStorage.getItem(this.pinCode)) {
          localStorage.setItem('pinCode', JSON.stringify(this.pinCode));
        }
       }
       
       else {
          // wrong pinCode
          const toast = await this.toastController.create({
            message: response['arrayMessage'],
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
          this.checkIn = false;
          localStorage.setItem('checkIn', JSON.stringify(false));
          return;
       }
      });
  }

  // Modal Function
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.pinCode, 'confirm');
    this.checkAttendance();
  }

  cancelTakeBreak() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmTakeBreak() {
    this.modal.dismiss(this.pinCode, 'confirm');
    this.takeBreakFN();
  }

  // check out
  checkout() {
    this.dataService.put(`${checkoutAttendance}`, { piCode: localStorage.getItem('pinCode') })
    .subscribe(async (response) => {
      console.log(response, this.pinCode)
      if (response['success'] === true) {
        localStorage.clear();
        // response success
        const toast = await this.toastController.create({
          message: 'checkout success ',
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        localStorage.clear();
        this.employByPinCode = null;
        this.isTakeBreak = null;
      } else {
        // wrong pinCode
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
    localStorage.clear();
    this.employByPinCode = null;
    this.isTakeBreak = null;
      }
    })
    // localStorage.clear();
    // this.employByPinCode = null;
    // this.isTakeBreak = null;
  }

  ngOnDestroy() {
    this.sub.forEach(e => e.unsubscribe());
  }

}

import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { backToWork, checkAttendance, checkoutAttendance, getBreakTime, getEmployeeByPinCode, takeBreakTime, todayAttendance } from 'src/app/shared/constants/api.constants';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { IonModal, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';

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
  isModalOpen = false;
  isModalOpenCheckout = false;
  isModalOpenTakeBreak  = false;
  isModalOpenBack = false;
  isCheckOut: boolean;
  isTakebreake: boolean;


  constructor(
    private dataService: DataService,
    public toastController: ToastController,
    private router: Router
    ) { 
      // get employee by pinCode from localstorage
      this.employByPinCode = localStorage.getItem('employee');
    }

  ngOnInit() {
    // get employee by pinCode from localstorage
    this.dataService.employeeByPinCode.subscribe(response => {
      this.employByPinCode = response;
        this.checkIn = response.isCheckedIn;
        this.isCheckOut = response.isCheckedOut;
        this.isTakeBreak = response.takeBreak;
    });
  }

  onOtpChange(event) {
    this.pinCode = event.toString();
  }

  // create Take break FN
  takeBreakFN() {
    this.dataService.post(`${takeBreakTime}`, {pinCode: this.pinCode, id: this.employByPinCode.id})
    .subscribe(async (response) => {
      console.log('take break', response)
      if(response['success'] === true) {
        this.getBreakTime();
        this.isTakeBreak = response['result'].takeBreak;
      } else {
        this.isTakeBreak = response['result'].takeBreak;
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
      }
    })
  }

    // Back to work
  backToWork() {
    this.dataService.post(`${backToWork}`, {pinCode: this.pinCode, id: this.employByPinCode.id})
    .subscribe(async (response) => {
      console.log('back to work', response)
      if(response['success'] === true) {
        this.getBreakTime();
        this.isTakeBreak = response['result'].takeBreak;
      } 
      else {
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present(); 
        this.isTakeBreak = response['result'].takeBreak;

      }
    })
  }

  getBreakTime() {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('pinCode', this.pinCode);
    this.dataService.get(`${getBreakTime}`, {params: queryParams})
    .subscribe(response => {
      if(response['success'] === true) {
        this.takeFromTime = response['result'];
      }
    })
  }

  // check attendance
  checkAttendance() {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    this.dataService.post(`${checkAttendance}`, {pinCode: this.pinCode, id: this.employByPinCode.id}, {headers})
      .subscribe(async (response) => {
        console.log('check in user', response)
       if(response['success'] === true) {
        this.checkIn = response['result'].isCheckedIn;
        this.isCheckOut = response['result'].isCheckedOut;
        this.isTakeBreak = response['result'].takeBreak;
       } 
       else if(response['arrayMessage'][0] === 'You Already Check In') {
        // You Already Check In
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        this.checkIn = response['result'].isCheckedIn;
        this.isCheckOut = response['result'].isCheckedOut;
        this.isTakeBreak = response['result'].takeBreak;      
      }
       
       else {
          // wrong pinCode
          const toast = await this.toastController.create({
            message: response['arrayMessage'],
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
          this.checkIn = response['result'].isCheckedIn;
          this.isCheckOut = response['result'].isCheckedOut;
          this.isTakeBreak = response['result'].takeBreak;
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

  setOpenTake() {
    this.isModalOpenTakeBreak = !this.isModalOpenTakeBreak;
  }

  cancelTakeBreak() {
    this.isModalOpenTakeBreak = false;

  }

  confirmTakeBreak() {
    this.modal.dismiss(this.pinCode, 'confirm');
    this.takeBreakFN();
    this.isModalOpenTakeBreak = false;
  }

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  // checkout modal
  confirmCheckout() {
    this.modal.dismiss(this.pinCode, 'confirm');
    // console.log(this.pinCode)
    this.checkout();
    this.isModalOpenCheckout = false;
  }

  cancelCheckout() {
    this.isModalOpenCheckout = false;
  }

  setOpenCheckout() {
    this.isModalOpenCheckout = !this.isModalOpenCheckout;
  }

  setOpenBack() {
    this.isModalOpenBack = !this.isModalOpenBack 
  }

  cancelBackToWork() {
    this.isModalOpenBack = false;
  }

  confirmBackToWork() {
    this.modal.dismiss(this.pinCode, 'confirm');
    this.backToWork();
    this.isModalOpenBack = false;

  }

  // check out
  checkout() {
    this.dataService.put(`${checkoutAttendance}`, { pinCode: this.pinCode, id: this.employByPinCode.id })
    .subscribe(async (response) => {
      console.log(response);
      if (response['arrayMessage'] === null) {
        // response success
        const toast = await this.toastController.create({
          message: 'checkout success ',
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();
        this.checkIn = response['result'].isCheckedIn;
        this.isCheckOut = response['result'].isCheckedOut;
        this.isTakeBreak = response['result'].takeBreak;
        this.router.navigate(['/all-employee']);
        this.employByPinCode = null;
        localStorage.clear();
      } else {
        // wrong pinCode
        const toast = await this.toastController.create({
          message: response['arrayMessage'],
          duration: 4000,
          cssClass: 'custom-toast',
        });
        await toast.present();

        // this.router.navigate(['/all-employee']);

      }
    })
  }

  ngOnDestroy() {
    this.sub.forEach(e => e.unsubscribe());
  }


}

import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getBusesByEmployee, workingOnBus } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

import { ToastController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-bus',
  templateUrl: './choose-bus.page.html',
})
export class ChooseBusPage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modalBus: IonModal;
  sub: Subscription[] = [];
  chooseBusForm: FormGroup;
  isModalOpen = false;
  pinCode: any = '';
  // pinCodeToggle = false;
  allBusesByEmployee: any;
  page = 1;
  itemsPerPage = 4;
  totalItems: any;
  isLoading = false;
  error: string;
  busId: string;
  // isAssign: any;
  // isWorkingOn: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    this.getAllBuses();
    this.createChooseBus();
    this.pinCode = localStorage.getItem('pinCode');
  }

  onOtpChange(event) {
    this.pinCode = event.toString();
  }

  savePinCode() {
    // this.pinCodeToggle = true;
    // this.getAllBuses();
  }

  createChooseBus() {
    this.chooseBusForm = this.fb.group({
      searchBus: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  filterBusByBusAndCategory() {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page', this.page);
    queryParams = queryParams.set('size', this.itemsPerPage);
    queryParams = queryParams.set('busCategory', this.chooseBusForm.value.category);
    queryParams = queryParams.set('search', this.chooseBusForm.value.searchBus);
    queryParams = queryParams.set('pinCode', localStorage.getItem('pinCode'));
    this.sub.push(
      this.dataService.get(`${getBusesByEmployee}`, {params: queryParams})
      .subscribe(response => {
        this.isLoading = false;
        this.allBusesByEmployee = response['result'].list;
      })
    );
  }

  getAllBuses() {
    this.isLoading = true;
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page', this.page);
    queryParams = queryParams.set('size', this.itemsPerPage);
    queryParams = queryParams.set('pinCode', localStorage.getItem('pinCode'));

    this.sub.push(
      this.dataService.get(`${getBusesByEmployee}`, {params: queryParams})
      .subscribe(async(response) => {
        console.log(response)
        if(response['success'] === true) {
          this.isLoading = false;
          this.allBusesByEmployee = response['result'].list;
          this.totalItems = response['result'].count;
        } else {
          const toast = await this.toastController.create({
            message: response['arrayMessage'],
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
          this.router.navigate(['check-attendance'])
        }
      }
      ),

    );
  }

  changePagination(e) {
    this.page = e;
    this.getAllBuses();
  }

  // Modal Function
  cancel() {
    try{
      this.modalBus.dismiss(null, 'cancel');
    } catch(e) {
      console.log(e);
    }
  }

  confirm() {
    this.modalBus.dismiss(this.pinCode, 'confirm');
    this.workOnBus(this.pinCode, localStorage.getItem('busId'));
  }

  setOpen(busId?: string) {
    this.isModalOpen = !this.isModalOpen;
    localStorage.setItem('busId', busId);
    // this.busId = busId
  }

  workOnBus(pinCode: string, busId: string) {
    this.dataService.post(`${workingOnBus}`, {pinCode, busId})
    .subscribe(async (res) => {
      console.log(res, busId, pinCode)
      if(res['success'] === true) {

      }
      else {
        const toast = await this.toastController.create({
          message: res['arrayMessage'],
          duration: 5000,
          cssClass: 'custom-toast',
        });
        await toast.present();
      }
    });
  }

  onBussInProgress(busId) {
    this.router.navigate(['/work-on-bus'], { queryParams: {pinCode: this.pinCode, busId: busId }});
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getAllBuses();
      event.target.complete();
    }, 500);
  };

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }

  ionViewDidLeave() {
    // this.pinCodeToggle = false;
    this.isLoading = false;
    this.sub.forEach(s => s.unsubscribe());
    this.chooseBusForm = this.fb.group({
      searchBus: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { getAllEmployee, getEmployeeByPinCode, todayAttendance } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-all-empolyee',
  templateUrl: './all-empolyee.page.html',
  styleUrls: ['./all-empolyee.page.scss'],
})
export class AllEmpolyeePage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  sub: Subscription[] = [];
  employByPinCode: any;
  checkIn: boolean = false;
  pinCode: string;
  listOfEmployee: any;
  activeEmployee: boolean = false;
  isModalOpen = false;
  employeeId: string;

  constructor(
    private dataService: DataService, 
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    this.getAllEmployee();

  }

  getAllEmployee() {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page', 1);
    queryParams = queryParams.set('size', 20);
    this.sub.push(
      this.dataService.get(`${getAllEmployee}`, {params: queryParams})
      .subscribe(response => {
        this.listOfEmployee = response['list'];
        // this.getTodayAttendance();
      })
    );
  }

  onActiveEmployee() {
    this.activeEmployee = !this.activeEmployee;
  }

  onOtpChange(event) {
    this.pinCode = event.toString();
  }

  //  get profile employee by pinCOde
  getProfileEmployeeByPinCode(pin: string, id: string) {
    this.dataService.getProfileEmployeeByPinCode(pin, id)
  }

  // Modal Function
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.pinCode, 'confirm');
    this.getProfileEmployeeByPinCode(this.pinCode, this.employeeId)
  }

  setOpen(id: string) {
    this.isModalOpen = !this.isModalOpen;
    this.employeeId = id;
  }

  ngOnDestroy() {
    this.sub.forEach(e => e.unsubscribe())
  }

}

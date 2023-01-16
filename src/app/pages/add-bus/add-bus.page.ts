import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addBusEmployee, getAllCompany, getAllGarage } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.page.html'
})
export class AddBusPage implements OnInit, OnDestroy {

  addBusForm: FormGroup;
  allGarages: any;
  allCompanies: any;
  sub: Subscription[] = [];
  pinCodeS: any = '';
  totalItems: any;
  pinCodeToggle = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router) { }

  // ** validations
  get busNumber() {
    return this.addBusForm.get('busNumber');
  }

  // ** Validations

  ngOnInit() {
    this.createAddBusForm();
    this.getAllGarage();
    this.getAllCompany();
  }

  createAddBusForm() {
    this.addBusForm = this.fb.group({
      busNumber: ['', [Validators.required]],
      enteranceDateTime: ['', Validators.required],
      garage: ['', Validators.required],
      company: ['', Validators.required],
      // pinCode: [this.pinCodeS, Validators.required]
    });
    this.addBusForm.valueChanges.subscribe();
  }

  resetForm() {
    this.addBusForm.reset();
  }

  // add pinCode
  onOtpChange(event) {
    this.pinCodeS = event.toString();
  }

  onAddBus() {
    const addBusObj = {
      busNumber: this.addBusForm.value.busNumber,
      pinCode: this.pinCodeS,
      enteranceDateTime: this.addBusForm.value.enteranceDateTime,
      garageId: this.addBusForm.value.garage,
      companyId: this.addBusForm.value.company
    };
    this.sub.push(
      this.dataService.post(`${addBusEmployee}`, addBusObj)
      .subscribe(response => {
        if(response) {
          this.router.navigate(['choose-bus']);
        }
        console.log('add bus response', response);
      })
    );
  }

  getAllGarage() {
    this.sub.push(
      this.dataService.get(`${getAllGarage}`)
      .subscribe(response => {
        this.allGarages = response;
      })
    );
  }

  getAllCompany() {
    this.sub.push(
      this.dataService.get(`${getAllCompany}`)
      .subscribe(response => {
        this.allCompanies = response;
      })
    );
  }

  savePinCode() {
    this.pinCodeToggle = true;
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }

  ionViewDidLeave() {
    // console.log('leaving component');
    this.sub.forEach(s => s.unsubscribe());
    this.pinCodeToggle = false;
  }

}

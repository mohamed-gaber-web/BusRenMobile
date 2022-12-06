import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { getEmployeeByPinCode } from '../constants/api.constants';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employeeByPinCode =  new BehaviorSubject(JSON.parse(localStorage.getItem('employee')) || null);


  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) { }

  getList(route: string, options?: any): Observable<any> {
    return this.http.get(route, options);
  }

  post(route: string, body: any, options?: any) {
    return this.http.post(route, body, options);
  }

  put(route: string, body: any, options?: any) {
    return this.http.put(route, body, options);
  }

  get(route: string, options?: any) {
    return this.http.get(route, options);
  }

  getItemById(route: string, id: number, options?: any): Observable<any> {
    return this.http.get(`${route}/${id}`, options);
  }

  getProfileEmployeeByPinCode(pin: string, id: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('pinCode', pin);
    queryParams = queryParams.set('Id', id);
      this.get(`${getEmployeeByPinCode}`, {
        params: queryParams
      })
      .subscribe(async(response) => {
        console.log('get profile employee', response)
        if(response['success'] === true) {
          this.employeeByPinCode.next(response['result']);
          localStorage.setItem('employee', JSON.stringify(response['result']));
          localStorage.setItem('pinCode', pin);
          this.router.navigate(['/check-attendance'])
        } else {
          // wrong pinCode
          const toast = await this.toastController.create({
            message: response['arrayMessage'],
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
        }
      })
  }


}

import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checkAttendance } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-manage-attendance',
  templateUrl: './manage-attendance.page.html',
})
export class ManageAttendancePage implements OnInit {

  pinCode: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onOtpChange(event) {
    this.pinCode = event.toString();
  }

  checkAttendance() {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    this.dataService.post(`${checkAttendance}`, {pinCode: this.pinCode}, {headers})
      .subscribe(response => {
        console.log(response)
        if(response) {
          this.router.navigate(['/check-attendance', {pinCode: this.pinCode}]);
        }
      });
  }

}

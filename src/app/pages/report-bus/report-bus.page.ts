import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { addReportProblemsBus } from 'src/app/shared/constants/api.constants';
import { BusProblems } from 'src/app/shared/models/report.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-report-bus',
  templateUrl: './report-bus.page.html',
})
export class ReportBusPage implements OnInit {

  busNumber: number;
  busId: string;
  pinCode: string;
  sub: Subscription[] = [];
  listOfProblems: any;
  reportForm: FormGroup;
  checkedId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private dataServices: DataService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    // get listOfProblems
    this.route.data.subscribe(data => {
      this.listOfProblems = data.reportList['list'];
      console.log(this.listOfProblems)
    })

    // get query params
    this.route.queryParams.subscribe(queryParams => {
      this.busId = queryParams['busId'];
      this.pinCode = queryParams['pinCode'];
      this.busNumber = queryParams['busNumber']
    });
    
    // create form report
    this.reportForm = this.fb.group({
      // problemId: [''],
      // text: ['']
    });

    // create form input 
    this.listOfProblems.forEach((element: any) => {
      this.reportForm.addControl(element.id + 'problemId', new FormControl('')),
      this.reportForm.addControl(element.problemTranslations?.name + 'text', new FormControl(''))
    })
  }


  setBusReport() {
    const busProblemsList = [];
    this.listOfProblems.forEach(problem => {
      if (this.reportForm.value[problem.id + 'problemId'] === true) {
        const busProblem = new BusProblems();
        busProblem.problemId = problem.id;
        busProblem.text = this.reportForm.value[problem.problemTranslations?.name + 'text']
        busProblemsList.push(busProblem)
      }
    })

    return busProblemsList;
  }


  onAddReportBus() {
    const busProblemsReport = {
      pinCode: this.pinCode,
      busId: this.busId,
      busProblems: this.setBusReport()
    }

    this.dataServices.put(`${addReportProblemsBus}`, busProblemsReport)
      .subscribe(async (response) => {
        if (response['success'] === true) {
          const toast = await this.toastController.create({
            message: 'Problems report success',
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
          this.router.navigate(['choose-bus'])
        } else {
          const toast = await this.toastController.create({
            message: response['arrayMessage'],
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
      }
     })
  }

  sendId(e) {
    var pId = e.target.value + 'problemId'
    this.reportForm.patchValue({
      pId : e.target.value
    })
  }

  ngOnDestroy() {
    this.sub.forEach(e => e.unsubscribe());
  }

  ionViewDidLeave() {
    this.sub.forEach(e => e.unsubscribe());
  }

}

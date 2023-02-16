import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addReportProblemsBus } from 'src/app/shared/constants/api.constants';
import { BusProblems } from 'src/app/shared/models/report.model';
import { DataService } from 'src/app/shared/services/data.service';

import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CameraService } from 'src/app/shared/services/camera.service';

import { finalize } from 'rxjs/Operators';


export interface UserPhoto {
  name: string;
  path: string;
  data: string;
}
const PHOTO_STORAGE = 'photos';

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
  public images: UserPhoto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private dataServices: DataService,
    private toastController: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    // get listOfProblems
    this.route.data.subscribe(data => {
      this.listOfProblems = data.reportList['list'];
    })
    
    this.loadFiles();
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
        busProblemsList.push(busProblem);
      } 
    })

    return busProblemsList;
  }

  // Camera integration
  async loadFiles() {
      this.images = [];
      const loading = await this.loadingCtrl.create({
        message: 'Loading Data......'
      })
      await loading.present();

      Filesystem.readdir({
        directory: Directory.Data,
        path: PHOTO_STORAGE
      }).then(result => {
        this.loadFilesData(result.files)
      }, async error => {
        await Filesystem.mkdir({
          directory: Directory.Data,
          path: PHOTO_STORAGE
        });

      }).then(_ => {
          loading.dismiss()
        })
  }

  async loadFilesData(fileNames: any) {
  for(let f of fileNames) {
    const filePath = `${PHOTO_STORAGE}/${f.name}`
    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path: filePath
    });
    this.images.push({
      name: f.name,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`
    })
    console.log('images arr', this.images)
  }
  }

  async addNewToGallery() {
      const image = await Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera // Camera, Photos or Prompt!
      });

      if (image) {
        this.savePicture(image);
      }
  }

  private async savePicture(photo: Photo) {
  // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.cameraService.readAsBase64(photo);

  // Write the file to the data directory
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: `${PHOTO_STORAGE}/${fileName}`,
    data: base64Data,
    directory: Directory.Data
  });

  this.loadFiles();

  }

  async deleteImage(file: UserPhoto) {
    await Filesystem.deleteFile({
        directory: Directory.Data,
        path: file.path
    });
    this.loadFiles();
}

  // Camera Integration

  async onAddReportBus() {
    const busProblemsReport = {
      pinCode: this.pinCode,
      busId: this.busId,
      BusProblems: this.setBusReport(),
    }
    let formData = new FormData();

    for(let f = 0; f < this.images.length; f++) {
        const response = await fetch(this.images[f].data);
        const blob = await response.blob();
        formData.append('FormFiles', blob, this.images[f].name)
    }
    
    formData.append('pinCode', this.pinCode);
    formData.append('busId', this.busId);
    for(let i = 0; i < busProblemsReport.BusProblems.length; i++) {
      formData.append(`BusProblems[${i}].text`, busProblemsReport.BusProblems[i].text)
      formData.append(`BusProblems[${i}].problemId`, busProblemsReport.BusProblems[i].problemId)
    }
    console.log(formData)


    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();
    
    this.dataServices.put(`${addReportProblemsBus}`, formData).pipe(
        finalize(() => {
            loading.dismiss();
        })
      )
      .subscribe(async (response) => {
        console.log(response)
        if (response['success'] === true) {
          const toast = await this.toastController.create({
            message: 'Problems report success',
            duration: 4000,
            cssClass: 'custom-toast',
          });
          await toast.present();
          this.router.navigate(['choose-bus']);
          this.images.forEach(file => {
            this.deleteImage(file);
          })
          // this.deleteImage();

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

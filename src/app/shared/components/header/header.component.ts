import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  myBackButton(){
    this.navCtrl.back();
  }

  goToEmployee() {
    this.navCtrl.navigateForward('all-employee')
  }

}

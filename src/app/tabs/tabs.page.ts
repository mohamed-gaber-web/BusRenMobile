import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  employByPinCode: any;

  constructor() {
  }

  ngOnInit() {
    this.employByPinCode = JSON.parse(localStorage.getItem('employee'));
  }

}

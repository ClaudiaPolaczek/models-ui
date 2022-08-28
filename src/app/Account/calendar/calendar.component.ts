import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Konto'},
      {label: 'Terminarz'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}

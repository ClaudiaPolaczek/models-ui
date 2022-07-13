import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Konto'},
      {label: 'Zaproszenia'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}

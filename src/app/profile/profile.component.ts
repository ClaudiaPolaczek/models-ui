import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../environments/environment';
import {Subject, zip} from 'rxjs';

import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';


export class Person {
  constructor(
    public name: string,
    public surname: string,
  ) {}

  getFullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export class Waypoint {
  constructor(
    public address: string,
    public distanceFromPrevious: number,
    public getInto: Person[] = [],
    public getOut: Person[] = [],
  ) {}
}

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
  ) {
    // this.createForms();
  }

  ngOnInit(): void {
  }

}

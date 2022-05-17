import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../environments/environment';
import {Subject, zip} from 'rxjs';

import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../user';
import {AuthenticationService} from '../authentication.service';
import {ProfileService} from './profile.service';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  user: User;


  constructor(
    private service: ProfileService,
    private authService: AuthenticationService,
    private logger: NGXLogger,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
  }

}

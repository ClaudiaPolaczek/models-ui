import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';
import {User} from '../../user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  registerForm: FormGroup;
  spin = false;
  gender: SelectItem[];
  regon: SelectItem[];
  msgs: Message[] = [];
  user: User;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService
  ) {
    this.registerForm = formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: formBuilder.control('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      birthdayYear: formBuilder.control('', Validators.required),
      gender: formBuilder.control('', Validators.required),
      region: formBuilder.control('', Validators.required),
      city: formBuilder.control('', Validators.required),
      phoneNumber: formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });

    this.gender = [
      {label: 'Mężczyzna', value: 'M'},
      {label: 'Kobieta', value: 'K'}
    ];

    this.regon = [{
      value: 'dolnoslaskie',
      label: 'dolnośląskie'
    }, {
      value: 'kujawsko-pomorskie',
      label: 'kujawsko-pomorskie'
    }, {
      value: 'lubelskie',
      label: 'lubelskie'
    }, {
      value: 'lubuskie',
      label: 'lubuskie'
    }, {
      value: 'łódzkie',
      label: 'łódzkie'
    }, {
      value: 'małopolskie',
      label: 'małopolskie'
    }, {
      value: 'mazowieckie',
      label: 'mazowieckie'
    }, {
      value: 'opolskie',
      label: 'opolskie'
    }, {
      value: 'podkarpackie',
      label: 'podkarpackie'
    }, {
      value: 'podlaskie',
      label: 'podlaskie'
    }, {
      value: 'pomorskie',
      label: 'pomorskie'
    }, {
      value: 'śląskie',
      label: 'śląskie'
    }, {
      value: 'świętokrzyskie',
      label: 'świętokrzyskie'
    }, {
      value: 'warmińsko-mazurskie',
      label: 'warmińsko-mazurskie'
    }, {
      value: 'wielkopolskie',
      label: 'wielkopolskie'
    }, {
      value: 'zachodniopomorskie',
      label: 'zachodniopomorskie'
    }];
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user =>
      this.user = user
    );
  }

  save(): void {
    this.spin = true;
    if (this.user.role === 'F' ) {
      this.updatePhotographer();
    } else if (this.user.role === 'M') {
      this.updateModel();
    }
  }

  updateModel(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.updateModel(
      controls.name.value,
      controls.surname.value,
      controls.birthdayYear.value,
      controls.gender.value,
      controls.region.value,
      controls.city.value,
      controls.phoneNumber.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  updatePhotographer(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.updatePhotographer(
      controls.name.value,
      controls.surname.value,
      controls.birthdayYear.value,
      controls.gender.value,
      controls.region.value,
      controls.city.value,
      controls.phoneNumber.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

}

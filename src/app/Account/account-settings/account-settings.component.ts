import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuItem, Message, SelectItem} from 'primeng/api';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';
import {User} from '../../user';
import {Survey, UserDatails} from '../account-user/account.component';
import {ProfileService} from '../../Profiles/profile/profile.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  registerForm: FormGroup;
  spin = false;
  gender: SelectItem[];
  regon: SelectItem[];
  msgs: Message[] = [];
  user: User;
  userDetails: UserDatails;
  survey: Survey;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService
  ) {
    this.registerForm = formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3)
      ]
      ),
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
    if (this.user.role === 'M') {
      this.profileService.findModelByEmail(this.user.email).subscribe(model => {
        this.userDetails = model;
        this.survey = model.survey;
      });
    } else if (this.user.role === 'P') {
      this.profileService.findPhotographerByEmail(this.user.email).subscribe(photographer => {
        this.userDetails = photographer;
        this.survey = photographer.survey;
      });
    }
    this.items = [
      {label: 'Konto'},
      {label: 'Dane osobowe'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  save(): void {
    this.spin = true;
    if (this.user.role === 'P' ) {
      this.updatePhotographer();
    } else if (this.user.role === 'M') {
      this.updateModel();
    }
  }

  updateModel(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.updateModel(
      controls.name.value === '' ? this.survey.first_name : controls.name.value,
      controls.surname.value === '' ? this.survey.last_name : controls.surname.value,
      controls.birthdayYear.value === '' ? this.survey.birthday_year : controls.birthdayYear.value,
      controls.gender.value === '' ? this.survey.gender : controls.gender.value,
      controls.region.value === '' ? this.survey.region : controls.region.value,
      controls.city.value === '' ? this.survey.city : controls.city.value,
      controls.phoneNumber.value === '' ? this.survey.phone_number : controls.phoneNumber.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'});
    });

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
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'});
    });

  }

}

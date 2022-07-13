import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuItem, Message, SelectItem} from 'primeng/api';
import {User} from '../../user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {UserDatails} from '../account-user/account.component';

@Component({
  selector: 'app-account-model',
  templateUrl: './account-model.component.html',
  styleUrls: ['./account-model.component.css']
})
export class AccountModelComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  modelForm: FormGroup;
  spin = false;
  hairColor: SelectItem[];
  eyesColor: SelectItem[];
  msgs: Message[] = [];
  user: User;
  userDetails: UserDatails;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService
  ) {
    this.modelForm = formBuilder.group({
      hair: formBuilder.control('', Validators.required),
      eyes: formBuilder.control('', Validators.required),
    });

    this.eyesColor = [{
      value: 'niebieskie',
      label: 'niebieskie'
    }, {
      label: 'brązowe',
      value: 'brązowe'
    }, {
      value: 'szare',
      label: 'szare'
    }, {
      value: 'piwne',
      label: 'piwne'
    }, {
      value: 'zielone',
      label: 'zielone'
    }, {
      value: 'inne',
      label: 'inne'
    }, {
      value: '',
      label: '-'
    }
    ];

    this.hairColor =  [{
      value: 'brązowe',
      label: 'brązowe'
    }, {
      value: 'blond',
      label: 'blond'
    }, {
      value: 'czarne',
      label: 'czarne'
    }, {
      value: 'rude',
      label: 'rude'
    }, {
      value: 'siwe',
      label: 'siwe'
    }, {
      value: 'inne',
      label: 'inne'
    }, {
      value: '',
      label: '-'
    }
    ];
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user =>
      this.user = user
    );

    this.profileService.findModelByEmail(this.user.email).subscribe(model => {
      this.userDetails = model;
    });

    this.items = [
      {label:'Konto'},
      {label:'Dane modelki'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  save(): void {
    this.spin = true;
    this.setModelAddInfo();
  }

  setModelAddInfo(): void {
    this.spin = true;
    const controls = this.modelForm.controls;
    this.profileService.setModelAddInfo(
      this.userDetails.id,
      controls.eyes.value,
      controls.hair.value,
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

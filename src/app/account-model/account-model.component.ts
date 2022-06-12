import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, SelectItem} from 'primeng/api';
import {User} from '../user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-account-model',
  templateUrl: './account-model.component.html',
  styleUrls: ['./account-model.component.css']
})
export class AccountModelComponent implements OnInit {

  modelForm: FormGroup;
  spin = false;
  hairColor: SelectItem[];
  eyesColor: SelectItem[];
  msgs: Message[] = [];
  user: User;

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
  }

  save(): void {
    this.spin = true;
    this.setModelAddInfo();
  }

  setModelAddInfo(): void {
    this.spin = true;
    const controls = this.modelForm.controls;
    this.profileService.setModelAddInfo(
      this.user.id,
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

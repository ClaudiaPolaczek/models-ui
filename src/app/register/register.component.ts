import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {Message, SelectItem} from 'primeng/api';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [trigger('errorState', [
    state('hidden', style({
      opacity: 0
    })),
    state('visible', style({
      opacity: 1
    })),
    transition('visible => hidden', animate('400ms ease-in')),
    transition('hidden => visible', animate('400ms ease-out'))
  ])]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  spin = false;
  gender: SelectItem[];
  occupation: SelectItem[];
  regon: SelectItem[];
  msgs: Message[] = [];
  // tslint:disable-next-line:max-line-length
  emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
    ) {
    this.registerForm = formBuilder.group({
      occupation: formBuilder.control('', Validators.required ),
      email: formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatPassword: formBuilder.control(''),
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
      regulationsAgreement: formBuilder.control('', Validators.required),
  }, {
    validator: this.mustMatch,
  });

    this.gender = [
      {label: 'Mężczyzna', value: 'M'},
      {label: 'Kobieta', value: 'K'}
    ];

    this.occupation = [
      {label: 'Fotograf', value: 'F'},
      {label: 'Model(ka)', value: 'M'}
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

  mustMatch(formGroup: FormGroup): { [s: string]: boolean } {
    const control = formGroup.controls.password;
    const matchingControl = formGroup.controls.repeatPassword;

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }

  ngOnInit() {
  }

  register(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    if (controls.occupation.value === 'F' ) {
      this.registerPhotographer();
    } else if (controls.occupation.value === 'M') {
      this.registerModel();
    }
  }

  decline(): void {
    this.router.navigate(['/login']);
  }

  registerModel(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.registerModel(
      controls.email.value,
      controls.password.value,
      controls.repeatPassword.value,
      controls.name.value,
      controls.surname.value,
      controls.birthdayYear.value,
      controls.gender.value,
      controls.region.value,
      controls.city.value,
      controls.phoneNumber.value,
      1
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/login']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  registerPhotographer(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.registerPhotographer(
      controls.email.value,
      controls.password.value,
      controls.repeatPassword.value,
      controls.name.value,
      controls.surname.value,
      controls.birthdayYear.value,
      controls.gender.value,
      controls.region.value,
      controls.city.value,
      controls.phoneNumber.value,
      1
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/login']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

}

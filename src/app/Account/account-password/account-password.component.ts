import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {MenuItem, Message} from 'primeng/api';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.css']
})
export class AccountPasswordComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  passwordForm: FormGroup;
  msgs: Message[] = [];
  spin = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.passwordForm = formBuilder.group({
      oldPassword: formBuilder.control('', [
        Validators.required,
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatPassword: formBuilder.control(''),
    }, {
      validator: this.mustMatch,
    });
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
    this.items = [
      {label: 'Konto'},
      {label: 'Zmiana hasła'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  save(): void {
    this.spin = true;
    const controls = this.passwordForm.controls;
    this.authenticationService.passwordChange(
      controls.password.value,
      controls.repeatPassword.value,
      controls.oldPassword.value,
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Sukces', detail: 'Hasło zostało zmienione'});
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'warning', summary: 'Błąd', detail: 'Hasło nie zostało zmienione'});
    });
  }
}

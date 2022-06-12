import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.css']
})
export class AccountPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  msgs: Message[] = [];
  spin = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.passwordForm = formBuilder.group({
      oldPassword: formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
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
  }

  save(): void {
    this.spin = true;
    const controls = this.passwordForm.controls;
    this.authenticationService.passwordChange(
      controls.oldPassword.value,
      controls.password.value,
      controls.repeatPassword.value,
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Password changed'});
  }

}

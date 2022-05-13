import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  spin = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
    ) {
    this.registerForm = formBuilder.group({
    name: formBuilder.control('', Validators.required),
    surname: formBuilder.control('', Validators.required),
    email: formBuilder.control('', [
      Validators.required,
      Validators.email
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

  register(): void {
    this.spin = true;
    const controls = this.registerForm.controls;
    this.authenticationService.register(
      controls.name.value,
      controls.surname.value,
      controls.email.value,
      controls.password.value,
      controls.repeatPassword.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/route']);
    }, _ => {
      this.spin = false;
      this.snackBar.open('Please provide correct information', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

}

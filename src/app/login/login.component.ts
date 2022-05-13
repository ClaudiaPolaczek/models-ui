import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  spin = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
  ) {
    this.loginForm = formBuilder.group({
      email: formBuilder.control(''),
      password: formBuilder.control(''),
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.spin = true;
    const controls = this.loginForm.controls;
    this.authenticationService.login(
      controls.email.value,
      controls.password.value,
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/route']);
    }, _ => {
      this.spin = false;
      this.snackBar.open('Wrong email or password', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

}

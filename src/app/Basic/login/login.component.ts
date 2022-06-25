import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // TODO loading status
  spin = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
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
      window.location.reload();
      this.router.navigate(['/profiles']);
    }, _ => {
      this.spin = false;
    });
  }

  register(): void {
    this.router.navigate(['/signup']);
  }
}

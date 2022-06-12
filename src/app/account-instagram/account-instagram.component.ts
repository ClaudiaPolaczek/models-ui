import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {ProfileService} from '../profile/profile.service';
import {User} from '../user';

@Component({
  selector: 'app-account-instagram',
  templateUrl: './account-instagram.component.html',
  styleUrls: ['./account-instagram.component.css']
})
export class AccountInstagramComponent implements OnInit {

  instagramForm: FormGroup;
  msgs: Message[] = [];
  spin = false;
  user: User;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private service: ProfileService) {
    this.instagramForm = formBuilder.group({
      instagram: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3)
      ])}, {
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
  }

  save(): void {
    this.spin = true;
    if (this.user.role === 'F' ) {
      this.setPhotographerInstagram();
    } else if (this.user.role === 'M') {
      this.setModelInstagram();
    }
  }

  setModelInstagram(): void {
    this.spin = true;
    const controls = this.instagramForm.controls;
    this.service.setModelInstagram(
      this.user.id,
    controls.instagram.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Instagram name changed'});
  }

  setPhotographerInstagram(): void {
    this.spin = true;
    const controls = this.instagramForm.controls;
    this.service.setPhotographerInstagram(
      this.user.id,
      controls.instagram.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
    }, _ => {
      this.spin = false;
    });
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Success', detail: 'Instagram name changed'});
  }
}

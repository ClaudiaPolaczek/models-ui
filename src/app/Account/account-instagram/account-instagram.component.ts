import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuItem, Message} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {User} from '../../user';
import {Survey, UserDatails} from '../account-user/account.component';

@Component({
  selector: 'app-account-instagram',
  templateUrl: './account-instagram.component.html',
  styleUrls: ['./account-instagram.component.css']
})
export class AccountInstagramComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  instagramForm: FormGroup;
  msgs: Message[] = [];
  spin = false;
  user: User;
  userDetails: UserDatails;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private profileService: ProfileService) {
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
    this.items = [
      {label:'Konto'},
      {label:'Instagram'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  save(): void {
    this.spin = true;
    if (this.user.role === 'P') {
      this.profileService.findPhotographerByEmail(this.user.email).subscribe(photographer => {
        this.userDetails = photographer;
        this.setPhotographerInstagram();
      });
    } else if (this.user.role === 'M') {
      this.profileService.findModelByEmail(this.user.email).subscribe(model => {
        this.userDetails = model;
        this.setModelInstagram();
      });
    }
  }

  setModelInstagram(): void {
    this.spin = true;
    const controls = this.instagramForm.controls;
    this.profileService.setModelInstagram(
      this.userDetails.id,
      controls.instagram.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Nazwa została zmieniona'});
    }, _ => {
      this.spin = false;
    });
  }

  setPhotographerInstagram(): void {
    this.spin = true;
    const controls = this.instagramForm.controls;
    this.profileService.setPhotographerInstagram(
      this.userDetails.id,
      controls.instagram.value
    ).subscribe(user => {
      this.spin = false;
      this.router.navigate(['/profile']);
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Nazwa została zmieniona'});
    }, _ => {
      this.spin = false;
    });
  }
}

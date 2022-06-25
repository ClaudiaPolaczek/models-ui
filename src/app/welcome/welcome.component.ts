import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProfileService} from '../Profiles/profile/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  users = [];
  models = [];
  photographers = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.getAvgOfRating();
  }

  ngOnInit() {
  }

  getAvgOfRating(): void {
    /* this.profileService.getAvgOfRating().then((data) => {
       this.users = data.sort((a, b) => b.avgRate - a.avgRate ).filter(((item, i) => i < 5));
     });

     this.profileService.getAllModels().then((data) => {
       this.models = data.sort((a, b) => b.user.avgRate - a.user.avgRate ).filter(((item, i) => i < 2));
     });

     this.profileService.getAllPhotographers().then((data) => {
       this.photographers = data.sort((a, b) => b.user.avgRate - a.user.avgRate ).filter(((item, i) => i < 2));
     });*/
  }

}

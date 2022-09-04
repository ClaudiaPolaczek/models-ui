import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProfileService} from '../Profiles/profile/profile.service';

export class UserAvg {
  constructor(
    public id: number = 0,
    public email: string,
    public username: string,
    public role: string,
    public main_photo_url: string,
    public avg_rate: number = 0.0
  ) {}
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  users: UserAvg[];
  models: UserAvg[];
  photographers: UserAvg[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getAvgOfRating();
  }

  getAvgOfRating(): void {
    this.profileService.getAvgForEachUser().subscribe(usersList => {
      this.users = usersList.map((userAvg) => {
        return { id: userAvg.id, email: userAvg.email, username: userAvg.username,
          role: userAvg.role, main_photo_url: userAvg.main_photo_url, avg_rate: userAvg.avg_rate};
      });
      this.models = this.users.filter(model => model.role === 'M' && model.main_photo_url !== null)
        .sort((a, b) => b.avg_rate - a.avg_rate).slice(0, 5);
      this.photographers = this.users.filter(model => model.role === 'P' && model.main_photo_url !== null)
        .sort((a, b) => b.avg_rate - a.avg_rate).slice(0, 5);
    });
  }
}

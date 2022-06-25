import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Survey} from '../account-user/account.component';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {AuthenticationService} from '../../authentication.service';

export class Notification {
  constructor(
    public id: number = 0,
    public added_date: Date,
    public content: string,
    public user: User[];
  ) {}
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[];
  user: User;
  constructor(private notificationService: NotificationService,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user =>
      this.user = user
    );
    this.notificationService.getNonReadByUser(this.user.email).subscribe(data => this.notifications = data);
  }

  readNotification(notification): void{
    this.notificationService.readNotification(notification.id).subscribe(data => this.notifications = data);
  }

}

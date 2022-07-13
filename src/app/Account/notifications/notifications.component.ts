import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Survey} from '../account-user/account.component';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {CalculatorService} from '../../calculator.service';

export class Notification {
  constructor(
    public id: number = 0,
    public addedDate: Date,
    public content: string,
    public readValue: number = 0,
    public user: User[] = []
  ) {}
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  notifications: Notification[];
  user: User;

  constructor(private notificationService: NotificationService,
              private router: Router,
              private authenticationService: AuthenticationService,
              public calculatorService: CalculatorService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user =>
      this.user = user
    );
    this.notificationService.getNotificationsByUser(this.user.email).subscribe(data => this.notifications = data);
    this.items = [
      {label: 'Konto'},
      {label: 'Powiadomienia'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  readNotification(notification): void {
    this.notificationService.readNotification(notification.id).subscribe(data => this.notifications = data);
    window.location.reload();
  }

  ifNotificationIsAlreadyRead(read): boolean {
      if (read === 1) {
        return false;
      } else if (read === 0) {
        return true;
      }
  }

}

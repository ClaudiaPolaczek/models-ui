import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../../environments/environment';
import {User} from '../../user';
import {AuthenticationService} from '../../authentication.service';
import {ProfileService} from './profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 // encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private service: ProfileService,
    private authService: AuthenticationService,
    private logger: NGXLogger,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
  }

}

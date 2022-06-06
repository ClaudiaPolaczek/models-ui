import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {User} from '../user';
import {Router} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  user: User;

  constructor(   private router: Router,
                 private primengConfig: PrimeNGConfig,
                 private service: ProfileService,
                 private authService: AuthenticationService,
                 private logger: NGXLogger,) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>
    this.user = user
    );
    this.primengConfig.ripple = true;
}

}

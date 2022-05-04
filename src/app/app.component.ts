import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      this.loggedIn = user !== null;
    });
  }

  logout(): void {
    this.authenticationService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }
}

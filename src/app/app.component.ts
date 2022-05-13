import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import { PrimeNGConfig } from 'primeng/api';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  items: MenuItem[];
  constructor(private router: Router, private authenticationService: AuthenticationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      this.loggedIn = user !== null;
      // this.loggedIn = true;
      this.primengConfig.ripple = true;
      this.items = [
        {
          label: 'Profil',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'Dane osobowe',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Zmiana hasła',
                  icon: 'pi pi-fw pi-bookmark'
                },
                {
                  label: 'Instagram',
                  icon: 'pi pi-fw pi-video'
                },
                {
                  label: 'Dane modelki',
                  icon: 'pi pi-fw pi-video'
                },
              ]
            },
            {
              label: 'Terminarz',
              icon: 'pi pi-fw pi-plus'
            },
            {
              label: 'Zaproszenia',
              icon: 'pi pi-fw pi-trash'
            },
            {
              label: 'Powiadomienia',
              icon: 'pi pi-fw pi-external-link'
            },
            {
              label: 'Portfolio',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Albumy',
                  icon: 'pi pi-fw pi-bookmark'
                },
                {
                  label: 'Nowy album',
                  icon: 'pi pi-fw pi-video'
                },

              ]
            }
          ]
        },
        {
          label: 'Portfolia',
          icon: 'pi pi-fw pi-user',
          routerLink: 'portfolios'
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-calendar',
          routerLink: 'profiles'
        }
      ];
    });
  }

  logout(): void {
    this.authenticationService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }
}

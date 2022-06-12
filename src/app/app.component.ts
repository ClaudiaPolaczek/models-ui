import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {MenuItem, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  items: MenuItem[];
  constructor(private router: Router, private authenticationService: AuthenticationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      this.loggedIn = user !== null;
      // this.loggedIn = true;
    });
    this.fillMenu();
  }

  fillMenu() {
    this.items = [
      {
        label: 'Profil',
        icon: 'pi pi-fw pi-file',
        items: [{
            label: 'Dane osobowe',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'acccount',
            items: [
              {
                label: 'Zmiana hasła',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'profiles',
              },
              {
                label: 'Instagram',
                icon: 'pi pi-fw pi-video',
                routerLink: 'instagram'
              },
              {
                label: 'Dane modelki',
                icon: 'pi pi-fw pi-video',
                routerLink: 'modeldata'
              },
            ]
          },
          {
            label: 'Terminarz',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'plan'
          },
          {
            label: 'Zaproszenia',
            icon: 'pi pi-fw pi-trash',
            routerLink: 'invitations'
          },
          {
            label: 'Powiadomienia',
            icon: 'pi pi-fw pi-external-link',
            routerLink: 'notifications'
          },
          {
            label: 'Portfolio',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'portfolio',
            items: [
              {
                label: 'Albumy',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'albums'
              },
              {
                label: 'Nowy album',
                icon: 'pi pi-fw pi-video',
                routerLink: 'newalbum'
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
  }

  logout(): void {
    this.authenticationService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }

  login(): void {
    this.authenticationService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }
}

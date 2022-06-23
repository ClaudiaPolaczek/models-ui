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
  loggedInAdmin = false;
  loggedInModel = false;
  items: MenuItem[];
  username = '';
  constructor(private router: Router, private authenticationService: AuthenticationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      this.loggedIn = user !== null;
      this.username = user.email;
      this.loggedInModel = user.role === 'M';
      // this.loggedInAdmin = user.role === 'A';
      // this.loggedIn = true;
    });
    this.fillMenu();
  }

  fillMenu() {
    this.items = [
      {
        label: 'Start',
        visible: !this.loggedIn,
        icon: 'pi pi-fw pi-home',
        routerLink: ''
      },
      {
        label: 'Profil',
        visible: this.loggedIn,
        icon: 'pi pi-fw pi-user',
        items: [{
            label: 'Dane osobowe',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: 'account/user',
            items: [
              {
                label: 'Dane osobowe',
                routerLink: 'user/settings',
              },
              {
                label: 'Zmiana hasła',
                routerLink: 'user/password',
              },
              {
                label: 'Instagram',
                routerLink: 'user/instagram'
              },
              {
                label: 'Dane modelki',
                visible: this.loggedInModel,
                routerLink: 'user/model'
              },
            ]
          },
          {
            label: 'Terminarz',
            icon: 'pi pi-fw pi-calendar',
            routerLink: 'plan'
          },
          {
            label: 'Zaproszenia',
            icon: 'pi pi-fw pi-calendar-plus',
            routerLink: 'invitations'
          },
          {
            label: 'Powiadomienia',
            icon: 'pi pi-fw pi-bell',
            routerLink: 'notifications'
          },
          {
            label: 'Portfolio',
            icon: 'pi pi-fw pi-camera',
            routerLink: 'portfolio',
            items: [
              {
                label: 'Albumy',
                routerLink: 'albums'
              },
              {
                label: 'Nowy album',
                routerLink: 'newalbum'
              },

            ]
          }
        ]
      },
      {
        label: 'Portfolia',
        icon: 'pi pi-fw pi-camera',
        routerLink: 'portfolios'
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-users',
        routerLink: 'profiles'
      },
      {
        label: 'Panel administratora',
        icon: 'pi pi-fw pi-lock',
        visible: this.loggedInAdmin,
        routerLink: 'portfolio',
        items: [
          {
            label: 'Komentarze',
            routerLink: 'admin/comments'
          },
          {
            label: 'Użytkownicy',
            routerLink: 'admin/users'
          },

        ]
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

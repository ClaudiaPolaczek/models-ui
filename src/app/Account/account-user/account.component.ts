import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Router} from '@angular/router';
import {ProfileService} from '../../Profiles/profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';

export class Survey {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public birthday_year: number,
    public gender: string,
    public region: string,
    public city: string,
    public phone_number: string,
    public instagram_name: string,
    public regulations_agreement: number
  ) {}

  getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}

export class UserDatails {
  constructor(
    public id: number = 0,
    public user: User[] = [],
    public eyesColor: string = '-',
    public hairColor: string = '-',
    public survey: Survey[] = []
  ) {}
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AccountComponent implements OnInit {

  user: User;
  userDetails: UserDatails;
  survey: Survey;
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private logger: NGXLogger,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>
      this.user = user
    );
    if (this.user.role === 'M') {
      this.profileService.findModelByEmail(this.user.email).subscribe(model => {
        this.userDetails = model;
        this.survey = model.survey;
      });
    } else if (this.user.role === 'P') {
      this.profileService.findPhotographerByEmail(this.user.email).subscribe(photographer => {
        this.userDetails = photographer;
        this.survey = photographer.survey;
      });
    }
  }

  getOccupation(role: string) {
    if (role === 'M') {
      return 'Modelka';
    } else if (role === 'P') {
      return 'Fotograf';
    }
  }

  getGender(gender: string) {
    if (gender === 'M') {
      return 'Mężczyzna';
    } else if (gender === 'K') {
      return 'Kobieta';
    }
  }

  deleteUser(): void {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć konto?',
      header: 'Potwierdzenie',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Potwierdzone'}];
        if (this.user.role === 'M') {
          this.profileService.deleteModel(this.userDetails.id).subscribe(user => {
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'Success', detail: 'Deleted user'});
            this.authService.logout();
            window.location.reload();
            this.router.navigate(['/login']);
          }, _ => {
            this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Anulowane'}];
          });
        } else if (this.user.role  === 'P') {
          this.profileService.deletePhotographer(this.userDetails.id).subscribe(user => {
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'Success', detail: 'Deleted user'});
            this.authService.logout();
            window.location.reload();
            this.router.navigate(['/login']);
          }, _ => {
            this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Anulowane'}];
          });
        }
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Anulowane'}];
      }
    });
  }
}

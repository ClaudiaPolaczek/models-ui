import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';

export class Survey {
  constructor(
    public name: string,
    public surname: string,
    public birthdayYear: number,
    public gender: string,
    public region: string,
    public city: string,
    public phoneNumber: string,
    public instagramName: string,
    public regulationsAgreement: number
  ) {}

  getFullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export class UserDatails {
  constructor(
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
      this.profileService.findModelByEmail(this.user.email).subscribe(model => this.userDetails = model);
    } else if (this.user.role === 'P') {
      this.profileService.findPhotographerByEmail(this.user.email).subscribe(photographer => this.userDetails = photographer);
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
    } else if (gender === 'W') {
      return 'Kobieta';
    }
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć konto?',
      header: 'Potwierdzenie',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Potwierdzone'}];
        if (user.role === 'M') {
          this.profileService.deleteModel(user.id);
        } else if (user.role  === 'W') {
          this.profileService.deletePhotographer(this.user.id);
        }
        // TODO wylogowanie
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Anulowane'}];
      }
    });
  }
}

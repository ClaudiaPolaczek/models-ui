import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {Table} from 'primeng/table';
import {User} from '../../user';
import {FilterService, Message} from 'primeng/api';
import {Model} from '../model-profiles/model-profiles.component';

export interface Photographer {
  id?: number;
  name?: string;
  birthday_year?: number;
  gender?: string;
  region?: string;
  city?: string;
}

@Component({
  selector: 'app-photographer-profiles',
  templateUrl: './photographer-profiles.component.html',
  styleUrls: ['./photographer-profiles.component.css']
})
export class PhotographerProfilesComponent implements OnInit {

  msgs: Message[] = [];
  photographersList: Photographer[];
  genders: any[];
  regons: any[];
  eyesColors: any[];
  hairColors: any[];
  ageOptions: any[];
  loading = true;
  activityValues: number[] = [0, 100];

  constructor(private router: Router,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private logger: NGXLogger,
              private filterService: FilterService) { }

  ngOnInit() {
    this.profileService.getAllPhotographers().subscribe(photographers => {
      this.photographersList = photographers.map((photographer) => {
        return { id: photographer.id, name: photographer.survey.first_name + ' ' + photographer.survey.last_name,
          birthday_year: photographer.survey.birthday_year,
          gender: this.getGender(photographer.survey.gender), region: photographer.survey.region, city: photographer.survey.city};
      });
      this.loading = false;
    });

    const customFilterName = 'custom-age';
    this.filterService.register(
      customFilterName,
      (value, filter): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }
        if (value === undefined || value === null) {
          return false;
        }
        const date = new Date();
        value = date.getFullYear() - value;
        if (filter === '20') {
          if (value < 20)  {
            return true;
          } else {
            return false;
          }
        } else if (filter === '2030') {
          if (value >= 20 && value < 30) {
            return true;
          } else {
            return false;
          }
        } else if (filter === '3040') {
          if (value >= 30 && value < 40) {
            return true;
          } else {
            return false;
          }
        } else if (filter === '4050') {
          if (value >= 40 && value < 50) {
            return true;
          } else {
            return false;
          }
        } else if (filter === '5060') {
          if (value >= 50 && value < 60) {
            return true;
          } else {
            return false;
          }
        } else if (filter === '60') {
          if (value >= 60) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    );

    this.genders = [
      { label: 'Kobieta', value: 'K' },
      { label: 'Mężczyzna', value: 'M' },
    ];

    this.regons = [{
      value: 'dolnoslaskie',
      label: 'dolnośląskie'
    }, {
      value: 'kujawsko-pomorskie',
      label: 'kujawsko-pomorskie'
    }, {
      value: 'lubelskie',
      label: 'lubelskie'
    }, {
      value: 'lubuskie',
      label: 'lubuskie'
    }, {
      value: 'łódzkie',
      label: 'łódzkie'
    }, {
      value: 'małopolskie',
      label: 'małopolskie'
    }, {
      value: 'mazowieckie',
      label: 'mazowieckie'
    }, {
      value: 'opolskie',
      label: 'opolskie'
    }, {
      value: 'podkarpackie',
      label: 'podkarpackie'
    }, {
      value: 'podlaskie',
      label: 'podlaskie'
    }, {
      value: 'pomorskie',
      label: 'pomorskie'
    }, {
      value: 'śląskie',
      label: 'śląskie'
    }, {
      value: 'świętokrzyskie',
      label: 'świętokrzyskie'
    }, {
      value: 'warmińsko-mazurskie',
      label: 'warmińsko-mazurskie'
    }, {
      value: 'wielkopolskie',
      label: 'wielkopolskie'
    }, {
      value: 'zachodniopomorskie',
      label: 'zachodniopomorskie'
    }];

    this.ageOptions = [{
      value: '20',
      label: '< 20'
    }, {
      value: '2030',
      label: '20 - 30'
    }, {
      value: '3040',
      label: '30 - 40'
    }, {
      value: '4050',
      label: '40 - 50'
    }, {
      value: '5060',
      label: '50 - 60'
    }, {
      value: '60',
      label: '> 60'
    }, {
      value: '',
      label: '-'
    }];
  }

  getGender(gender: string) {
    if (gender === 'M') {
      return 'Mężczyzna';
    } else if (gender === 'K') {
      return 'Kobieta';
    }
  }

  getAge(year): number {
    const date = new Date();
    return  date.getFullYear() - year;
  }

  selectPhotographer(photographer: Photographer): void {
    this.router.navigate(['/photographers/' + photographer.id]);
  }
}

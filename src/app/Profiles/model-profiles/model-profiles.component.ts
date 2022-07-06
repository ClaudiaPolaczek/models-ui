import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {FilterService} from 'primeng/api';

export interface Model {
     id?: number;
     email?: string;
     main?: string;
     name?: string;
     birthday_year?: number;
     gender?: string;
     region?: string;
     city?: string;
     eyes_color?: string;
     hair_color?: string;
}

@Component({
  selector: 'app-model-profiles',
  templateUrl: './model-profiles.component.html',
  styleUrls: ['./model-profiles.component.css']
})
export class ModelProfilesComponent implements OnInit {

  msgs: Message[] = [];
  modelsList: Model[];
  genders: any[];
  regons: any[];
  eyesColors: any[];
  hairColors: any[];
  ageOptions: any[];
  loading = true;
  activityValues: number[] = [0, 100];

  constructor(    private router: Router,
                  private profileService: ProfileService,
                  private authService: AuthenticationService,
                  private logger: NGXLogger,
                  private filterService: FilterService) { }

  ngOnInit() {
    this.profileService.getAllModels().subscribe(models => {
      this.modelsList = models.map((model) => {
        return { id: model.id, email: model.user.email, main: model.user.main_photo_url,
          name: model.survey.first_name + ' ' + model.survey.last_name, birthday_year: model.survey.birthday_year,
        gender: this.getGender(model.survey.gender), region: model.survey.region, city: model.survey.city,
          eyes_color: model.eyes_color, hair_color: model.hair_color};
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

    this.eyesColors = [{
      value: 'niebieskie',
      label: 'niebieskie'
    }, {
      value: 'brązowe',
      label: 'brązowe'
    }, {
      value: 'szare',
      label: 'szare'
    }, {
      value: 'piwne',
      label: 'piwne'
    }, {
      value: 'zielone',
      label: 'zielone'
    }, {
      value: 'inne',
      label: 'inne'
    }, {
      value: '',
      label: '-'
    }];

    this.hairColors = [{
      value: 'brązowe',
      label: 'brązowe'
    }, {
      value: 'blond',
      label: 'blond'
    }, {
      value: 'czarne',
      label: 'czarne'
    }, {
      value: 'rude',
      label: 'rude'
    }, {
      value: 'siwe',
      label: 'siwe'
    }, {
      value: 'inne',
      label: 'inne'
    }, {
      value: '',
      label: '-'
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

  selectModel(model: Model): void {
    this.router.navigate(['/models/' + model.id]);
  }
}

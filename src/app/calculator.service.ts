import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  constructor() {
  }

  getGender(gender: string) {
    if (gender === 'M') {
      return 'Mężczyzna';
    } else if (gender === 'K') {
      return 'Kobieta';
    }
  }

  getOccupation(role: string) {
    if (role === 'M') {
      return 'Modelka';
    } else if (role === 'P') {
      return 'Fotograf';
    }
  }

  getAge(year): number {
    const date = new Date();
    return  date.getFullYear() - year;
  }

  getDate(date): Date {
    return date.slice(0, 10);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, concatMap, map, tap} from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUserData(key: string): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/dj-rest-auth/user`, {
      headers: { Authorization: `Bearer ${key}` }
    }).pipe(
      map(user => new User(user.id, user.email, user.role, user.main_photo_url, user.avg_rate, key))
    );
  }

  storeUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  registerPhotographer(email: string, password: string, repeatPassword: string, name: string, surname: string, birthdayYear: number,
                       gender: string, region: string, city: string, phoneNumber: number, regulationsAgreement: number )
    : Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/photographers/`, {
      email,
      password1: password,
      password2: repeatPassword,
      first_name: name,
      last_name: surname,
      birthday_year: birthdayYear,
      gender,
      region,
      city,
      phone_number: phoneNumber,
      regulations_agreement: regulationsAgreement
    }).pipe(
      concatMap(response => this.getUserData(response.key)),
      tap(user => this.storeUser(user)),
    );
  }

  updatePhotographer(name: string, surname: string, birthdayYear: number, gender: string, region: string, city: string, phoneNumber: number)
    : Observable<User> {
    return this.http.patch<any>(`${environment.apiUrl}/photographers/`, {
      first_name: name,
      last_name: surname,
      birthday_year: birthdayYear,
      gender,
      region,
      city,
      phone_number: phoneNumber
    }).pipe(
      concatMap(response => this.getUserData(response.key)),
      tap(user => this.storeUser(user)),
    );
  }

  registerModel(email: string, password: string, repeatPassword: string, name: string, surname: string, birthdayYear: number,
                gender: string, region: string, city: string, phoneNumber: number, regulationsAgreement: number )
    : Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/models/`, {
      email,
      password1: password,
      password2: repeatPassword,
      first_name: name,
      last_name: surname,
      birthday_year: birthdayYear,
      gender,
      region,
      city,
      phone_number: phoneNumber,
      regulations_agreement: regulationsAgreement
    }).pipe(
      concatMap(response => this.getUserData(response.key)),
      tap(user => this.storeUser(user)),
    );
  }

  updateModel(name: string, surname: string, birthdayYear: number, gender: string, region: string, city: string, phoneNumber: number)
    : Observable<User> {
    return this.http.patch<any>(`${environment.apiUrl}/models/`, {
      first_name: name,
      last_name: surname,
      birthday_year: birthdayYear,
      gender,
      region,
      city,
      phone_number: phoneNumber
    }).pipe(
      concatMap(response => this.getUserData(response.key)),
      tap(user => this.storeUser(user)),
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/dj-rest-auth/login/`, { email,   password })
      .pipe(
        concatMap(response => this.getUserData(response.key)),
        tap(user => this.storeUser(user)),
      );
  }

  passwordChange(newPassword1: string, newPassword2: string, oldPassword: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/dj-rest-auth/password/change/`, {
      new_password1: newPassword1,
      new_password2: newPassword2,
      old_password: oldPassword
    })
      .pipe(
        concatMap(response => this.getUserData(response.key)),
        tap(user => this.storeUser(user)),
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/dj-rest-auth/logout/`, null).pipe(
      tap(_ => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }
}

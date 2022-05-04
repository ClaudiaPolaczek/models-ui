import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

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
      map(user => new User(user.id, user.email, user.role, user.mainPhotoUrl, user.avgRate, key))
    );
  }

  storeUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  register(email: string, password: string, repeatPassword: string)
    : Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/dj-rest-auth/registration/`, {
      email,
      password1: password,
      password2: repeatPassword,
    }).pipe(
      concatMap(response => this.getUserData(response.key)),
      tap(user => this.storeUser(user)),
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/dj-rest-auth/login/`, { email, password })
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

import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  Authorization: `Bearer ` /*${key}*/ })
  };

  constructor(private http: HttpClient) { }

  findNotificationById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/${id}`);
  }

  getAllNotifications(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/`);
  }

  getNotificationsByUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/user/`, {params: {email: userEmail}});
  }

  getNonReadByUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/n/`, {params: {email: userEmail}});
  }


  addNotification(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/notifications/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  readNotification(idNotification): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/notifications/read/`, {}, {
      headers: { 'Content-Type': 'application/json' }, params: {pk: idNotification}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteNotification(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/notifications/` + id + '/', { headers: { 'Content-Type': 'application/json' }}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

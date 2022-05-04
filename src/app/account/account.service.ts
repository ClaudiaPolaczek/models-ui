import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findCommentById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/${id}`);
  }

  getCommentsByRatingUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/rating/`, {params: {email: userEmail}});
  }

  getCommentsByRatedUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/rated/`, {params: {email: userEmail}});
  }

  getCommentsByRatingAndRatedUser(userRating, userRated): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/users`, {params: {email_rating: userRating, email_rated: userRated}});
  }

  getCommentsAvgForEachUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/avg/`);
  }

  addComment(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/comments/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteComment(id, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/comments/${id}/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  findNotificationById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/${id}`);
  }

  getNotificationsByUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/user/`, {params: {email: userEmail}});
  }

  readNotification(idNotification): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/notifications/read/`, null, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idNotification}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  addNotification(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/notifications/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteNotification(id, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/notifications/${id}/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

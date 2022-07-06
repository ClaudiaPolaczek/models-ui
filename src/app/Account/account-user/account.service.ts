import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../../environments/environment';
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

  addComment(rating, rated, ratingVal, ratingContent): Observable<any> {
    return this.http.post(`${environment.apiUrl}/comments/`, {
      rating_user: rating,
      rated_user: rated,
      rating: ratingVal,
      content: ratingContent
    }, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteComment(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/comments/${id}/`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

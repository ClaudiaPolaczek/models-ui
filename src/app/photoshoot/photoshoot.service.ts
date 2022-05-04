import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoshootService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  findById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photoshoots/${id}`);
  }

  getAllByUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photoshoots/user/`, {params: {email: userEmail}});
  }

  getAllByInvitingUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photoshoots/inviting/`, {params: {email: userEmail}});
  }

  getAllByInvitedUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photoshoots/invited/`, {params: {email: userEmail}});
  }

  addPortfolio(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photoshoots/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  cancelPhotoshoot(idPortfolio): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/photoshoots/cancel/`, null, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idPortfolio}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  acceptPhotoshoot(idPortfolio): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/photoshoots/accept/`, null, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idPortfolio}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  endPhotoshoot(idPortfolio): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/photoshoots/end/`, null, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idPortfolio}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

}

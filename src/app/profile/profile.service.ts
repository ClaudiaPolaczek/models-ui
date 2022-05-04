import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  Authorization: `Bearer ` /*${key}*/ })
  };

  constructor(private http: HttpClient) { }

  findModelById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/models/${id}`);
  }

  findPhotographerById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photographers/${id}`);
  }

  getAllModels(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/models/`);
  }

  getAllPhotographers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photographers/`);
  }

  findModelByEmail(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/models/email/`, {params: {email: userEmail}});
  }

  findPhotographerByEmail(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photographers/email/`, {params: {email: userEmail}});
  }

  addPhotographer(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photographers/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  addModel(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/models/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editPhotographer(id,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/photographers/${id}/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editModel(id,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/models/${id}/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setModelInstagram(idModel,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/models/instagram/`, data, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idModel}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setPhotographerInstagram(idPhotographer,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/photographers/instagram/`, data, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idPhotographer}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setModelAddInfo(idModel,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/models/add/`, data, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idModel}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteModel(id, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/models/${id}/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deletePhotographer(id, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/photographers/${id}/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

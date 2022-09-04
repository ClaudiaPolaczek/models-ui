import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../../environments/environment';
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
    return this.http.get(`${environment.apiUrl}/models/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
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

  getAvgForEachUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comments/avg/`);
  }

  findModelByEmail(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/models/email/`, {params: {email: userEmail}});
  }

  findPhotographerByEmail(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photographers/email/`, {params: {email: userEmail}});
  }

  findUserById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
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
    return this.http.post(`${environment.apiUrl}/photographers/${id}/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editModel(id,  data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/models/${id}/`, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setModelInstagram(idModel,  data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/models/instagram/`, {instagram_name: data}, {
      headers: { 'Content-Type': 'application/json' }, params: {pk: idModel}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setPhotographerInstagram(idPhotographer,  data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photographers/instagram/`, {instagram_name: data}, {
      headers: { 'Content-Type': 'application/json' }, params: {pk: idPhotographer}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setModelAddInfo(idModel, eyes, hair): Observable<any> {
    return this.http.post(`${environment.apiUrl}/models/add/`, {
      eyes_color: eyes,
      hair_color: hair
    }, {
      headers: { 'Content-Type': 'application/json' }, params: {pk: idModel}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteModel(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/models/` + id + '/', { headers: { 'Content-Type': 'application/json' }}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deletePhotographer(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/photographers/` + id + '/', { headers: { 'Content-Type': 'application/json' }}).pipe(
           catchError((error: HttpErrorResponse) => {
             return throwError(error);
           })
    );
  }

  addMainPhotoUrl(userEmail,  url): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/photo/`, {
      fileUrl: url
    }, {
      headers: { 'Content-Type': 'application/json' }, params: {email: userEmail}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

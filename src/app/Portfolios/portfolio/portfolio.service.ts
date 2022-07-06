import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  findById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/portfolios/${id}`);
  }

  getAllByUser(userEmail): Observable<any> {
    return this.http.get(`${environment.apiUrl}/portfolios/user/`, {params: {email: userEmail}});
  }

  addPortfolio(idUser, portolioName, portolioDescription): Observable<any> {
    return this.http.post(`${environment.apiUrl}/portfolios/`, {
      user: idUser,
      name: portolioName,
      description: portolioDescription,
      main_photo_url: ''
    }, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editPortfolio(idPortfolio,  portfolioName, portfolioDescription): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/portfolios/${idPortfolio}/`, {
      name: portfolioName,
      description: portfolioDescription
    }, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  setMainPhotoUrl(idPortfolio,  data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/portfolios/photo/`, data, {
      headers: { 'Content-Type': 'application/json' }, params: {id: idPortfolio}}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deletePortfolioById(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/portfolios/` + id + '/', { headers: { 'Content-Type': 'application/json' }}).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  findImageById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/images/${id}`);
  }

  getImagesByPortfolio(idPortfolio): Observable<any> {
    return this.http.get(`${environment.apiUrl}/images/portfolio/`, {params: {portfolio: idPortfolio}});
  }

  addImage(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/images/`, {data} ,
      { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }}
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteById(id, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/images/${id}/`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteByUrl(imageUrl, data): Observable<any> {
    console.log('data', data);
    return this.http.delete(`${environment.apiUrl}/images/url/`, {params: {url: imageUrl}})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

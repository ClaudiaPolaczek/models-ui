import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment } from '../../environments/environment';
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

  getAllPortfolios(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/portfolios/`);
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

  setMainPhotoUrl(idPortfolio,  url): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/portfolios/photo/`, {
      main_photo_url: url
    }, {
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

  addImage(portfolioId, fileUrl, nameFile): Observable<any> {
    return this.http.post(`${environment.apiUrl}/images/`, {
        portfolio: portfolioId,
        file_url: fileUrl,
        name: nameFile
      } , this.httpOptions
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteById(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/images/` + id + '/', { headers: { 'Content-Type': 'application/json' }})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteByUrl(imageUrl): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/images/url/`, {params: {url: imageUrl}})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  url = 'http://localhost:3000/api/price';
  constructor(private http: HttpClient) { }
  getPrice(resource) {
    return this.http.post<any>(this.url, resource);
  }
}

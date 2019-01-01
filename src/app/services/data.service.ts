import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  upadate(resource) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(catchError(this.handleError));
  }

  deletePost(resource) {
    return this.http.delete(this.url + '/' + resource.id).pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }

}

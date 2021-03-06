import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  get(resourceId) {
    return this.http.get(this.url + '/' + resourceId);
  }

  create(resource) {
    return this.http.post<any>(this.url, resource);
  }

  update(resource) {
    console.log(resource);
    return this.http.put(this.url + '/' + resource._id, resource).pipe(catchError(this.handleError));
  }

  deletePost(resource) {
    return this.http.delete(this.url + '/' + resource._id).pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }

}

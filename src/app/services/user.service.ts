import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { BaseService} from './base.service';
import { Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http : Http) { 
    super()
  }

  getUser(): Observable<User[]> {
    return this.http.get(super.baseurl() + 'api/user')
      .pipe(map((res: Response) => {
        const data = super.extractData(res);
        return data;
      }))
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<any> {
    return this.http.post(super.baseurl() + 'api/user/save', user)
      .pipe(map((res: Response) => {
        const data = super.extractData(res);
        return data;
      }))
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(super.baseurl() + 'api/user/save', user)
      .pipe(map((res: Response) => {
        const data = super.extractData(res);
        return data;
      }))
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(super.baseurl() + 'api/user/delete', user)
      .pipe(map((res: Response) => {
        const data = super.extractData(res);
        return data;
      }))
      .pipe(catchError(this.handleError));
  }
}

import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {Serviceerror} from '../models/serviceerror';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }
    protected extractData(res: Response) {
        const body = res.json();
        if (body.Status === 'success') {
            return body.Data;
        } else if (body.Status === 'fail') {
            throw new Serviceerror(body.Message, body.Data, 'fail');
        } else if (body.Status === 'error') {
            throw new Serviceerror(body.Message, body.Data);
        } else {
            throw new Serviceerror('Invalid JSend Response Status [' + body.status + ']');
        }
    }
    public baseurl(): string {
        return environment.apiBaseUrl;
    }

    protected handleError(error: any) {
        if (error instanceof Serviceerror) {
            return Observable.throw(error);
        } else {
            const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            return Observable.throw(new Serviceerror(errMsg));
        }
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '../models/project';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(private http: Http) { super(); }

  getProject(): Observable<Project[]> {
    return this.http.get(super.baseurl() + 'api/project')
        .pipe(map((res: Response) => {
            const data = super.extractData(res);
            return data;
        }))
        .pipe(catchError(this.handleError));
}
addProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/save',project)
        .pipe(map((res: Response) => {
            const data = super.extractData(res);
            return data;
        }))
        .pipe(catchError(this.handleError));
}

updateProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/save',project)
        .pipe(map((res: Response) => {
            const data = super.extractData(res);
            return data;
        }))
        .pipe(catchError(this.handleError));
}

deleteProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/delete?projectId=' + project.ProjectId,project)
        .pipe(map((res: Response) => {
            const data = super.extractData(res);
            return data;
        }))
        .pipe(catchError(this.handleError));
}
}

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Headers, ResponseOptions, Response } from '@angular/http';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let mockBackEnd: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        }]
    })
    service = TestBed.get(TaskService)
    mockBackEnd = TestBed.get(MockBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

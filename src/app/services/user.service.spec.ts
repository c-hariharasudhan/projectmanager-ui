import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Headers, ResponseOptions, Response } from '@angular/http';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockBackEnd: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,
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
    service = TestBed.get(UserService)
    mockBackEnd = TestBed.get(MockBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

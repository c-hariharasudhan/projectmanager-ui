import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Headers, ResponseOptions, Response } from '@angular/http';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let mockBackEnd: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService,
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
    service = TestBed.get(ProjectService)
    mockBackEnd = TestBed.get(MockBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

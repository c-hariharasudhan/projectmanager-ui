import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()]
  }));

  it('should be created', () => {
    const service: UtilityService = TestBed.get(UtilityService);
    expect(service).toBeTruthy();
  });
});

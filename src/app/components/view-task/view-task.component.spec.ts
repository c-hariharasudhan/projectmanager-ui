import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { SearchFilterPipe } from '../../pipes/search-filter.pipe'
import { ToastrModule } from 'ngx-toastr';

import { HttpModule } from '@angular/http';

import { ViewTaskComponent } from './view-task.component';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ToastrModule.forRoot(),
        HttpModule],
      declarations: [ViewTaskComponent, SearchFilterPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

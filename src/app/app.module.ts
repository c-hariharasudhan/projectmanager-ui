import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    UserComponent,
    TaskComponent,
    ViewTaskComponent,
    MenuComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

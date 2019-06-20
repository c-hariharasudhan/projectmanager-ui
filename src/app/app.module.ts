import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    UserComponent,
    TaskComponent,
    ViewTaskComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

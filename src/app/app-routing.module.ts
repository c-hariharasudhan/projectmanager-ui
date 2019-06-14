import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {path: 'project', component: ProjectComponent },
  {path: 'user', component: UserComponent},
  {path: 'task', component: TaskComponent},
  {path: 'viewtask', component: ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

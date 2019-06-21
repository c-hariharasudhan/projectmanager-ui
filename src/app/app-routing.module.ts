import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';

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

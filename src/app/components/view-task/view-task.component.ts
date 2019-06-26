import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { LogLevel } from 'src/app/models/log-level.enum';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  modalRef: BsModalRef;
  projects: Array<Project>;
  searchText: string;
  selectedIndex: number;
  selectedProjName: string;
  tasks: Array<Task> = [];
  taskSearch: boolean;
  isStartDateAsc: boolean;
  isEndDateAsc: boolean;
  isPriorityAsc: boolean;
  isCompletedAsc: boolean;

  constructor(private utilityService: UtilityService, private projectService: ProjectService,
    private taskService: TaskService, private modalService: BsModalService, private router: Router) {
    this.projects = new Array<Project>();
  }

  ngOnInit() {
    this.utilityService.showSpinner(true);
    this.projectService.getProject().subscribe((project) => {
      this.projects = project;
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  setIndex(index: number) {
    this.selectedIndex = index;
  }

  selectProj() {
    this.selectedProjName = this.projects[this.selectedIndex].ProjectName;
    this.taskService.getAllTasksByProjectId(+this.projects[this.selectedIndex].ProjectId).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.taskSearch = true;
        this.utilityService.showSpinner(false);
      },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
    this.modalRef.hide();

  }

  editTask(task) {
    this.router.navigate(['/task', { task: JSON.stringify(task) }]);
  }

  deleteTask(task) {
    this.utilityService.showSpinner(true);
    this.taskService.deleteTask(task).subscribe((data) => {
      this.utilityService.showMessage('Task completed successfully', LogLevel.Info)
      this.selectProj();
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
  }

  sortTask(type: number) {
    if (type === 1) {
      this.isStartDateAsc = !this.isStartDateAsc;
      const direction = this.isStartDateAsc ? 1 : -1;
      this.tasks.sort((a, b) => (a.StartDate > b.StartDate) ? 1 * direction
        : ((b.StartDate > a.StartDate) ? -1 * direction : 0));
    }
    if (type === 2) {
      this.isEndDateAsc = !this.isEndDateAsc;
      const direction = this.isEndDateAsc ? 1 : -1;
      this.tasks.sort((a, b) => (a.EndDate > b.EndDate) ? 1 * direction :
        ((b.EndDate > a.EndDate) ? -1 * direction : 0));
    }
    if (type === 3) {
      this.isPriorityAsc = !this.isPriorityAsc;
      const direction = this.isPriorityAsc ? 1 : -1;
      this.tasks.sort((a, b) => (a.Priority > b.Priority) ? 1 * direction :
        ((b.Priority > a.Priority) ? -1 * direction : 0));
    }
    if (type === 4) {
      this.isCompletedAsc = !this.isCompletedAsc;
      const direction = this.isCompletedAsc ? 1 : -1;
      this.tasks.sort((a, b) => (a.Status> b.Status) ? 1 * direction :
        ((b.Status > a.Status) ? -1 * direction : 0));
    }
    this.tasks = [...this.tasks];
  }

}

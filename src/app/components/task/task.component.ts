import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Parenttask } from 'src/app/models/parenttask';
import { UtilityService } from 'src/app/services/utility.service';
import { LogLevel } from 'src/app/models/log-level.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  modalRef: BsModalRef;
  tasks: Array<Task>;
  taskToCreate: Task;
  hasParentTask: boolean;
  projects: Array<Project>;
  users: Array<User>;
  selectedIndex: number;
  selectedProjName: string;
  selectedIndexParent: number;
  selectedParentTask: string;
  selectedIndexUser: number;
  selectedUser: string;
  parentTasks: Array<Parenttask>;
  searchText: string;
  minStartDate: Date;
  minEndDate: Date;
  buttonName: string;
  updateDisabled: boolean;

  constructor(private utilityService: UtilityService, private projectService: ProjectService,
    private userService: UserService, private taskService: TaskService, private modalService: BsModalService, private route: ActivatedRoute) {

    if (route.snapshot.params['task']) {
      this.taskToCreate = JSON.parse(route.snapshot.params['task']);
      this.buttonName = 'Update';
      this.updateDisabled = true;
      this.taskToCreate.StartDate = this.taskToCreate.StartDate ?
        moment(this.taskToCreate.StartDate).format('MM-DD-YYYY').toString() : moment(new Date()).format('MM-DD-YYYY').toString();
      this.taskToCreate.EndDate = this.taskToCreate.EndDate ? moment(this.taskToCreate.EndDate).format('MM-DD-YYYY').toString() :
        moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
      this.selectedParentTask = this.taskToCreate.ParentTaskName;
      this.selectedUser = this.taskToCreate.User.FirstName;
      this.projectService.getProject().subscribe((project) => {
        this.projects = project;
        let selectedProj = this.projects.filter(proj=> proj.ProjectId.toString().trim() === this.taskToCreate.ProjectId.toString().trim());
        if(!!selectedProj && selectedProj.length > 0){
          this.selectedProjName = selectedProj[0].ProjectName;
        }
      },
        (error) => {
          this.utilityService.showMessage(error, LogLevel.Error);
          this.utilityService.showSpinner(false);
        });
    }
    else {
      this.taskToCreate = new Task();
      this.buttonName = 'Add';

      this.taskToCreate.Priority = 0;
      this.minStartDate = new Date();
      this.minEndDate = new Date();
      this.minEndDate.setDate(this.minStartDate.getDate() + 1);
      this.taskToCreate.StartDate = moment(new Date()).format('MM-DD-YYYY').toString();
      this.taskToCreate.EndDate = moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();

      this.projects = new Array<Project>();
      this.users = new Array<User>();
      this.parentTasks = new Array<Parenttask>();
    }
    console.log(this.taskToCreate);
  }

  ngOnInit() {
  }

  setMinEndDate($event) {
    this.minEndDate = moment(this.taskToCreate.StartDate).add(1, 'days').toDate();
    if (moment(this.taskToCreate.EndDate) <= moment(this.taskToCreate.StartDate)) {
      this.taskToCreate.EndDate = moment(this.minEndDate).format('MM-DD-YYYY').toString();
    }
  }

  addTask() {
    if (!this.taskToCreate.ProjectId && this.buttonName=='Add') {
      this.utilityService.showMessage('Please select project ', LogLevel.Warning);
      return;
    }
    if (!this.taskToCreate.TaskName || this.taskToCreate.TaskName === '') {
      this.utilityService.showMessage('Please add task name ', LogLevel.Warning);
      return;
    }
    if (!this.hasParentTask && (!this.taskToCreate.Priority || this.taskToCreate.Priority === 0)) {
      this.utilityService.showMessage('Please set priority ', LogLevel.Warning);
      return;
    }
    if (!this.hasParentTask && (!this.taskToCreate.StartDate || this.taskToCreate.StartDate.toString() === '')) {
      this.utilityService.showMessage('Please select start date ', LogLevel.Warning);
      return;
    }
    if (!this.hasParentTask && (!this.taskToCreate.EndDate || this.taskToCreate.EndDate.toString() === '')) {
      this.utilityService.showMessage('Please select end date ', LogLevel.Warning);
      return;
    }
    if (!this.hasParentTask && (!this.taskToCreate.User.UserId || this.taskToCreate.User.UserId.toString() === '')) {
      this.utilityService.showMessage('Please select userId ', LogLevel.Warning);
      return;
    }
    if (this.hasParentTask) {
      this.taskToCreate.Priority = 0;
    }
    if(this.buttonName==='Add'){
    this.utilityService.showSpinner(true);
    this.taskService.addTask(this.taskToCreate).subscribe((data) => {
      this.utilityService.showMessage('Saved successfully', LogLevel.Info);
      this.resetTask();
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
    }
     if(this.buttonName==='Update'){
      this.utilityService.showSpinner(true);
      this.taskService.updateTask(this.taskToCreate).subscribe((data) => {
        this.utilityService.showMessage('Saved successfully', LogLevel.Info);
        this.resetTask();
        this.utilityService.showSpinner(false);
      },
        (error) => {
          this.utilityService.showMessage(error, LogLevel.Error);
          this.utilityService.showSpinner(false);
        });
    }
  }

  openModal(template: TemplateRef<any>, type: number) {
    this.searchText = undefined;
    if (type === 1) {
      this.utilityService.showSpinner(true);
      this.projectService.getProject().subscribe((project) => {
        this.projects = project;
        this.modalRef = this.modalService.show(template);
        this.utilityService.showSpinner(false);
      },
        (error) => {
          this.utilityService.showMessage(error, LogLevel.Error);
          this.utilityService.showSpinner(false);
        });
    }
    if (type === 2) {
      if (!this.hasParentTask) {
        this.utilityService.showSpinner(true);
        this.taskService.getParentTask().subscribe((parentTask) => {
          this.parentTasks = parentTask;
          this.modalRef = this.modalService.show(template);
          this.utilityService.showSpinner(false);
        },
          (error) => {
            this.utilityService.showMessage(error, LogLevel.Error);
            this.utilityService.showSpinner(false);
          });
      } else {
        this.utilityService.showMessage('parent task only needs task name and project', LogLevel.Warning);
      }
    }
    if (type === 3) {
      if (!this.hasParentTask) {
        this.utilityService.showSpinner(true);
        this.userService.getUser().subscribe((user) => {
          this.users = user;
          this.modalRef = this.modalService.show(template);
          this.utilityService.showSpinner(false);
        },
          (error) => {
            this.utilityService.showMessage(error, LogLevel.Error);
            this.utilityService.showSpinner(false);
          });
      } else {
        this.utilityService.showMessage('parent task only needs task name and project', LogLevel.Warning);
      }
    }
  }

  resetTask() {
    this.taskToCreate = new Task();
    this.taskToCreate.Priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.taskToCreate.StartDate = moment(new Date()).format('MM-DD-YYYY').toString();
    this.taskToCreate.EndDate = moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
    this.hasParentTask = undefined;
    this.selectedUser = null;
    this.selectedIndexUser = null;
    this.selectedIndexParent = null;
    this.selectedParentTask = null;
    this.selectedIndex = null;
    this.selectedProjName = null;

  }

  setIndex(index: number, type: number) {
    if (type === 1) {
      this.selectedIndex = index;
    }
    if (type === 2) {
      this.selectedIndexParent = index;
    }
    if (type === 3) {
      this.selectedIndexUser = index;
    }
  }

  selectProj() {
    this.taskToCreate.ProjectId = +this.projects[this.selectedIndex].ProjectId;
    this.selectedProjName = this.projects[this.selectedIndex].ProjectName;
    this.selectedIndex = null;
    this.modalRef.hide();
  }

  selectParentTask() {
    this.taskToCreate.ParentId = +this.parentTasks[this.selectedIndexParent].ParentTaskId;
    this.selectedParentTask = this.parentTasks[this.selectedIndexParent].ParentTaskName;
    this.selectedIndexParent = null;
    this.modalRef.hide();
  }
  selectUser() {
    this.taskToCreate.User.UserId = +this.users[this.selectedIndexUser].UserId;
    this.selectedUser = this.users[this.selectedIndexUser].FirstName;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }
  hasParTaskChange($event) {
    if (this.hasParentTask) {
      this.selectedIndexParent = null;
      this.selectedIndexParent = null;
      this.selectedParentTask = null;
      this.selectedUser = null;
      this.taskToCreate.Priority = 0;
      this.taskToCreate.ParentId = null;
      this.taskToCreate.StartDate = null;
      this.taskToCreate.EndDate = null;
      this.taskToCreate.User.UserId = null;
    } else {
      this.taskToCreate.StartDate = this.taskToCreate.StartDate ?
      moment(this.taskToCreate.StartDate).format('MM-DD-YYYY').toString() : moment(new Date()).format('MM-DD-YYYY').toString();
    this.taskToCreate.EndDate = this.taskToCreate.EndDate ? moment(this.taskToCreate.EndDate).format('MM-DD-YYYY').toString() :
      moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();

    }
  }

}

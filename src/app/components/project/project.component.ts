import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UtilityService } from 'src/app/services/utility.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { LogLevel } from 'src/app/models/log-level.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectToCreate: Project;
  buttonText: string;
  startEndDateEnable: boolean;
  minStartDate: Date;
  minEndDate: Date;
  modalRef: BsModalRef;
  selectedIndexUser: number;
  selectedUser: string;
  users: Array<User>;
  searchText: string;
  searchTextUser: string;
  projects: Array<Project>;
  isStartDateAsc: boolean;
  isEndDateAsc: boolean;
  isPriorityAsc: boolean;
  isCompletedAsc: boolean;

  constructor(private utilityService: UtilityService, private projectService: ProjectService,
    private userService: UserService, private modalService: BsModalService) {
    this.users = new Array<User>();
    this.projects = new Array<Project>();
  }

  ngOnInit() {
    this.projectToCreate = new Project();
    this.buttonText = 'Add';
    this.projectToCreate.Priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.utilityService.showSpinner(true);
    this.userService.getUser().subscribe((user) => {
      this.users = user;

      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
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
  setStartEndDateChange($event) {
    if (this.startEndDateEnable) {
      this.projectToCreate.StartDate = this.projectToCreate.StartDate ?
        this.projectToCreate.StartDate : moment(new Date()).format('MM-DD-YYYY').toString();
      this.projectToCreate.EndDate = this.projectToCreate.EndDate ? this.projectToCreate.EndDate :
        moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
    } else {
      this.projectToCreate.StartDate = null;
      this.projectToCreate.EndDate = null;
    }
  }
  setMinEndDate($event) {
    this.minEndDate = moment(this.projectToCreate.StartDate).add(1, 'days').toDate();
    if (moment(this.projectToCreate.EndDate) <= moment(this.projectToCreate.StartDate)) {
      this.projectToCreate.EndDate = moment(this.minEndDate).format('MM-DD-YYYY').toString();
    }
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);


  }
  setIndex(index: number) {
    this.selectedIndexUser = index;
  }
  selectUser() {
    this.projectToCreate.User.UserId = +this.users[this.selectedIndexUser].UserId;
    this.selectedUser = this.users[this.selectedIndexUser].FirstName;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }

  addProject() {
    if (!this.projectToCreate.ProjectName || this.projectToCreate.ProjectName === '') {
      this.utilityService.showMessage('Please add project name ', LogLevel.Warning);
      return;
    }
    if (!this.projectToCreate.Priority) {
      this.utilityService.showMessage('Please set priority ', LogLevel.Warning);
      return;
    }
    if (this.startEndDateEnable && (!this.projectToCreate.StartDate || this.projectToCreate.StartDate.toString() === '')) {
      this.utilityService.showMessage('Please select start date ', LogLevel.Warning);
      return;
    }
    if (this.startEndDateEnable && (!this.projectToCreate.EndDate || this.projectToCreate.EndDate.toString() === '')) {
      this.utilityService.showMessage('Please select end date ', LogLevel.Warning);
      return;
    }
    if (!this.projectToCreate.User.UserId || this.projectToCreate.User.UserId.toString() === '') {
      this.utilityService.showMessage('Please select userId ', LogLevel.Warning);
      return;
    }
    if (!this.startEndDateEnable) {
      this.projectToCreate.StartDate = null;
      this.projectToCreate.EndDate = null;
    }
    if (this.buttonText === 'Add') {
      this.utilityService.showSpinner(true);
      this.projectService.addProject(this.projectToCreate).subscribe((data) => {
        this.utilityService.showMessage('Saved successfully', LogLevel.Info);
        this.resetProject();
        this.ngOnInit();
        this.utilityService.showSpinner(false);
      },
        (error) => {
          this.utilityService.showMessage(error, LogLevel.Error);
          this.utilityService.showSpinner(false);
        });
    }
    if (this.buttonText === 'Update') {
      this.utilityService.showSpinner(true);
      this.projectService.updateProject(this.projectToCreate).subscribe((data) => {
        this.utilityService.showMessage('Update successfully', LogLevel.Info)
        this.ngOnInit();
        this.utilityService.showSpinner(false);
      },
        (error) => {
          this.utilityService.showMessage(error, LogLevel.Error);
          this.utilityService.showSpinner(false);
        });
    }

  }
  resetProject() {
    this.projectToCreate = new Project();
    this.startEndDateEnable = false;
    this.buttonText = 'Add';
    this.projectToCreate.Priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.selectedUser = null;
    this.selectedIndexUser = null;
  }

  editProject(project) {
    this.buttonText = 'Update';
    this.selectedUser = this.users.find(x => x.UserId === project.User.UserId).FirstName;
    this.projectToCreate = project;
    if (project.StartDate && project.EndDate) {
      this.projectToCreate.StartDate = moment(this.projectToCreate.StartDate).format('MM-DD-YYYY').toString();
      this.projectToCreate.EndDate = moment(this.projectToCreate.EndDate).format('MM-DD-YYYY').toString();
      this.startEndDateEnable = true;
    } else {
      this.startEndDateEnable = false;
    }
  }

  deleteProject(project) {
    this.utilityService.showSpinner(true);
    this.projectService.deleteProject(project).subscribe((data) => {
      this.utilityService.showMessage('Project suspended successfully', LogLevel.Info)
      this.ngOnInit();
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
  }

  sortProject(type: number) {
    if (type === 1) {
      this.isStartDateAsc = !this.isStartDateAsc;
      const direction = this.isStartDateAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.StartDate > b.StartDate) ? 1 * direction
        : ((b.StartDate > a.StartDate) ? -1 * direction : 0));
    }
    if (type === 2) {
      this.isEndDateAsc = !this.isEndDateAsc;
      const direction = this.isEndDateAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.EndDate > b.EndDate) ? 1 * direction :
        ((b.EndDate > a.EndDate) ? -1 * direction : 0));
    }
    if (type === 3) {
      this.isPriorityAsc = !this.isPriorityAsc;
      const direction = this.isPriorityAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.Priority > b.Priority) ? 1 * direction :
        ((b.Priority > a.Priority) ? -1 * direction : 0));
    }
    if (type === 4) {
      this.isCompletedAsc = !this.isCompletedAsc;
      const direction = this.isCompletedAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.NoOfCompletedTasks > b.NoOfCompletedTasks) ? 1 * direction :
        ((b.NoOfCompletedTasks > a.NoOfCompletedTasks) ? -1 * direction : 0));
    }
    this.projects = [...this.projects];
  }
}

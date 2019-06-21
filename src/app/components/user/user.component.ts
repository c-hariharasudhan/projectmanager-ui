import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { LogLevel } from 'src/app/models/log-level.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users : Array<User>;
  userToCreate : User;
  buttonText : string;
  isFirstNameAsc: boolean;
  isLastNameAsc: boolean;
  isEmpIdAsc: boolean;
  searchText: string;

  constructor(private userService : UserService, private utilityService : UtilityService) { 
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.userToCreate = new User();
    this.buttonText = 'Add';
    this.utilityService.showSpinner(true);
    this.userService.getUser().subscribe((users) => {
      this.users = users;
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
  }
  addUser() {
    if (!this.userToCreate.FirstName || this.userToCreate.FirstName === '') {
      this.utilityService.showMessage('Please add first Name ', LogLevel.Warning);
      return;
    }
    if (!this.userToCreate.LastName || this.userToCreate.LastName === '') {
      this.utilityService.showMessage('Please add last Name ', LogLevel.Warning);
      return;
    }
    if (!this.userToCreate.EmployeeId || this.userToCreate.EmployeeId === '') {
      this.utilityService.showMessage('Please enter employee id', LogLevel.Warning);
      return;
    }
    if (this.buttonText === 'Add') {
      this.utilityService.showSpinner(true);
      this.userService.addUser(this.userToCreate).subscribe((data) => {
        this.utilityService.showMessage('Saved successfully', LogLevel.Info)
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
      this.userService.updateUser(this.userToCreate).subscribe((data) => {
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

  resetUser() {
    this.userToCreate = new User();
    this.buttonText = 'Add';
  }

  editUser(user) {
    this.buttonText = 'Update';
    this.userToCreate = user;
  }

  deleteUser(user) {
    this.utilityService.showSpinner(true);
    this.userService.deleteUser(user).subscribe((data) => {
      this.utilityService.showMessage('User Deleted successfully', LogLevel.Info)
      this.ngOnInit();
      this.utilityService.showSpinner(false);
    },
      (error) => {
        this.utilityService.showMessage(error, LogLevel.Error);
        this.utilityService.showSpinner(false);
      });
  }

  sortUser(type: number) {
    if (type === 1) {
      this.isFirstNameAsc = !this.isFirstNameAsc;
      const direction = this.isFirstNameAsc ? 1 : -1;
      this.users.sort((a, b) => (a.FirstName > b.FirstName) ? 1 * direction
        : ((b.FirstName > a.FirstName) ? -1 * direction : 0));
    }
    if (type === 2) {
      this.isLastNameAsc = !this.isLastNameAsc;
      const direction = this.isLastNameAsc ? 1 : -1;
      this.users.sort((a, b) => (a.LastName > b.LastName) ? 1 * direction :
        ((b.LastName > a.LastName) ? -1 * direction : 0));
    }
    if (type === 3) {
      this.isEmpIdAsc = !this.isEmpIdAsc;
      const direction = this.isEmpIdAsc ? 1 : -1;
      this.users.sort((a, b) => (a.EmployeeId > b.EmployeeId) ? 1 * direction :
        ((b.EmployeeId > a.EmployeeId) ? -1 * direction : 0));
    }
    this.users = [...this.users];
  }

}

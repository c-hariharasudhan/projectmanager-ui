import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LogLevel} from '../models/log-level.enum'
// import { configure, getLogger } from 'log4js';
// configure('./projectmanager');

// const logger = getLogger();

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private toastr: ToastrService) {    
  }
  showMessage(msg: string, level: LogLevel){
      switch(level){
        case LogLevel.Warning:
          this.toastr.warning(msg);
          break;
        case LogLevel.Error:
          this.toastr.error(msg);
          break;
        default:
          this.toastr.success(msg);
      }
  }
  logMessage(msg: string, level: LogLevel){
    //TODO : implement log4j
    console.log(msg);
  }

  showSpinner(show : boolean){
    document.getElementById('loading-div').style.display = show ? 'block' : 'none';
  }

}

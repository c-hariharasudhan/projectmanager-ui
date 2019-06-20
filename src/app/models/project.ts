import {User} from './user';
export class Project {
    public ProjectId : number;
    public ProjectName : string;
    public StartDate : string;
    public EndDate : string;
    public Priority : number;
    public User: User;
    public NoOfTasks:number;
    public NoOfCompletedTasks:number;
    
    constructor(){
        this.User=new User();
    }
}

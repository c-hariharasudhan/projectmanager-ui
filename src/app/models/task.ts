import {User} from './user';
export class Task {
    public TaskId: number;
    public TaskName: string;
    public StartDate: string;
    public EndDate: string;    
    public Priority: number;
    public ProjectId: number;
    public ParentId: number;    
    public ParentTaskName: string;
    public Status: number;
    public User: User;

    constructor() {
        this.User = new User();
    }
}



export class Task {
  
    taskId: string;
    taskCode: string; 
    progress: number;
    taskName: string;
    assignedTo: string; 
    isDeleted: boolean;
    dueDate: Date;
    status: string;  
  
    constructor(taskId: string, taskName: string, assignedTo: string, dueDate: Date, status: string,  isDeleted: boolean,  taskCode: string , progress: number) {
      this.taskId = taskId;
      this.taskCode = taskCode; 
      this.taskName = taskName;
      this.assignedTo = assignedTo;
      this.dueDate = dueDate;
      this.status = status;
      this.isDeleted=isDeleted;
      this.progress = progress;
    }
  }
  
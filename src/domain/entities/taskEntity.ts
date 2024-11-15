

export class Task {
    taskId: string;
    taskName: string;
    assignedTo: string;  // User ID or Team Member ID
    dueDate: Date;
    status: string;  // E.g., 'Pending', 'In Progress', 'Completed'
  
    constructor(taskId: string, taskName: string, assignedTo: string, dueDate: Date, status: string) {
      this.taskId = taskId;
      this.taskName = taskName;
      this.assignedTo = assignedTo;
      this.dueDate = dueDate;
      this.status = status;
    }
  }
  
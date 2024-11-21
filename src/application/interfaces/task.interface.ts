import { ObjectId } from "mongoose";

  

export enum TaskStatus {
  TO_DO = "TO_DO",
  ON_PROGRESS = "ON_PROGRESS",
  COMPLETED = "COMPLETED",
}

  export interface ITask {
    taskCode: string;  
    _id: string;
    name: string;
    description: string;
    projectId: string;
    priority: string;
    progress: number;
    status: TaskStatus;
    startDate: Date;
    dueDate: Date;
    module?: string;
    isDeleted?: boolean;
    assignee?: ObjectId;
}
import { ObjectId } from "mongoose";
import { TaskStatus } from "../../interfaces/task.interface";

export interface CreateTaskDTO {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    status: TaskStatus;
    startDate: Date;
    dueDate: Date;
    module?: string;
    assignee?: string;
    isDeleted:boolean;
  }
  
  export interface UpdateTaskDTO {
    name?: string;
    description?: string;
    priority?: number;
    status?: TaskStatus;
    startDate?: Date;
    dueDate?: Date;
    isDeleted:boolean;
    module?: string;
    assignee?: ObjectId;
  }
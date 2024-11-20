import { ObjectId } from "mongoose";
import { Types } from 'mongoose';

export enum ProjectStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    ON_HOLD = 'ON_HOLD',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum ProjectPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export interface IProject {
    _id?: string;
    projectName: string;
    ProjectLead: ObjectId;
    projectCode: string;
    userId: Types.ObjectId;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: Date;
    endDate: Date;
    completedAt?: Date;
    progress: number;
    tasks?: string[];
    team?: string[];
    attachments?: string[];
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  }
  
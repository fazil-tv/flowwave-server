import { ObjectId } from "mongoose";
import { ProjectPriority, ProjectStatus } from "./project.interface";

export interface IPublicProject {
    _id?: string;
    projectName: string;
    description: string;
    ProjectLead: ObjectId;
    projectCode: string;
    priority: ProjectPriority;
    status: ProjectStatus;
    startDate: string,
    endDate:string,
    tags?: string[];
    completedAt?: Date;
    updatedAt:Date;
    progress: number;
}
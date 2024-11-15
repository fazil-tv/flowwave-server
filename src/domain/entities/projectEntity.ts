import { IProject, ProjectStatus, ProjectPriority } from "../../application/interfaces/project.interface";

export class Project implements IProject {
    _id?: string;
    projectName: string;
    projectCode: string;
    userId: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: Date;
    endDate: Date;
    completedAt?: Date;
    progress: number;
    budget?: number;
    tasks?: string[];
    team?: string[];
    attachments?: string[];
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  
    constructor({
      _id,
      projectName,
      projectCode,
      userId,
      description,
      status = ProjectStatus.NOT_STARTED,
      priority,
      startDate,
      endDate,
      tasks = [],
      team = [],
      attachments = [],
      tags = []
    }: Partial<IProject>) {
      this._id = _id;
      this.projectName = projectName!;
      this.projectCode = projectCode!;
      this.userId = userId!;
      this.description = description!;
      this.status = status;
      this.priority = priority!;
      this.startDate = new Date(startDate!);
      this.endDate = new Date(endDate!);
      this.progress = 0;
      this.tasks = tasks;
      this.team = team;
      this.attachments = attachments;
      this.tags = tags;
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.isDeleted = false;
    }
}







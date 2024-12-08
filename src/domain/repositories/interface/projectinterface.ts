import {IProject} from '../../../application/interfaces/project.interface'
import { IPublicProject } from '../../../application/interfaces';
import { IProjectBasic } from '../../../application/interfaces/project.basic.interfaces';
import { ProjectMemberDTO } from '../../../application/dtos/projects/getprojectmember';
import { Types } from 'mongoose';

export interface IProjectRepository {
    create(project: IProject): Promise<IProject>;
    findByName(projectName: string,userId:string): Promise<IProject | null>;
    addTaskToProject(projectId: string, taskId: string): Promise<void>;
    getAllProjects(): Promise<IProject[]>; 
    saveProject(project: IProject): Promise<IProject>;
    findProjectById(id: string): Promise<IPublicProject[]>;
    getProjectsByUserId(userId: string): Promise<IPublicProject[]>;
    updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null>;
    findProjectByIdWithTasks(projectId: string): Promise<IProjectBasic | null>; 
    getProjectMembers(projectId: Types.ObjectId): Promise<ProjectMemberDTO[]>;
}

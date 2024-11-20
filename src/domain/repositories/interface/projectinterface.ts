import {IProject} from '../../../application/interfaces/project.interface'
import { IPublicProject } from '../../../application/interfaces';

export interface IProjectRepository {
    create(project: IProject): Promise<IProject>;
    findByName(projectName: string): Promise<IProject | null>;
    getAllProjects(): Promise<IProject[]>; 
    saveProject(project: IProject): Promise<IProject>;
    findProjectById(id: string): Promise<IPublicProject[]>;
    getProjectsByUserId(userId: string): Promise<IPublicProject[]>;
    updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null>;
}

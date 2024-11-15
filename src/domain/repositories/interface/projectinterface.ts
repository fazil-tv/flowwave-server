import {IProject} from '../../../application/interfaces/project.interface'


export interface IProjectRepository {
    create(project: IProject): Promise<IProject>;
    findByName(projectName: string): Promise<IProject | null>;
    getAllProjects(): Promise<IProject[]>; 
    saveProject(project: IProject): Promise<IProject>;
    findProjectById(id: string): Promise<IProject | null>;
    getProjectsByUserId(userId: string): Promise<IProject[]>;
}

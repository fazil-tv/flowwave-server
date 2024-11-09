import { Project } from "../../entities";

export interface IProjectRepository {
    getAllProjects(): Promise<Project[]>; 
    saveProject(project: Project): Promise<Project>;
    findProjectById(id: string): Promise<Project | null>;
    getProjectsByUserId(userId: string): Promise<Project[]>
}

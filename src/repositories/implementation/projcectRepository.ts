import { Project } from "../../entities";
import { ProjectModel ,IProjectDocument } from "../../infrastructure/db";

export class ProjectRepository {
    
    async saveProject(projectData: Project): Promise<Project> {
        const newProject = new ProjectModel(projectData);
        const savedProject: IProjectDocument = await newProject.save();
        return savedProject.toObject();
    }


    async findProjectById(id: string): Promise<Project | null> {
        const project: IProjectDocument | null = await ProjectModel.findById(id)
            .populate('serviceId') 
            .populate('userId');  

        return project ? project.toObject() : null;
    }

    async getAllProjects(): Promise<Project[]> {
        const projects: IProjectDocument[] = await ProjectModel.find();
        return projects.map(project => project.toObject());  
    }

    async getProjectsByUserId(userId: string): Promise<Project[]> {
        const projects: IProjectDocument[] = await ProjectModel.find({ userId });
        return projects.map(project => project.toObject());
    }
         
}
 